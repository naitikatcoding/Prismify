"use client";

import { useState } from "react";

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
            <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Your raw thoughts,
              <span className="block text-[#c5f56b]">made remarkable.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-[#aeb9b0] sm:text-lg">
              Prismify turns brain dumps, transcripts, and rough ideas into
              polished content for every place your audience spends time.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#studio"
                className="inline-flex items-center justify-center rounded-full bg-[#c5f56b] px-6 py-3.5 text-sm font-bold text-[#101514] transition hover:bg-white"
              >
                Start creating
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[#41504a] px-6 py-3.5 text-sm font-semibold text-[#f5f1e8] transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
              >
                See how it works
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#2d3934] pt-5 text-xs uppercase tracking-[0.14em] text-[#718078]">
              <span>One idea</span>
              <span className="text-[#c5f56b]">+</span>
              <span>Three ready-to-share formats</span>
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
                  Llama 3
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

                  <p className="break-words text-sm leading-6 text-[#d3dbd2]">
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
                        className={`rounded-md px-2.5 py-1.5 text-xs transition ${
                          activeTone === tone
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
                    className="mt-5 w-full rounded-lg bg-[#c5f56b] px-4 py-3 text-sm font-bold text-[#101514] transition hover:bg-white"
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
                          className={`border-b-2 pb-2 transition ${
                            activePlatform === name
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
                    className={`max-h-64 overflow-y-auto break-words whitespace-pre-line pr-2 text-sm leading-6 [overflow-wrap:anywhere] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                      generated ? "text-[#17211d]" : "text-[#52605a]"
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

        <section
          id="how-it-works"
          className="mt-24 grid gap-5 border-t border-[#2d3934] pt-8 sm:grid-cols-3 lg:mt-32"
        >
          <div>
            <p className="mb-4 text-sm font-semibold text-[#c5f56b]">01</p>
            <h2 className="text-xl font-semibold">
              Drop in the messy version.
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#89968d]">
              Paste a transcript, article, voice note, or the idea that&apos;s
              still finding its shape.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold text-[#c5f56b]">02</p>
            <h2 className="text-xl font-semibold">
              Choose your point of view.
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#89968d]">
              Set the tone, audience, and energy. Prismify handles the
              rewriting work.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold text-[#c5f56b]">03</p>
            <h2 className="text-xl font-semibold">Publish everywhere.</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#89968d]">
              Get a social thread, LinkedIn post, and newsletter ready to
              review and share.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}