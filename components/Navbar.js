"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from '../public/logo.svg';


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 mx-auto mt-4 flex w-[calc(50%-1rem)] max-w-5xl items-center rounded-full border border-[#34433b] bg-[#131c19]/90 px-4 py-2.5 text-sm text-[#f5f1e8] shadow-lg shadow-black/10 backdrop-blur-md sm:w-[calc(100%-2rem)] sm:px-5">
      <Link href="/" className="group flex items-center gap-3" aria-label="Prismify home">
        <Image
          width={40}
          height={40}
          src={logo}
          alt=""
          unoptimized
          className="rounded-xl shadow-md shadow-[#c5f56b]/10 ring-1 ring-white/15 transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"
        />
        <span className="inline-block bg-gradient-to-r from-[#f5f1e8] via-[#d9ffe6] to-[#c5f56b] bg-clip-text pb-0.5 font-sans text-3xl font-black leading-[1.2] tracking-[-0.05em] text-transparent">Prismify</span>
      </Link>

      <div className="ml-auto hidden items-center gap-8 md:flex">
        <Link href="/workspace" className="group relative h-5 overflow-hidden text-[#aeb9b0] transition hover:text-[#c5f56b]">
          <span className="block whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">Studio</span>
          <span className="absolute left-0 top-full block whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">Studio</span>
        </Link>
        <Link href="/#how-it-works" className="group relative h-5 overflow-hidden text-[#aeb9b0] transition hover:text-[#c5f56b]">
          <span className="block whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">How it works</span>
          <span className="absolute left-0 top-full block whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">How it works</span>
        </Link>
        <Link href="/#how-it-works" className="group relative h-5 overflow-hidden text-[#aeb9b0] transition hover:text-[#c5f56b]">
          <span className="block whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">About</span>
          <span className="absolute left-0 top-full block whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-full">About</span>
        </Link>
        <Link href="/login" className="flex h-10 items-center rounded-full bg-[#c5f56b] px-4 font-bold text-[#101514] transition hover:bg-white">
          Get started 
        </Link>
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="ml-auto rounded-full border border-[#405047] p-2 text-[#aeb9b0] transition hover:border-[#c5f56b] hover:text-[#c5f56b] md:hidden"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {mobileMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        className={`absolute left-0 top-full mt-3 w-full flex-col gap-1 rounded-2xl border border-[#34433b] bg-[#131c19] p-3 text-base shadow-2xl shadow-black/30 ${
          mobileMenuOpen ? "flex" : "hidden"
        }`}
      >
        <Link className="rounded-xl px-4 py-3 text-[#aeb9b0] hover:bg-[#1d2a24] hover:text-[#c5f56b]" href="/workspace" onClick={() => setMobileMenuOpen(false)}>Studio</Link>
        <Link className="rounded-xl px-4 py-3 text-[#aeb9b0] hover:bg-[#1d2a24] hover:text-[#c5f56b]" href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</Link>
        <Link className="rounded-xl px-4 py-3 text-[#aeb9b0] hover:bg-[#1d2a24] hover:text-[#c5f56b]" href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>About</Link>
        <Link className="mt-2 rounded-xl bg-[#c5f56b] px-4 py-3 text-center font-bold text-[#101514]" href="/workspace" onClick={() => setMobileMenuOpen(false)}>Get started -&gt;</Link>
      </div>
    </nav>
  );
};

export default Navbar;
