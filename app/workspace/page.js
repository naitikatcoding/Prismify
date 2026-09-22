"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { Loader2, Copy, Check, ChevronDown, User } from "lucide-react";

const TONES = ["Professional", "Viral/Hype", "Deep/Thoughtful", "Casual/Witty"];

const TABS = [
  { id: "twitter", label: "🐦 Twitter Thread" },
  { id: "linkedin", label: "💼 LinkedIn Post" },
  { id: "newsletter", label: "📧 Newsletter" },
];

const buildMockData = (input, tone) => ({
  twitterThread: [
    `1/ Most creators write once and publish once. That's leaving 80% of your reach on the table. Here's how to turn one idea into a full content spectrum (${tone} mode) 🧵`,
    `2/ Start with a single core idea: "${input.slice(0, 80).trim()}${input.length > 80 ? "..." : ""}". Strip it to one clear takeaway, then reshape it for each platform instead of copy-pasting.`,
    `3/ Threads for reach, LinkedIn for authority, newsletters for depth. Same idea, three formats, zero burnout. Follow for more systems like this. ✨`,
  ],
  linkedinPost: `I used to spend hours rewriting the same idea for every platform.

Then I changed one thing: I started with a single core insight and reshaped it for each audience.

Here's the framework:

→ Define the one takeaway
→ Match the format to the platform
→ Keep the voice consistent (${tone})

The result? One idea, three high-performing posts, and my weekends back.

What's your best content repurposing tip?

#ContentStrategy #CreatorEconomy #Productivity`,
  newsletter: `Subject: One idea, three formats

Hey there,

This week I want to share a simple system that changed how I create content.

THE CORE IDEA
${input.slice(0, 160).trim()}${input.length > 160 ? "..." : ""}

THE 3-STEP FRAMEWORK
1. Distill: find the one takeaway worth sharing.
2. Reshape: adapt the format to each platform.
3. Publish: schedule everything in a single sitting.

THIS WEEK'S CHALLENGE
Take your last long-form piece and turn it into three posts. Reply and tell me how it went.

Until next time,
The Prismify Team`,
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

  useEffect(() => {
    let isMounted = true;

    getSession().then((session) => {
      if (isMounted) {
        setAuthChecked(true);
        if (!session) {
          router.replace("/login");
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [router]);

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
    setTimeout(() => {
      setGeneratedData(buildMockData(rawInput, selectedTone));
      setActiveTab("twitter");
      setIsLoading(false);
    }, 2000);
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
    <main className="min-h-screen bg-[#101514] px-5 pb-8 pt-44 text-[#f5f1e8] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Navbar */}
        <div className="mb-8 flex items-center justify-between border-b border-[#2d3934] pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718078]">
              ✨ Prismify workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Create something remarkable.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-[#41504a] px-4 py-2 text-sm font-semibold transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
            >
              Back home
            </Link>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#41504a] bg-[#15201d] text-[#aeb9b0]">
              <User size={18} />
            </div>
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left: Input Engine */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.5rem] border border-[#34423b] bg-[#15201d] p-5 shadow-[0_0_0_1px_rgba(197,245,107,0.02)]"
          >
            <label
              htmlFor="source"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[#aeb9b0]"
            >
              Source Content
            </label>
            <textarea
              id="source"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              className="mt-5 min-h-[18rem] w-full resize-none rounded-[1rem] border border-[#46544c] bg-[#111816] p-4 text-sm leading-6 text-[#d3dbd2] outline-none placeholder:text-[#718078] focus:border-[#c5f56b] focus:ring-2 focus:ring-[#c5f56b]/30"
              placeholder="Paste your transcript, rough idea, or brain dump here..."
            />

            <label
              htmlFor="tone"
              className="mt-5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#aeb9b0]"
            >
              Select Tone
            </label>
            <div className="relative mt-3">
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

            <button
              type="submit"
              disabled={isLoading || !rawInput.trim()}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c5f56b] to-[#7fe0a8] px-4 py-3 text-sm font-bold text-[#101514] shadow-[0_0_20px_rgba(197,245,107,0.2)] transition hover:brightness-110 ${
                isLoading || !rawInput.trim()
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Splitting...
                </>
              ) : (
                "⚡ Split the Prism"
              )}
            </button>
          </form>

          {/* Right: Spectrum Output */}
          <div className="flex min-h-[28rem] flex-col rounded-[1.5rem] border border-[#34423b] bg-[#0f1614] p-5">
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "border-[#c5f56b] bg-[#c5f56b] text-[#101514]"
                      : "border-[#41504a] text-[#aeb9b0] hover:border-[#c5f56b] hover:text-[#c5f56b]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-1 flex-col">
              {!generatedData ? (
                <div className="flex flex-1 items-center justify-center rounded-[1rem] border border-dashed border-[#405047] p-6 text-center">
                  <div>
                    <p className="text-lg font-semibold text-[#eef1ed]">
                      Your AI-crafted spectrum will appear here...
                    </p>
                    <p className="mt-2 text-sm text-[#89968d]">
                      Choose a tone and generate your first post.
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
                        <Check size={16} /> ✓ Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy to Clipboard
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