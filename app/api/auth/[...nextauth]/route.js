import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

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

        // 2. Connect to MongoDB
        await connectDb();

        // 3. Find or create user
        let currentUser = await User.findOne({ email: normalizedEmail });

        if (!currentUser) {
          // Generate a clean, URL-safe base username
          let baseUsername = (
            profile?.login ||
            (user.name ? user.name.replace(/\s+/g, "").toLowerCase() : "") ||
            normalizedEmail.split("@")[0] ||
            "user"
          )
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, "");

          if (!baseUsername) baseUsername = "user";

          // Ensure unique username to avoid duplicate key errors
          let username = baseUsername;
          let existingWithUsername = await User.findOne({ username });
          while (existingWithUsername) {
            username = `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`;
            existingWithUsername = await User.findOne({ username });
          }

          const profilePic =
            user.image ||
            profile?.picture ||
            profile?.avatar_url ||
            "";

          const displayName =
            user.name ||
            profile?.name ||
            profile?.login ||
            username;

          currentUser = await User.create({
            email: normalizedEmail,
            name: displayName,
            username: username,
            profilePic: profilePic,
          });

          console.log(`[NextAuth] Created new user: ${currentUser.username} (${currentUser.email})`);
        } else {
          console.log(`[NextAuth] Found existing user: ${currentUser.username} (${currentUser.email})`);
        }

        // Attach DB details to the in-memory user object for the jwt callback
        user.id = currentUser._id.toString();
        user.username = currentUser.username;
        user.name = currentUser.username;

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

      // If token missing username (e.g. existing session / token refresh), look up from DB
      if (!token.username && token.email) {
        try {
          await connectDb();
          const dbUser = await User.findOne({ email: token.email.toLowerCase().trim() }).select(
            "_id username name"
          );
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.username = dbUser.username;
            token.name = dbUser.username;
          }
        } catch (err) {
          console.error("[NextAuth] Error querying user in JWT callback:", err);
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
