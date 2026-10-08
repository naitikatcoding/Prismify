"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import logo from "../../public/logo.svg";

const LoginContent = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-screen bg-[#101514] flex items-center justify-center px-4">
        <div className="relative w-full max-w-sm rounded-3xl border border-[#34423b] bg-[#18211e] p-8 text-center shadow-2xl shadow-black/40">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-[#c5f56b]/10 blur-3xl pointer-events-none" />
          <div className="mb-6 flex justify-center">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#c5f56b] to-[#7fe0a8] flex items-center justify-center text-[#101514] font-black text-2xl shadow-lg shadow-[#c5f56b]/20">
              {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718078] mb-2">Signed in as</p>
          <p className="font-semibold text-[#f5f1e8] mb-6 truncate">{session.user.email}</p>
          <div className="flex flex-col gap-3">
            <Link href="/workspace" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c5f56b] px-6 py-3 text-sm font-bold text-[#101514] transition hover:bg-white">
              Go to Studio →
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center justify-center rounded-full border border-[#41504a] px-6 py-3 text-sm font-semibold text-[#aeb9b0] transition hover:border-red-500/50 hover:text-red-400">
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="prism-page min-h-screen bg-[#0d1614] text-[#f5f1e8] flex items-center justify-center px-4 py-24 selection:bg-[#c5f56b]/30 selection:text-[#c5f56b]">
      <div className="prism-grid" aria-hidden="true" />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#c5f56b]/7 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-80 w-80 rounded-full bg-[#7fe0a8]/5 blur-[120px]" />

      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-[#34423b] bg-[#111816]/90 p-8 shadow-2xl shadow-black/50 backdrop-blur-md">

          <div className="mb-8 flex flex-col items-center gap-3">
            <Link href="/" className="group flex flex-col items-center gap-3">
              <Image
                src={logo}
                alt="Prismify"
                width={56}
                height={56}
                unoptimized
                className="rounded-2xl shadow-lg shadow-[#c5f56b]/15 ring-1 ring-white/10 transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"
              />
              <span className="inline-block bg-gradient-to-r from-[#f5f1e8] via-[#d9ffe6] to-[#c5f56b] bg-clip-text font-sans text-3xl font-black leading-[1.2] tracking-[-0.05em] text-transparent">
                Prismify
              </span>
            </Link>
            <div className="mt-1 text-center">
              <h1 className="text-xl font-semibold tracking-[-0.03em] text-[#f5f1e8]">Welcome back</h1>
              <p className="mt-1 text-sm text-[#718078]">Sign in to your creator studio</p>
            </div>
          </div>

          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-[#2d3934] to-transparent" />

          <div className="flex flex-col gap-3">

            <button
              id="login-google"
              onClick={() => signIn("google", { callbackUrl: "/workspace" })}
              type="button"
              className="group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border border-[#3a4a42] bg-[#18231f] px-5 py-3.5 text-sm font-medium text-[#d3dbd2] shadow-sm transition-all duration-200 hover:border-[#c5f56b]/50 hover:bg-[#1d2a24] hover:text-[#f5f1e8] hover:shadow-[0_0_20px_rgba(197,245,107,0.08)] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#c5f56b]/5 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
              <svg className="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-401.000000, -860.000000)">
                    <g transform="translate(401.000000, 860.000000)">
                      <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05" />
                      <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335" />
                      <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323189,37.8666667 23.7136364,37.8666667" fill="#34A853" />
                      <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4" />
                    </g>
                  </g>
                </g>
              </svg>
              <span className="flex-1 text-left">Continue with Google</span>
              <svg className="h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </button>

            <button
              id="login-github"
              onClick={() => signIn("github", { callbackUrl: "/workspace" })}
              type="button"
              className="group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border border-[#3a4a42] bg-[#18231f] px-5 py-3.5 text-sm font-medium text-[#d3dbd2] shadow-sm transition-all duration-200 hover:border-[#c5f56b]/50 hover:bg-[#1d2a24] hover:text-[#f5f1e8] hover:shadow-[0_0_20px_rgba(197,245,107,0.08)] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#c5f56b]/5 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="flex-1 text-left">Continue with GitHub</span>
              <svg className="h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </button>

            <div className="flex items-center gap-3 py-1">
              <span className="flex-1 h-px bg-[#2d3934]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3d4e46]">More coming soon</span>
              <span className="flex-1 h-px bg-[#2d3934]" />
            </div>

            <button disabled type="button" className="flex w-full cursor-not-allowed items-center gap-3.5 rounded-2xl border border-[#2a3630] bg-[#131c19] px-5 py-3.5 text-sm font-medium text-[#3d4e46] opacity-50">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span className="flex-1 text-left">Continue with LinkedIn</span>
              <span className="rounded-full border border-[#2d3934] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#3d4e46]">Soon</span>
            </button>

            <button disabled type="button" className="flex w-full cursor-not-allowed items-center gap-3.5 rounded-2xl border border-[#2a3630] bg-[#131c19] px-5 py-3.5 text-sm font-medium text-[#3d4e46] opacity-50">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              <span className="flex-1 text-left">Continue with X / Twitter</span>
              <span className="rounded-full border border-[#2d3934] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#3d4e46]">Soon</span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-[#4d5e55]">
            By continuing, you agree to our{" "}
            <Link href="/" className="text-[#718078] underline-offset-2 hover:text-[#c5f56b] hover:underline transition-colors">Terms</Link>
            {" "}&amp;{" "}
            <Link href="/" className="text-[#718078] underline-offset-2 hover:text-[#c5f56b] hover:underline transition-colors">Privacy Policy</Link>.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-1.5 text-[11px] text-[#3d4e46]">
            <svg className="h-3 w-3 text-[#c5f56b]" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.5 4.5H14l-3.7 2.7 1.4 4.3L8 9.8l-3.7 2.7 1.4-4.3L2 5.5h4.5z" /></svg>
            No credit card needed
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#3d4e46]">
            <svg className="h-3 w-3 text-[#c5f56b]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="10" height="7" rx="1.5" /><path d="M5 7V5a3 3 0 016 0v2" /></svg>
            Private by default
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#3d4e46]">
            <svg className="h-3 w-3 text-[#c5f56b]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L6 10l-3-3" /></svg>
            Free to get started
          </span>
        </div>
      </div>
    </div>
  );
};

const Page = () => (
  <SessionProvider>
    <LoginContent />
  </SessionProvider>
);

export default Page;
