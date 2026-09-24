import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: (process.env.GITHUB_ID || "").trim(),
      clientSecret: (process.env.GITHUB_SECRET || "").trim(),
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),

    GoogleProvider({
      clientId: (process.env.GOOGLE_ID || "").trim(),
      clientSecret: (process.env.GOOGLE_SECRET || "").trim(),
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log(`[NextAuth] signIn initiated for provider: ${account?.provider}`);

        // 1. Resolve user email reliably across providers (handling private GitHub emails)
        let email = user?.email || profile?.email;

        if (!email && account?.provider === "github" && account?.access_token) {
          try {
            const res = await fetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
                "User-Agent": "GetMeAChai",
                Accept: "application/vnd.github.v3+json",
              },
            });

            if (res.ok) {
              const emails = await res.json();
              if (Array.isArray(emails) && emails.length > 0) {
                const primary =
                  emails.find((e) => e.primary && e.verified) ||
                  emails.find((e) => e.verified) ||
                  emails[0];
                if (primary?.email) {
                  email = primary.email;
                }
              }
            }
          } catch (fetchErr) {
            console.error("[NextAuth] Failed to fetch private GitHub email:", fetchErr);
          }
        }

        // Fallback for GitHub users without a verified email
        if (!email && profile?.login) {
          email = `${profile.login}@users.noreply.github.com`;
        }

        if (!email) {
          console.error("[NextAuth] Sign-in failed: Unable to resolve email for user:", {
            user,
            profile,
            provider: account?.provider,
          });
          return false;
        }

        const normalizedEmail = email.toLowerCase().trim();
        user.email = normalizedEmail;

        const username = (
          profile?.login ||
          user.name ||
          normalizedEmail.split("@")[0] ||
          "user"
        )
          .toLowerCase()
          .replace(/[^a-z0-9_-]/g, "") || "user";

        user.username = username;
        user.name = username;

        await connectToDatabase();
        const savedUser = await User.findOneAndUpdate(
          { email: normalizedEmail },
          {
            $set: {
              email: normalizedEmail,
              profilePic: user.image || profile?.picture || profile?.avatar_url,
              updatedAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        user.id = savedUser._id.toString();

        return true;
      } catch (error) {
        console.error("[NextAuth] Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {
      // If session update was requested from client
      if (trigger === "update" && session) {
        if (session.user?.username) {
          token.username = session.user.username;
          token.name = session.user.username;
        } else if (session.user?.name) {
          token.username = session.user.name;
          token.name = session.user.name;
        }
      }

      // Attached on initial sign in
      if (user) {
        token.id = user.id || user._id?.toString();
        token.username = user.username;
        if (user.username) {
          token.name = user.username;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id;
        session.user.username = token.username;
        // Keep session.user.name matching the creator page username used across the app
        if (token.username) {
          session.user.name = token.username;
        }
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  secret: (process.env.NEXTAUTH_SECRET || "").trim(),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
