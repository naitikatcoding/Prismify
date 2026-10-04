"use client";

import Link from "next/link";
import { useState } from "react";
import HowItWorks from "@/components/HowItWorks";

const rawIdea =
  "Building in public taught me that consistency beats perfect timing. Here's what changed when I started sharing the process...";

const platforms = {
  LinkedIn: {
    label: "LinkedIn",
    format: "Professional post",
    words: "146 words",
    output: {
      Professional:
        "The most useful creative habit isn't inspiration. It's showing up before you feel ready. When I began sharing my work, I thought every post needed a perfect conclusion. Then I learned that progress is the story.",
      Conversational:
        "I used to wait for the perfect moment to share what I was building. Turns out, the real shift came from simply showing up and letting people see the process. Consistency beats perfect timing every time.",
      Bold:
        "Perfect timing is a myth. Consistency is the advantage. Sharing the work before it felt finished changed how I built, learned, and connected with people.",
    },
  },
  "X thread": {
    label: "X thread",
    format: "5-post thread",
    words: "5 posts",
    output: {
      Professional:
        "A short thread on building in public:\n\n1/ Consistency compounds faster than perfect timing.\n\n2/ Sharing the process creates feedback before the work is finished.\n\n3/ The lesson: publish the progress, not just the polished result.",
      Conversational:
        "I kept waiting for the “right time” to share my work.\n\nThen I started posting the messy middle.\n\nThat’s when things got interesting: more feedback, more momentum, less pressure to be perfect.",
      Bold:
        "Stop waiting for perfect timing.\n\nThe people who share the process learn faster, build trust sooner, and create their own momentum.\n\nProgress is the product.",
    },
  },
  Newsletter: {
    label: "Newsletter",
    format: "Weekly letter",
    words: "312 words",
    output: {
      Professional:
        "This week’s lesson is simple: consistency creates the conditions for better work. Once I began sharing the process, each update became a useful checkpoint instead of a final performance.",
      Conversational:
        "Here’s something I wish I had learned sooner: you don’t need a perfect update. You just need an honest one. Sharing the process made the work feel lighter and the next step much clearer.",
      Bold:
        "The polished version is not the most valuable version. The process is. The moment I stopped hiding unfinished work, I started building with more speed, clarity, and conviction.",
    },
  },
};

const tones = {
  Professional: "Clear, credible, and structured for expertise.",
  Conversational: "Warm, human, and easy to read aloud.",
  Bold: "Direct, energetic, and built to stop the scroll.",
};

