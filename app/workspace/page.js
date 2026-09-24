"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { Loader2, Copy, Check, ChevronDown } from "lucide-react";

const TONES = ["Professional", "Viral/Hype", "Deep/Thoughtful", "Casual/Witty"];

const TABS = [
  { id: "twitter", label: "🐦 Twitter Thread" },
  { id: "linkedin", label: "💼 LinkedIn Post" },
  { id: "newsletter", label: "📧 Newsletter" },
];

const buildMockData = (input, tone) => ({
  twitterThread: [
    `1/ Most creators publish once and hope for traction. The smarter move is to turn one idea into a content system (${tone} style) 🧵`,
    `2/ Start with a single core insight: "${input.slice(0, 80).trim()}${input.length > 80 ? "..." : ""}". Strip the noise, keep the point, and reshape it for every channel.`,
    `3/ One idea, three formats, more reach. Threads drive discovery, LinkedIn builds authority, and newsletters deepen trust. That's the leverage.`,
  ],
  linkedinPost: `Most people repurpose content by copying the same post across channels.

That works for speed, but not for impact.

The better play is simple: start with one strong insight, then adapt the structure to the platform.

For Twitter, you aim for momentum.
For LinkedIn, you aim for authority.
For newsletters, you aim for depth.

The result is not just more content — it's better content that feels native to each audience.

A strong content system beats a louder content schedule.

#ContentStrategy #CreatorEconomy #BrandBuilding`,
  newsletter: `Subject: Turn one idea into three formats

Hey there,

This week’s idea is simple: stop treating every platform as a separate content job.

The core message
${input.slice(0, 160).trim()}${input.length > 160 ? "..." : ""}

The framework
1. Distill the takeaway.
2. Adapt the structure to the platform.
3. Publish with a repeatable cadence.

The goal is not to create more work. It is to create more leverage.

Pick one idea and turn it into a post, a thread, and a note. Then measure what actually lands.

Until next time,
Prismify`,
});

