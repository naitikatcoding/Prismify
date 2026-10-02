"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";
import logo from "../public/logo.svg";

const Footer = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  const studioHref = session ? "/workspace" : "/login";
  const studioLabel = session ? "Open Studio" : "Sign in to Studio";

  return (
    <footer className="border-t border-[#2d3934] bg-[#101514] text-[#f5f1e8]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-10 border-b border-[#2d3934] pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt=""
                width={40}
                height={40}
                unoptimized
                className="rounded-xl ring-1 ring-white/15"
              />
              <span className="inline-block bg-gradient-to-r from-[#f5f1e8] via-[#d9ffe6] to-[#c5f56b] bg-clip-text pb-0.5 font-sans text-2xl font-black leading-[1.2] tracking-[-0.05em] text-transparent">
                Prismify
              </span>
            </div>
            <h2 className="mt-7 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Make the good idea impossible to ignore.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#89968d]">
              Turn rough thoughts into polished content that sounds like you,
              wherever your audience is reading.
            </p>
          </div>

          <Link
            href={studioHref}
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#c5f56b] px-5 py-3.5 text-sm font-bold text-[#101514] transition hover:bg-white hover:scale-105"
          >
            {session ? "Open your studio" : "Start creating"}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </Link>
        </div>

          <div className="grid gap-10 py-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
              The Prismify principle
            </p>
            <p className="max-w-[14rem] text-sm leading-6 text-[#718078]">
              One idea. More ways to share it. Less time staring at a blank
              page.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
              Explore
            </p>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#aeb9b0]">
              <Link className="footer-link transition hover:text-[#c5f56b]" href="/">
                Home
              </Link>
              <Link className="footer-link transition hover:text-[#c5f56b]" href="/#how-it-works">
                How it works
              </Link>
              <Link className="footer-link transition hover:text-[#c5f56b]" href={studioHref}>
                {studioLabel}
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
              Create
            </p>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#aeb9b0]">
              <Link className="footer-link transition hover:text-[#c5f56b]" href={studioHref}>
                {session ? "Open workspace" : "Get started"}
              </Link>
              <Link className="footer-link transition hover:text-[#c5f56b]" href="/contact">
                Contact us
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
              Follow along
            </p>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#aeb9b0]">
              <a className="footer-link transition hover:text-[#c5f56b]" href="https://www.linkedin.com/in/naitik-gupta-509b6a37a" target="blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="footer-link transition hover:text-[#c5f56b]" href="https://x.com/NGupta20845" target="blank" rel="noreferrer">
                X / Twitter
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#2d3934] pt-5 text-xs text-[#718078] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Prismify. Made for ideas in progress.</p>
          <div className="flex gap-5">
            <Link className="footer-link transition hover:text-[#c5f56b]" href="/">
              Privacy
            </Link>
            <Link className="footer-link transition hover:text-[#c5f56b]" href="/">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