export default function Home() {
  const [activePlatform, setActivePlatform] = useState("LinkedIn");
  const [activeTone, setActiveTone] = useState("Professional");
  const [generated, setGenerated] = useState(true);
  const [copied, setCopied] = useState(false);

  const platform = platforms[activePlatform];
  const currentOutput = platform.output[activeTone];

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(currentOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      id="top"
      className="prism-page min-h-screen overflow-x-hidden bg-[#101514] text-[#f5f1e8]"
    >
      <div className="prism-grid" aria-hidden="true" />

      <main className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
        <section className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-xl">
            <h1 className="hero-text max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Your raw thoughts,
              <span className="block text-[#c5f56b]">made remarkable.</span>
            </h1>

            <p className="hero-text mt-7 max-w-lg text-base leading-7 text-[#aeb9b0] sm:text-lg">
              Prismify turns brain dumps, transcripts, and rough ideas into
              polished content for every place your audience spends time.
            </p>

            <div className="hero-text mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workspace"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#c5f56b] px-6 py-3.5 text-sm font-bold text-[#101514] transition hover:bg-white"
              >
                Start creating
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[#41504a] px-6 py-3.5 text-sm font-semibold text-[#f5f1e8] transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
              >
                See how it works
              </a>
            </div>

            <div className="hero-text mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#2d3934] pt-5">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["#c5f56b","#7fe0a8","#a8d4ff"].map((c) => (
                    <span key={c} className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2d3934] text-[9px] font-black" style={{ background: c, color: "#101514" }}>✦</span>
                  ))}
                </div>
                <span className="text-xs text-[#718078]">Trusted by creators</span>
              </div>
              <span className="h-3 w-px bg-[#2d3934]" />
              <span className="text-xs uppercase tracking-[0.14em] text-[#718078]">One idea</span>
              <span className="text-[#c5f56b] text-xs">+</span>
              <span className="text-xs uppercase tracking-[0.14em] text-[#718078]">Three ready-to-share formats</span>
            </div>
          </div>

          <div
            id="studio"
            className="prism-window relative mx-auto w-full max-w-2xl min-w-0 rounded-[1.75rem] border border-[#405047] bg-[#18211e] p-3 shadow-2xl shadow-black/30"
          >
            <div className="min-w-0 rounded-[1.25rem] border border-[#34423b] bg-[#111816] p-5 sm:p-7">
              <div className="mb-7 flex items-center justify-between border-b border-[#2c3833] pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718078]">
                    New generation
                  </p>
                  <p className="mt-1 text-lg font-medium text-[#f5f1e8]">
                    The creator workspace
                  </p>
                </div>

                <span className="rounded-full border border-[#53614f] px-3 py-1.5 text-xs text-[#c5f56b]">
                  AI Engine
                </span>
              </div>

              <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <div className="min-w-0 rounded-xl border border-[#34423b] bg-[#1b2621] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aeb9b0]">
                      Your idea
                    </span>
                    <span className="shrink-0 text-xs text-[#718078]">
                      2,048 chars
                    </span>
                  </div>

                  <p className="wrap-break-word text-sm leading-6 text-[#d3dbd2]">
                    {rawIdea}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {Object.keys(tones).map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => {
                          setActiveTone(tone);
                          setGenerated(false);
                        }}
                        className={`rounded-md px-2.5 py-1.5 text-xs transition ${activeTone === tone
                            ? "bg-[#293a30] text-[#c5f56b]"
                            : "border border-[#46544c] text-[#aeb9b0] hover:border-[#c5f56b] hover:text-[#c5f56b]"
                          }`}
                        aria-pressed={activeTone === tone}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-5 text-[#718078]">
                    {tones[activeTone]}
                  </p>

                  <button
                    type="button"
                    onClick={() => setGenerated(true)}
                    className="btn-generate mt-5 w-full rounded-lg bg-[#c5f56b] px-4 py-3 text-sm font-bold text-[#101514] transition hover:bg-white"
                  >
                    Generate content
                  </button>
                </div>

                <div className="min-w-0 rounded-xl border border-[#34423b] bg-[#f5f1e8] p-4 text-[#17211d]">
                  <div className="mb-5 flex min-w-0 flex-col gap-3">
                    <div className="flex min-w-0 flex-wrap justify-center gap-x-5 gap-y-2 text-center text-xs font-bold">
                      {Object.keys(platforms).map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            setActivePlatform(name);
                            setGenerated(false);
                          }}
                          className={`border-b-2 pb-2 transition ${activePlatform === name
                              ? "border-[#17211d] text-[#17211d]"
                              : "border-transparent text-[#859089] hover:text-[#17211d]"
                            }`}
                          aria-pressed={activePlatform === name}
                        >
                          {platforms[name].label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={copyOutput}
                      className="self-end text-xs text-[#859089] transition hover:text-[#17211d]"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#859089]">
                    <span>{platform.format}</span>
                    <span className="shrink-0 text-[#52605a]">
                      {activeTone}
                    </span>
                  </div>

                  <div
                    className={`max-h-64 overflow-y-auto wrap-anywhere whitespace-pre-line pr-2 text-sm leading-6 scrollbar-none [&::-webkit-scrollbar]:hidden ${generated ? "text-[#17211d]" : "text-[#52605a]"
                      }`}
                  >
                    {currentOutput}
                  </div>

                  <div className="mt-7 flex items-center justify-between gap-3 border-t border-[#d5d1c8] pt-4 text-xs text-[#859089]">
                    <span>
                      {generated ? "Ready to publish" : "Preview updated"}
                    </span>
                    <span className="shrink-0 font-semibold text-[#52605a]">
                      {platform.words}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works section ── */}
        <HowItWorks />


        {/* ── About section ── */}
        <section
          id="about"
          className="mt-24 lg:mt-32"
          aria-labelledby="about-heading"
        >
          {/* Section header */}
          <div className="border-t border-[#2d3934] pt-8 mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c5f56b] mb-3">About Prismify</p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="about-heading"
                className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl"
              >
                Built for thinkers who hate
                <span className="block text-[#c5f56b]">staring at blank pages.</span>
              </h2>
              <p className="max-w-md text-base leading-7 text-[#89968d] lg:text-right">
                Prismify was born from a simple frustration: great ideas die in the draft stage. We built the tool we wished existed.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-px bg-[#2d3934] rounded-2xl overflow-hidden sm:grid-cols-4 mb-12">
            {[
              { value: "3×", label: "Faster content creation" },
              { value: "5+", label: "Output formats per idea" },
              { value: "100%", label: "AI-native workflow" },
              { value: "∞", label: "Ideas, never wasted" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-[#18211e] p-6 text-center group hover:bg-[#1d2922] transition-colors duration-300">
                <p className="stat-value text-3xl font-black tracking-[-0.06em] text-[#c5f56b] sm:text-4xl group-hover:scale-105 transition-transform duration-300 inline-block">{value}</p>
                <p className="mt-2 text-xs leading-5 text-[#718078]">{label}</p>
              </div>
            ))}
          </div>

          {/* Mission + pillars */}
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Mission card */}
            <div className="relative overflow-hidden rounded-3xl border border-[#34423b] bg-[#18211e] p-8 sm:p-10">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#c5f56b]/6 blur-3xl" />
              <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-[#7fe0a8]/5 blur-2xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-[#718078] mb-6">Our mission</p>
              <blockquote className="relative">
                <p className="text-xl font-medium leading-8 text-[#f5f1e8] sm:text-2xl sm:leading-9">
                  &ldquo;The best ideas deserve the best words. We remove the distance between what you know and what the world gets to read.&rdquo;
                </p>
              </blockquote>
              <div className="mt-8 flex items-center gap-4 border-t border-[#2d3934] pt-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#c5f56b] to-[#7fe0a8] flex items-center justify-center text-[#101514] font-black text-lg">P</div>
                <div>
                  <p className="text-sm font-semibold text-[#f5f1e8]">The Prismify Team</p>
                  <p className="text-xs text-[#718078]">Building in public, shipping with purpose</p>
                </div>
              </div>
            </div>

            {/* Pillars grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                {
                  icon: "✦",
                  title: "Idea-first design",
                  body: "Every feature starts with the question: does this help the idea get out faster?",
                },
                {
                  icon: "⚡",
                  title: "Speed is the product",
                  body: "From raw thought to ready-to-post content in under a minute. Always.",
                },
                {
                  icon: "🎯",
                  title: "Your voice, amplified",
                  body: "Prismify doesn't replace your voice — it removes the friction of finding it.",
                },
                {
                  icon: "🔒",
                  title: "Private by default",
                  body: "Your ideas are yours. We store only what you choose and never use your content for training.",
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="pillar-card group rounded-2xl border border-[#34423b] bg-[#111816] p-5"
                >
                  <span className="block text-xl mb-3 transition-transform duration-300 group-hover:scale-110 origin-left">{icon}</span>
                  <h3 className="text-sm font-semibold text-[#f5f1e8] mb-2">{title}</h3>
                  <p className="text-xs leading-5 text-[#718078]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA banner */}
          <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-3xl bg-[#c5f56b] p-8 sm:p-12 text-[#101514]">
            {/* layered decorative orbs */}
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-0 left-1/4 h-40 w-72 rounded-full bg-[#7fe0a8]/35 blur-3xl" />
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-[#c5f56b]/60 blur-2xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-2xl font-black tracking-[-0.045em] sm:text-3xl leading-tight">
                  Ready to transform<br className="hidden sm:block" /> your ideas?
                </p>
                <p className="mt-2 text-sm font-medium text-[#101514]/65">Join creators who already ship more, with less effort.</p>
              </div>
              <Link
                href="/workspace"
                className="group shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#101514] px-8 py-4 text-sm font-bold text-[#c5f56b] transition hover:bg-[#1a2820] hover:scale-105 hover:shadow-xl hover:shadow-black/20"
              >
                Start creating free
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}