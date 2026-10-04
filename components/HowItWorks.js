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
  Flame,
  MessageSquare,
  Briefcase,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function HowItWorks() {
  // Step 1 interactive state
  const [activeInputType, setActiveInputType] = useState("voice");

  // Step 2 interactive state
  const [activeTone, setActiveTone] = useState("conversational");

  // Step 3 interactive state
  const [activePlatform, setActivePlatform] = useState("x");
  const [copiedPlatform, setCopiedPlatform] = useState(false);

  // Step 1 samples
  const inputSamples = {
    voice: {
      type: "Voice Note",
      file: "morning_coffee_ramble.m4a",
      duration: "01:42",
      size: "1.4 MB",
      badge: "Real-time Transcription",
      preview:
        "“Honestly, the biggest mistake people make when building in public is waiting for a clean ending... the real audience connection happens when you show the messy middle.”",
    },
    notes: {
      type: "Brain Dump",
      file: "quick_thoughts.txt",
      duration: "3 bullets",
      size: "240 bytes",
      badge: "Structure Extraction",
      preview:
        "• perfectionism is just fear dressed up\n• why people relate to progress > final trophy\n• need to turn this into a thread + linkedin post tomorrow",
    },
    draft: {
      type: "Rough Draft",
      file: "unfinished_essay.md",
      duration: "380 words",
      size: "2.1 KB",
      badge: "Core Idea Synthesis",
      preview:
        "Most creators think content creation starts with an outline. In reality, it starts with an emotional friction you had during your work day...",
    },
  };

  // Step 2 tone samples
  const toneSamples = {
    conversational: {
      label: "Conversational",
      icon: MessageSquare,
      hookScore: "96%",
      clarity: "99%",
      energy: "Warm & Relatable",
      sample:
        "“I used to sit on ideas for weeks until they felt completely ready. Big mistake. The moment I started sharing the messy middle, people actually showed up and leaned in.”",
      traits: ["Human cadence", "Short sentences", "Zero corporate fluff"],
    },
    professional: {
      label: "Professional",
      icon: Briefcase,
      hookScore: "94%",
      clarity: "100%",
      energy: "Authoritative",
      sample:
        "“Creative momentum compounds through transparency. Documenting the building process establishes domain authority and trust far sooner than waiting for a polished release.”",
      traits: ["Executive summary", "Framework logic", "Credibility signals"],
    },
    bold: {
      label: "Bold & Viral",
      icon: Flame,
      hookScore: "99%",
      clarity: "97%",
      energy: "High Friction",
      sample:
        "“Perfectionism is silently killing your reach. Nobody connects with your sanitized highlight reel. Ship the messy work and let the market validate it.”",
      traits: ["Scroll-stopping hook", "Pattern interrupt", "High conviction"],
    },
  };

  // Step 3 platform outputs
  const platformOutputs = {
    x: {
      name: "X (Twitter) Thread",
      handle: "@prismify_creator",
      icon: "𝕏",
      tag: "5-post viral thread",
      metrics: "48 Reposts • 340 Likes",
      content:
        "1/5 The biggest lie in content creation: 'I need to wait until the project is finished.'\n\nHere is what happens when you build in public instead: 🧵",
    },
    linkedin: {
      name: "LinkedIn Post",
      handle: "Founder & Creator • 2nd",
      icon: "in",
      tag: "Hook + Spaced Layout",
      metrics: "142 Comments • 1,280 Impressions",
      content:
        "Most creators don't have a distribution problem.\n\nThey have a perfectionism problem.\n\nHere are 3 counterintuitive shifts that transformed my creative output this quarter:\n\n1. Progress is the hook\n2. Document, don't perform\n3. Feedback starts on day 1",
    },
    newsletter: {
      name: "Substack / Email",
      handle: "The Prismify Dispatch",
      icon: "✉",
      tag: "Deep Dive Editorial",
      metrics: "48% Open Rate • 312 words",
      content:
        "Subject: Stop hiding your unfinished work\n\nHey friend,\n\nThis week we're breaking down why the messy middle of any creative project is 10x more captivating than the finished product. Let's dig in...",
    },
  };

  const handleCopyPlatform = async () => {
    const text = platformOutputs[activePlatform].content;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPlatform(true);
      setTimeout(() => setCopiedPlatform(false), 2000);
    } catch {
      setCopiedPlatform(false);
    }
  };

  return (
    <section
      id="how-it-works"
      className="mt-28 border-t border-[#2d3934] pt-16 lg:mt-36"
      aria-label="How Prismify Works"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5f56b]/30 bg-[#16241c] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c5f56b]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c5f56b]" />
            How It Works
          </div>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#f5f1e8] sm:text-4xl lg:text-5xl">
            From raw thoughts to published pieces in{" "}
            <span className="text-[#c5f56b]">three simple steps.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-[#89968d] md:text-right">
          No writer&apos;s block. No manual reformatting for three different
          channels. Prismify turns your unpolished brain dumps into high-impact
          assets in seconds.
        </p>
      </div>

      {/* ── Pipeline Stepper Line ── */}
      <div className="mt-12 hidden items-center justify-between gap-4 rounded-2xl border border-[#2d3934] bg-[#141b18] px-6 py-3.5 sm:flex">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c5f56b] text-xs font-black text-[#101514]">
            1
          </span>
          <span className="text-xs font-semibold tracking-wide text-[#f5f1e8]">
            Ingest Raw Input
          </span>
          <span className="text-[11px] text-[#718078]">(Voice, Notes, Drafts)</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#c5f56b]/40 via-[#7fe0a8]/30 to-transparent" />
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e2e27] text-xs font-black text-[#c5f56b] ring-1 ring-[#c5f56b]/40">
            2
          </span>
          <span className="text-xs font-semibold tracking-wide text-[#f5f1e8]">
            Shape Perspective &amp; Tone
          </span>
          <span className="text-[11px] text-[#718078]">(AI Voice Engine)</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#7fe0a8]/30 via-[#c5f56b]/40 to-transparent" />
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e2e27] text-xs font-black text-[#c5f56b] ring-1 ring-[#c5f56b]/40">
            3
          </span>
          <span className="text-xs font-semibold tracking-wide text-[#f5f1e8]">
            Publish Multi-Platform
          </span>
          <span className="text-[11px] text-[#718078]">(X, LinkedIn, Email)</span>
        </div>
      </div>

      {/* ── 3 Interactive Step Cards ── */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* ── CARD 01: Drop in the messy version ── */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#34423b] bg-[#161f1c] p-6 shadow-xl transition-all duration-300 hover:border-[#c5f56b]/40 hover:shadow-[0_8px_32px_rgba(197,245,107,0.06)]">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#c5f56b]/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

          {/* Card Top: Step number & Title */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a2b22] text-xs font-black text-[#c5f56b] ring-1 ring-[#c5f56b]/30">
                  01
                </span>
                <span className="rounded-full border border-[#2d3934] bg-[#111816] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#aeb9b0]">
                  Ingestion
                </span>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2d3934] bg-[#121a17] text-[#c5f56b]">
                <Mic className="h-4 w-4" />
              </span>
            </div>

            <h3 className="text-xl font-semibold leading-snug text-[#f5f1e8]">
              Drop in the messy version.
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#89968d]">
              No outlining or self-censorship needed. Paste voice recordings,
              half-baked thoughts, or draft fragments.
            </p>

            {/* Interactive Tab Selectors */}
            <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-xl border border-[#2b3831] bg-[#111816] p-1 text-[11px] font-medium">
              {[
                { id: "voice", label: "Voice Note", icon: Mic },
                { id: "notes", label: "Brain Dump", icon: Sparkles },
                { id: "draft", label: "Rough Draft", icon: FileText },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveInputType(id)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition-all duration-200 cursor-pointer ${
                    activeInputType === id
                      ? "bg-[#1f3026] text-[#c5f56b] font-semibold shadow-sm ring-1 ring-[#c5f56b]/20"
                      : "text-[#718078] hover:text-[#c8d5ce]"
                  }`}
                >
                  <Icon className="h-3 w-3 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </div>

            {/* Interactive Live Input Demonstration Window */}
            <div className="mt-4 rounded-xl border border-[#2d3934] bg-[#111816] p-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#222e28] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#c5f56b] animate-ping" />
                  <span className="font-mono text-[11px] text-[#c8d5ce]">
                    {inputSamples[activeInputType].file}
                  </span>
                </div>
                <span className="rounded bg-[#1a2820] px-2 py-0.5 text-[10px] font-bold text-[#c5f56b]">
                  {inputSamples[activeInputType].badge}
                </span>
              </div>

              {/* Dynamic Content Preview */}
              {activeInputType === "voice" ? (
                <div className="mt-3 space-y-3">
                  {/* Animated Waveform Simulation */}
                  <div className="flex items-center justify-between gap-1 rounded-lg border border-[#26352d] bg-[#15201b] px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      {[12, 22, 16, 28, 8, 24, 18, 30, 14, 20, 10, 26, 16].map(
                        (h, i) => (
                          <span
                            key={i}
                            className="w-1 rounded-full bg-[#c5f56b] transition-all"
                            style={{
                              height: `${h}px`,
                              animation: `pulse 1.2s ease-in-out infinite ${
                                (i * 0.1).toFixed(1)
                              }s`,
                            }}
                          />
                        )
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-[#718078]">
                      01:42 / 01:42
                    </span>
                  </div>

                  <p className="font-mono text-[11px] leading-5 text-[#8fa296] italic">
                    {inputSamples.voice.preview}
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <pre className="whitespace-pre-wrap font-mono text-[11px] leading-5 text-[#8fa296]">
                    {inputSamples[activeInputType].preview}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Card Micro-Badge */}
          <div className="mt-5 flex items-center justify-between border-t border-[#26352d] pt-3 text-[11px] text-[#718078]">
            <span>{inputSamples[activeInputType].duration}</span>
            <span className="flex items-center gap-1 text-[#7fe0a8]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Source extracted
            </span>
          </div>
        </div>

        {/* ── CARD 02: Choose your point of view ── */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#34423b] bg-[#161f1c] p-6 shadow-xl transition-all duration-300 hover:border-[#c5f56b]/40 hover:shadow-[0_8px_32px_rgba(197,245,107,0.06)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#c5f56b]/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

          {/* Card Top */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a2b22] text-xs font-black text-[#c5f56b] ring-1 ring-[#c5f56b]/30">
                  02
                </span>
                <span className="rounded-full border border-[#2d3934] bg-[#111816] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#aeb9b0]">
                  AI Synthesis
                </span>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2d3934] bg-[#121a17] text-[#c5f56b]">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>

            <h3 className="text-xl font-semibold leading-snug text-[#f5f1e8]">
              Choose your point of view.
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#89968d]">
              Direct how the idea lands. Pick tone, energy, and perspective to
              match your brand — zero sterile AI clichés.
            </p>

            {/* Interactive Tone Buttons */}
            <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-xl border border-[#2b3831] bg-[#111816] p-1 text-[11px] font-medium">
              {Object.entries(toneSamples).map(([key, data]) => {
                const Icon = data.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTone(key)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition-all duration-200 cursor-pointer ${
                      activeTone === key
                        ? "bg-[#1f3026] text-[#c5f56b] font-semibold shadow-sm ring-1 ring-[#c5f56b]/20"
                        : "text-[#718078] hover:text-[#c8d5ce]"
                    }`}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    <span className="truncate">{data.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Live Tone Preview */}
            <div className="mt-4 rounded-xl border border-[#2d3934] bg-[#111816] p-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#222e28] pb-2.5">
                <span className="text-[11px] text-[#718078]">
                  Energy:{" "}
                  <strong className="text-[#c5f56b]">
                    {toneSamples[activeTone].energy}
                  </strong>
                </span>
                <span className="text-[10px] font-mono text-[#7fe0a8]">
                  Hook: {toneSamples[activeTone].hookScore}
                </span>
              </div>

              {/* Dynamic rewriting sample */}
              <div className="mt-3">
                <p className="text-[11px] leading-5 text-[#d3dbd2] font-medium transition-all duration-300">
                  {toneSamples[activeTone].sample}
                </p>
              </div>

              {/* Trait pills */}
              <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-[#1e2a24]">
                {toneSamples[activeTone].traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded bg-[#16241c] px-2 py-0.5 text-[9px] font-semibold text-[#8fa296] border border-[#24352b]"
                  >
                    ✦ {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Card Micro-Badge */}
          <div className="mt-5 flex items-center justify-between border-t border-[#26352d] pt-3 text-[11px] text-[#718078]">
            <span>Clarity: {toneSamples[activeTone].clarity}</span>
            <span className="flex items-center gap-1 text-[#c5f56b]">
              <Zap className="h-3 w-3" />
              Engine calibrated
            </span>
          </div>
        </div>

        {/* ── CARD 03: Publish everywhere ── */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#34423b] bg-[#161f1c] p-6 shadow-xl transition-all duration-300 hover:border-[#c5f56b]/40 hover:shadow-[0_8px_32px_rgba(197,245,107,0.06)]">
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#c5f56b]/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

          {/* Card Top */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a2b22] text-xs font-black text-[#c5f56b] ring-1 ring-[#c5f56b]/30">
                  03
                </span>
                <span className="rounded-full border border-[#2d3934] bg-[#111816] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#aeb9b0]">
                  Distribution
                </span>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2d3934] bg-[#121a17] text-[#c5f56b]">
                <Share2 className="h-4 w-4" />
              </span>
            </div>

            <h3 className="text-xl font-semibold leading-snug text-[#f5f1e8]">
              Publish everywhere.
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#89968d]">
              One click generates native content formatted specifically for X,
              LinkedIn, and your newsletter.
            </p>

            {/* Interactive Platform Tabs */}
            <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-xl border border-[#2b3831] bg-[#111816] p-1 text-[11px] font-medium">
              {[
                { id: "x", label: "X Thread", icon: "𝕏" },
                { id: "linkedin", label: "LinkedIn", icon: "in" },
                { id: "newsletter", label: "Newsletter", icon: "✉" },
              ].map(({ id, label, icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActivePlatform(id)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 transition-all duration-200 cursor-pointer ${
                    activePlatform === id
                      ? "bg-[#1f3026] text-[#c5f56b] font-semibold shadow-sm ring-1 ring-[#c5f56b]/20"
                      : "text-[#718078] hover:text-[#c8d5ce]"
                  }`}
                >
                  <span className="font-bold text-[11px]">{icon}</span>
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </div>

            {/* Interactive Live Post Preview */}
            <div className="mt-4 rounded-xl border border-[#2d3934] bg-[#111816] p-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#222e28] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[#1e2e26] text-[10px] font-black text-[#c5f56b]">
                    {platformOutputs[activePlatform].icon}
                  </span>
                  <span className="font-medium text-[#c8d5ce] text-[11px]">
                    {platformOutputs[activePlatform].name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPlatform}
                  className="flex items-center gap-1 rounded bg-[#1b2b22] px-2 py-0.5 text-[10px] font-medium text-[#c5f56b] transition hover:bg-[#253d2f] cursor-pointer"
                  title="Copy sample post to clipboard"
                >
                  {copiedPlatform ? (
                    <>
                      <Check className="h-3 w-3 text-[#c5f56b]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dynamic Post Content */}
              <div className="mt-3">
                <pre className="whitespace-pre-wrap font-sans text-[11px] leading-5 text-[#8fa296]">
                  {platformOutputs[activePlatform].content}
                </pre>
              </div>

              {/* Engagement / Tag Pill */}
              <div className="mt-3 flex items-center justify-between border-t border-[#1e2a24] pt-2 text-[10px] text-[#718078]">
                <span>{platformOutputs[activePlatform].tag}</span>
                <span className="text-[#aeb9b0]">
                  {platformOutputs[activePlatform].metrics}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Card Micro-Badge */}
          <div className="mt-5 flex items-center justify-between border-t border-[#26352d] pt-3 text-[11px] text-[#718078]">
            <span>100% Platform formatted</span>
            <span className="flex items-center gap-1 text-[#7fe0a8]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Ready to schedule
            </span>
          </div>
        </div>
      </div>

      {/* ── Feature Highlights Footer Strip ── */}
      <div className="mt-8 grid gap-4 rounded-2xl border border-[#2d3934] bg-[#141d1a] p-5 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1c2a23] text-[#c5f56b]">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#f5f1e8]">
              Sub-10s Transformation
            </p>
            <p className="text-[11px] text-[#718078]">
              No waiting queues or multi-step re-prompting.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#26352e] pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1c2a23] text-[#7fe0a8]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#f5f1e8]">
              Human Cadence Preserved
            </p>
            <p className="text-[11px] text-[#718078]">
              Keeps your real voice, removes robotic filler.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#26352e] pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1c2a23] text-[#c5f56b]">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5f1e8]">
                Omnichannel Ready
              </p>
              <p className="text-[11px] text-[#718078]">
                X threads, LinkedIn posts &amp; newsletters.
              </p>
            </div>
          </div>
          <Link
            href="/workspace"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-[#1b2b23] px-3.5 py-1.5 text-xs font-semibold text-[#c5f56b] transition hover:bg-[#c5f56b] hover:text-[#101514]"
          >
            <span>Try now</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
