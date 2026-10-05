"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mic,
  FileText,
  Sparkles,
  Share2,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
  // Step 1: Input format state
  const [activeInput, setActiveInput] = useState("voice");

  // Step 2: Tone state
  const [activeTone, setActiveTone] = useState("conversational");

  // Step 3: Platform state
  const [activePlatform, setActivePlatform] = useState("x");
  const [copied, setCopied] = useState(false);

  const inputDumps = {
    voice: {
      type: "Voice memo transcript",
      length: "42 seconds",
      content:
        "“Stop waiting until a project is completely finished to talk about it. The early friction and messy decisions are what people actually learn from. That's the real story.”",
    },
    notes: {
      type: "Quick bullet dump",
      length: "3 lines",
      content:
        "• perfectionism is just fear disguised as high standards\n• people connect with the messy middle, not the victory lap\n• turn this into a thread and newsletter this week",
    },
  };

  const tones = {
    conversational: {
      label: "Conversational",
      vibe: "Relatable & honest",
      output:
        "“I used to sit on ideas for weeks until they felt completely ready. Big mistake. The moment I started sharing the messy middle, people actually showed up and leaned in.”",
    },
    authoritative: {
      label: "Direct & Sharp",
      vibe: "High conviction",
      output:
        "“Perfectionism is silently killing your reach. Nobody connects with your sanitized highlight reel. Ship the work in progress and let feedback do the polishing.”",
    },
    thoughtful: {
      label: "Thoughtful",
      vibe: "Nuanced insight",
      output:
        "“Creative momentum doesn't come from waiting for inspiration. It comes from the courage to document your thinking out loud while the answers are still forming.”",
    },
  };

  const platforms = {
    x: {
      label: "X Thread",
      format: "Thread Hook (1/4)",
      content:
        "1/4 The biggest lie in content creation:\n\n'Wait until the project is finished.'\n\nHere is why sharing the messy middle builds 10x more trust: 🧵",
    },
    linkedin: {
      label: "LinkedIn",
      format: "Spaced Story Post",
      content:
        "Most creators don't have an idea problem.\n\nThey have a perfectionism problem.\n\nThree reasons why documenting your process beats waiting for finished work:\n\n1. Progress is the hook\n2. Feedback starts on day one\n3. Perfectionism is just delay in disguise",
    },
    newsletter: {
      label: "Newsletter",
      format: "Weekly Letter",
      content:
        "Subject: Stop waiting for finished work\n\nHey friend,\n\nThis week, let's talk about why unpolished work builds far more credibility than a sanitized victory lap. Let's dive in...",
    },
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(platforms[activePlatform].content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="how-it-works"
      className="mt-24 border-t border-[#2d3934] pt-16 lg:mt-32"
      aria-label="How Prismify Works"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5f56b]/30 bg-[#16241c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c5f56b]" />
            How It Works
          </div>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#f5f1e8] sm:text-4xl lg:text-5xl">
            From raw thought to published piece{" "}
            <span className="text-[#c5f56b]">in three steps.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-[#89968d]">
          No complicated prompt engineering or robotic filler. Prismify captures
          your authentic perspective and turns it into native content your audience wants to read.
        </p>
      </div>

      {/* ── 3 Clean Step Cards ── */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* ── Step 01: Capture ── */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#2d3934] bg-[#161f1c] p-6 transition-all duration-200 hover:border-[#3d5045]">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-[#243029] pb-4">
              <span className="font-mono text-sm font-bold text-[#c5f56b]">01</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
                Capture
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold text-[#f5f1e8]">
              Dump the raw idea.
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#89968d]">
              Voice memo, bullet dump, or rough paragraphs. Don&apos;t edit or
              censor yourself—just speak or type freely.
            </p>

            {/* Input Format Selector */}
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveInput("voice")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  activeInput === "voice"
                    ? "bg-[#223328] text-[#c5f56b] border border-[#c5f56b]/30"
                    : "border border-[#2d3934] text-[#718078] hover:text-[#c8d5ce]"
                }`}
              >
                <Mic className="h-3.5 w-3.5" />
                <span>Voice Note</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveInput("notes")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  activeInput === "notes"
                    ? "bg-[#223328] text-[#c5f56b] border border-[#c5f56b]/30"
                    : "border border-[#2d3934] text-[#718078] hover:text-[#c8d5ce]"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Rough Notes</span>
              </button>
            </div>

            {/* Preview Box */}
            <div className="mt-3.5 rounded-xl border border-[#27352d] bg-[#111816] p-4">
              <div className="flex items-center justify-between text-[11px] text-[#718078]">
                <span>{inputDumps[activeInput].type}</span>
                <span className="font-mono">{inputDumps[activeInput].length}</span>
              </div>
              <p className="mt-3 whitespace-pre-line font-mono text-xs leading-6 text-[#9eb0a4]">
                {inputDumps[activeInput].content}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-[#243029] pt-3 text-[11px] text-[#718078]">
            ✦ Preserves your natural, spontaneous thought
          </div>
        </div>

        {/* ── Step 02: Shape ── */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#2d3934] bg-[#161f1c] p-6 transition-all duration-200 hover:border-[#3d5045]">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-[#243029] pb-4">
              <span className="font-mono text-sm font-bold text-[#c5f56b]">02</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
                Shape
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold text-[#f5f1e8]">
              Pick your angle.
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#89968d]">
              Choose how the idea should land. Prismify distills the core insight
              in your voice without generic corporate fluff.
            </p>

            {/* Tone Selector */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {Object.entries(tones).map(([key, data]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTone(key)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                    activeTone === key
                      ? "bg-[#223328] text-[#c5f56b] border border-[#c5f56b]/30"
                      : "border border-[#2d3934] text-[#718078] hover:text-[#c8d5ce]"
                  }`}
                >
                  {data.label}
                </button>
              ))}
            </div>

            {/* Preview Box */}
            <div className="mt-3.5 rounded-xl border border-[#27352d] bg-[#111816] p-4">
              <div className="flex items-center justify-between text-[11px] text-[#718078]">
                <span>Perspective &amp; cadence</span>
                <span className="text-[#c5f56b]">{tones[activeTone].vibe}</span>
              </div>
              <p className="mt-3 text-xs leading-6 text-[#d3dbd2]">
                {tones[activeTone].output}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-[#243029] pt-3 text-[11px] text-[#718078]">
            ✦ Extracts the hook while keeping your real voice
          </div>
        </div>

        {/* ── Step 03: Publish ── */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#2d3934] bg-[#161f1c] p-6 transition-all duration-200 hover:border-[#3d5045]">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-[#243029] pb-4">
              <span className="font-mono text-sm font-bold text-[#c5f56b]">03</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
                Publish
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold text-[#f5f1e8]">
              Publish everywhere.
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#89968d]">
              Get platform-native formats ready to copy or schedule. Tailored for
              X threads, LinkedIn posts, or newsletters.
            </p>

            {/* Platform Selector */}
            <div className="mt-6 flex gap-1.5">
              {Object.entries(platforms).map(([key, data]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePlatform(key)}
                  className={`flex-1 rounded-lg py-1.5 text-center text-xs font-medium transition cursor-pointer ${
                    activePlatform === key
                      ? "bg-[#223328] text-[#c5f56b] border border-[#c5f56b]/30"
                      : "border border-[#2d3934] text-[#718078] hover:text-[#c8d5ce]"
                  }`}
                >
                  {data.label}
                </button>
              ))}
            </div>

            {/* Preview Box */}
            <div className="mt-3.5 rounded-xl border border-[#27352d] bg-[#111816] p-4">
              <div className="flex items-center justify-between text-[11px] text-[#718078]">
                <span>{platforms[activePlatform].format}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-[#aeb9b0] hover:text-[#c5f56b] transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-[#c5f56b]" />
                      <span className="text-[#c5f56b]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 whitespace-pre-line text-xs leading-6 text-[#d3dbd2]">
                {platforms[activePlatform].content}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-[#243029] pt-3 text-[11px] text-[#718078]">
            ✦ Ready to copy, schedule, or share in seconds
          </div>
        </div>
      </div>

      {/* ── Subtle bottom callout ── */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#26352d] bg-[#131c19] px-6 py-4 sm:flex-row">
        <p className="text-xs text-[#89968d]">
          Have an unformed idea in your head right now?
        </p>
        <Link
          href="/workspace"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#c5f56b] transition hover:text-white"
        >
          <span>Try it in the workspace</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