export default function WorkspacePage() {
  const router = useRouter();
  const [rawInput, setRawInput] = useState("");
  const [selectedTone, setSelectedTone] = useState(TONES[0]);
  const [activeTab, setActiveTab] = useState("twitter");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState("idle");

  useEffect(() => {
    let isMounted = true;

    const loadSessionData = async () => {
      const session = await getSession();

      if (!isMounted) return;

      setAuthChecked(true);
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const response = await fetch("/api/content");
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setSavedCount(data.content?.length || 0);
          }
        }
      } catch (error) {
        console.error("Failed to load saved content:", error);
      }
    };

    loadSessionData().catch((error) => {
      console.error("Failed to check session:", error);
      if (isMounted) setAuthChecked(true);
    });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const inputMeta = useMemo(() => {
    const trimmed = rawInput.trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 160));

    return {
      wordCount,
      readTime,
    };
  }, [rawInput]);

  if (!authChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101514] px-5 text-sm text-[#aeb9b0]">
        Checking your session...
      </main>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading || !rawInput.trim()) return;
    setIsLoading(true);
    setSaveStatus("saving");
    setTimeout(() => {
      const outputs = buildMockData(rawInput, selectedTone);
      setGeneratedData(outputs);
      setActiveTab("twitter");
      setIsLoading(false);

      fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawInput,
          tone: selectedTone,
          outputs,
        }),
      })
        .then(async (response) => {
          if (!response.ok) throw new Error("Content save failed");
          setSavedCount((count) => count + 1);
          setSaveStatus("saved");
        })
        .catch((error) => {
          console.error("Failed to save generated content:", error);
          setSaveStatus("error");
        });
    }, 1200);
  };

  const getActiveText = () => {
    if (!generatedData) return "";
    if (activeTab === "twitter") return generatedData.twitterThread.join("\n\n");
    if (activeTab === "linkedin") return generatedData.linkedinPost;
    return generatedData.newsletter;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#101514] px-5 pb-8 pt-32 text-[#f5f1e8] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-[#2d3934] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#718078]">
              Studio
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Content repurposing workspace
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#aeb9b0]">
            <span className="rounded-full border border-[#41504a] bg-[#15201d] px-3 py-1.5">
              {selectedTone}
            </span>
            <span className="rounded-full border border-[#41504a] bg-[#15201d] px-3 py-1.5">
              {rawInput.trim() ? `${inputMeta.wordCount} words` : "Draft mode"}
            </span>
            <span className="rounded-full border border-[#41504a] bg-[#15201d] px-3 py-1.5">
              {rawInput.trim() ? `${inputMeta.readTime} min read` : "Ready"}
            </span>
            <span className="rounded-full border border-[#41504a] bg-[#15201d] px-3 py-1.5">
              {savedCount} saved
            </span>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.5rem] border border-[#34423b] bg-[#15201d] p-5 shadow-[0_0_0_1px_rgba(197,245,107,0.02)]"
          >
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="source"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#aeb9b0]"
              >
                Source content
              </label>
              <span className="text-xs text-[#718078]">
                {rawInput.trim() ? `${Math.min(rawInput.trim().length, 999)} chars` : "No content yet"}
              </span>
            </div>

            <textarea
              id="source"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              className="mt-5 min-h-[18rem] w-full resize-none rounded-[1rem] border border-[#46544c] bg-[#111816] p-4 text-sm leading-6 text-[#d3dbd2] outline-none placeholder:text-[#718078] focus:border-[#c5f56b] focus:ring-2 focus:ring-[#c5f56b]/30"
              placeholder="Paste a transcript, idea, article draft, or rough note..."
            />

            <div className="mt-5 rounded-[1rem] border border-[#2d3934] bg-[#111816] p-3">
              <label
                htmlFor="tone"
                className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#aeb9b0]"
              >
                Tone
              </label>
              <div className="relative mt-2">
                <select
                  id="tone"
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#46544c] bg-[#111816] px-4 py-3 pr-10 text-sm text-[#d3dbd2] outline-none focus:border-[#c5f56b] focus:ring-2 focus:ring-[#c5f56b]/30"
                >
                  {TONES.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718078]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !rawInput.trim()}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c5f56b] to-[#7fe0a8] px-4 py-3 text-sm font-bold text-[#101514] shadow-[0_0_20px_rgba(197,245,107,0.2)] transition hover:brightness-110 ${
                isLoading || !rawInput.trim() ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating variants...
                </>
              ) : (
                "⚡ Generate content"
              )}
            </button>
            <p className="mt-3 text-center text-xs text-[#718078]" aria-live="polite">
              {saveStatus === "saving" && "Saving to your studio..."}
              {saveStatus === "saved" && "Saved to your studio"}
              {saveStatus === "error" && "Could not save this version"}
            </p>
          </form>

          <div className="flex min-h-[28rem] flex-col rounded-[1.5rem] border border-[#34423b] bg-[#0f1614] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2d3934] pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718078]">
                  Output
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#eef1ed]">
                  {generatedData ? "Generated variants" : "Ready when you are"}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      activeTab === tab.id
                        ? "border-[#c5f56b] bg-[#c5f56b] text-[#101514]"
                        : "border-[#41504a] text-[#aeb9b0] hover:border-[#c5f56b] hover:text-[#c5f56b]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-1 flex-col">
              {!generatedData ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-[1rem] border border-dashed border-[#405047] p-6 text-center">
                  <div className="max-w-sm">
                    <p className="text-lg font-semibold text-[#eef1ed]">
                      Turn one idea into a full content system.
                    </p>
                    <p className="mt-2 text-sm text-[#89968d]">
                      Paste your source, choose the tone, and generate multiple formats from the same message.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto rounded-[1rem] border border-[#34423b] bg-[#111816] p-5">
                    {activeTab === "twitter" ? (
                      <div className="space-y-0">
                        {generatedData.twitterThread.map((tweet, i, arr) => (
                          <div key={i} className="relative flex gap-4 pb-4">
                            {i < arr.length - 1 && (
                              <span className="absolute left-4 top-9 h-[calc(100%-2rem)] w-px bg-[#34423b]" />
                            )}
                            <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c5f56b]/50 bg-[#15201d] text-xs font-bold text-[#c5f56b]">
                              {i + 1}
                            </span>
                            <p className="flex-1 rounded-xl border border-[#34423b] bg-[#15201d] p-4 text-sm leading-6 text-[#d3dbd2]">
                              {tweet}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="whitespace-pre-line text-sm leading-7 text-[#d3dbd2]">
                        {getActiveText()}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#41504a] px-4 py-3 text-sm font-semibold transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy output
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}