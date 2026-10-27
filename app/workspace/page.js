"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import {
  Loader2,
  Copy,
  Check,
  ChevronDown,
  History,
  Trash2,
  X,
  Download,
  FileText,
  ArrowRight,
  Sparkles,
  Search,
  Lightbulb,
  Keyboard,
} from "lucide-react";

const TONES = ["Professional", "Conversational", "Bold"];

const TABS = [
  { id: "twitter", label: "🐦 Twitter Thread" },
  { id: "linkedin", label: "💼 LinkedIn Post" },
  { id: "newsletter", label: "📧 Newsletter" },
];

const CREATOR_TEMPLATES = [
  {
    id: "founder-insight",
    title: "💡 Founder Insight",
    desc: "Lessons & reflections",
    tone: "Conversational",
    prompt:
      "Most early-stage creators think the secret to growth is finding a unique angle. In reality, it is showing up before you feel ready. We spent 3 months over-engineering our product before talking to a single customer. The moment we started sharing raw progress on Twitter and LinkedIn, everything shifted. People don't buy perfection; they buy progress.",
  },
  {
    id: "podcast-notes",
    title: "🎙️ Podcast / Video Note",
    desc: "Key takeaways & breakdown",
    tone: "Professional",
    prompt:
      "In our latest discussion with leading SaaS founders, three key patterns emerged for organic distribution in 2026:\n1. Short-form hooks that diagnose a specific pain point in under 3 seconds.\n2. Repurposing every long-form podcast or newsletter into 3 distinct platform formats.\n3. Building distribution pipelines that compound rather than relying on one-off viral spikes.",
  },
  {
    id: "product-launch",
    title: "🚀 Product Launch",
    desc: "Announcement & value hook",
    tone: "Bold",
    prompt:
      "Today we are publicly launching Prismify. We got tired of watching brilliant ideas die inside messy Notion drafts and voice memos. Prismify takes any brain dump or rough outline and instantly repurposes it into high-impact Twitter threads, LinkedIn thought leadership, and email newsletters in seconds. The future of content creation is speed.",
  },
  {
    id: "case-study",
    title: "🧵 Case Study",
    desc: "Step-by-step breakdown",
    tone: "Professional",
    prompt:
      "How one solo creator scaled from 0 to 50k followers in 6 months by repurposing a single weekly article into daily multi-platform content:\n- Monday: Drafted 1 core essay (800 words)\n- Tuesday: Turned the main thesis into a 5-tweet hook thread\n- Thursday: Extracted actionable framework for a LinkedIn carousel\n- Saturday: Sent executive summary in the weekly newsletter\nResult: 4x content output with zero additional creative burnout.",
  },
];

export default function WorkspacePage() {
  const router = useRouter();
  const [rawInput, setRawInput] = useState("");
  const [selectedTone, setSelectedTone] = useState(TONES[0]);
  const [activeTab, setActiveTab] = useState("twitter");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // History search and filter states
  const [historySearch, setHistorySearch] = useState("");
  const [historyToneFilter, setHistoryToneFilter] = useState("All");

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
        setLoadingHistory(true);
        const response = await fetch("/api/content");
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            const list = data.content || [];
            setHistory(list);
            setSavedCount(list.length);
          }
        }
      } catch (error) {
        console.error("Failed to load saved content:", error);
      } finally {
        if (isMounted) setLoadingHistory(false);
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

  const variantMeta = useMemo(() => {
    if (!generatedData) return null;

    if (activeTab === "twitter") {
      const thread = Array.isArray(generatedData.twitterThread)
        ? generatedData.twitterThread
        : [generatedData.twitterThread].filter(Boolean);
      const totalChars = thread.reduce((sum, t) => sum + (t?.length || 0), 0);
      const totalWords = thread.reduce(
        (sum, t) => sum + (t ? t.trim().split(/\s+/).filter(Boolean).length : 0),
        0
      );
      const readTime = Math.max(1, Math.ceil(totalWords / 180));
      return {
        countLabel: `${thread.length} ${thread.length === 1 ? "tweet" : "tweets"}`,
        words: `${totalWords} words`,
        chars: `${totalChars.toLocaleString()} total chars`,
        readTime: `~${readTime} min read`,
      };
    }

    const text =
      (activeTab === "linkedin"
        ? generatedData.linkedinPost
        : generatedData.newsletter) || "";
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = trimmed.length;
    const readTime = Math.max(1, Math.ceil(words / 180));

    return {
      countLabel: activeTab === "linkedin" ? "LinkedIn Post" : "Newsletter Issue",
      words: `${words} words`,
      chars: `${chars.toLocaleString()} chars`,
      readTime: `~${readTime} min read`,
    };
  }, [generatedData, activeTab]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesTone =
        historyToneFilter === "All" || item.tone === historyToneFilter;
      const query = historySearch.toLowerCase().trim();
      if (!query) return matchesTone;

      const inputMatch = item.rawInput?.toLowerCase().includes(query);
      const twitterMatch = Array.isArray(item.outputs?.twitterThread)
        ? item.outputs.twitterThread.some((t) => t.toLowerCase().includes(query))
        : item.outputs?.twitterThread?.toLowerCase().includes(query);
      const linkedinMatch = item.outputs?.linkedinPost?.toLowerCase().includes(query);
      const newsletterMatch = item.outputs?.newsletter?.toLowerCase().includes(query);

      return matchesTone && (inputMatch || twitterMatch || linkedinMatch || newsletterMatch);
    });
  }, [history, historySearch, historyToneFilter]);

  const handleApplyTemplate = (template) => {
    setRawInput(template.prompt);
    setSelectedTone(template.tone);
  };

  const handleSubmit = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isLoading || !rawInput.trim()) return;
    setIsLoading(true);
    setSaveStatus("saving");
    setErrorMessage("");

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawInput,
          tone: selectedTone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content.");
      }

      if (data.content?.outputs) {
        setGeneratedData(data.content.outputs);
        setActiveTab("twitter");
        setHistory((prev) => [data.content, ...prev]);
        setSavedCount((count) => count + 1);
        setSaveStatus("saved");
      } else {
        throw new Error("Invalid output received from server.");
      }
    } catch (error) {
      console.error("Failed to generate content:", error);
      setErrorMessage(error.message || "Something went wrong while generating content.");
      setSaveStatus("error");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, rawInput, selectedTone]);

  const getActiveText = useCallback(() => {
    if (!generatedData) return "";
    if (activeTab === "twitter") {
      return Array.isArray(generatedData.twitterThread)
        ? generatedData.twitterThread.join("\n\n")
        : (generatedData.twitterThread || "");
    }
    if (activeTab === "linkedin") return generatedData.linkedinPost || "";
    return generatedData.newsletter || "";
  }, [generatedData, activeTab]);

  const handleCopy = useCallback(async () => {
    const text = getActiveText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }, [getActiveText]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape closes open modals or drawers
      if (e.key === "Escape") {
        setIsShortcutsOpen(false);
        setIsHistoryOpen(false);
        return;
      }

      // '?' toggles shortcuts dialog when not typing inside an input or textarea
      if (
        e.key === "?" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // Ctrl+Shift+C / Cmd+Shift+C to copy current active tab
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        handleCopy();
        return;
      }

      // Ctrl+Enter / Cmd+Enter anywhere to generate
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (!isLoading && rawInput.trim()) {
          e.preventDefault();
          handleSubmit(e);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, rawInput, handleCopy, handleSubmit]);

  const handleCopyTweet = async (tweet, index) => {
    try {
      await navigator.clipboard.writeText(tweet);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Copy tweet failed:", err);
    }
  };

  const handleDownloadAll = () => {
    if (!generatedData) return;
    const tweets = Array.isArray(generatedData.twitterThread)
      ? generatedData.twitterThread.map((t, i) => `${i + 1}/ ${t}`).join("\n\n")
      : (generatedData.twitterThread || "");

    const mdContent = `# Prismify Repurposed Content
**Tone:** ${selectedTone}
**Date:** ${new Date().toLocaleString()}

---

## 🐦 Twitter Thread
${tweets}

---

## 💼 LinkedIn Post
${generatedData.linkedinPost || ""}

---

## 📧 Newsletter
${generatedData.newsletter || ""}
`;

    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `prismify-content-${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handleLoadItem = (item) => {
    setRawInput(item.rawInput || "");
    if (item.tone && TONES.includes(item.tone)) {
      setSelectedTone(item.tone);
    }
    if (item.outputs) {
      setGeneratedData(item.outputs);
      setActiveTab("twitter");
    }
    setIsHistoryOpen(false);
  };

  const handleDeleteItem = async (e, id) => {
    e.stopPropagation();
    if (!id || deletingId) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/content?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
        setSavedCount((count) => Math.max(0, count - 1));
      }
    } catch (err) {
      console.error("Failed to delete content item:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (!authChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101514] px-5 text-sm text-[#aeb9b0]">
        <Loader2 size={20} className="mr-2 animate-spin text-[#c5f56b]" />
        Checking your session...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101514] px-5 pb-8 pt-32 text-[#f5f1e8] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-[#2d3934] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#718078]">
                Studio
              </p>
              {savedCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#34423b] bg-[#15201d] px-2.5 py-0.5 text-[11px] font-medium text-[#c5f56b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c5f56b] animate-pulse" />
                  {savedCount} {savedCount === 1 ? "creation" : "creations"}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Content repurposing workspace
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsShortcutsOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-[#34423b] bg-[#15201d] px-3 py-2.5 text-xs font-semibold text-[#d3dbd2] transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
              title="Keyboard shortcuts"
            >
              <Keyboard size={15} />
              <span className="hidden sm:inline">Shortcuts</span>
              <kbd className="hidden md:inline-block rounded border border-[#46544c] bg-[#111816] px-1 text-[10px] text-[#718078]">
                ?
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-[#34423b] bg-[#15201d] px-4 py-2.5 text-xs font-semibold text-[#d3dbd2] transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
            >
              <History size={15} />
              <span>History ({savedCount})</span>
            </button>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-[1.5rem] border border-[#34423b] bg-[#15201d] p-5 shadow-[0_0_0_1px_rgba(197,245,107,0.02)]"
          >
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="source"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#aeb9b0]"
              >
                Source content
              </label>
              <span className={`text-xs ${rawInput.trim().length > 4500 ? "text-red-400" : "text-[#718078]"}`}>
                {rawInput.trim() ? `${rawInput.trim().length} / 5000 chars` : "No content yet"}
              </span>
            </div>

            {/* Quick-start creator templates */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#718078]">
                <Lightbulb size={13} className="text-[#c5f56b]" />
                Starters:
              </span>
              {CREATOR_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="shrink-0 rounded-lg border border-[#34423b] bg-[#111816] px-2.5 py-1 text-xs text-[#aeb9b0] transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
                  title={tpl.desc}
                >
                  {tpl.title}
                </button>
              ))}
            </div>

            <textarea
              id="source"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  if (!isLoading && rawInput.trim()) {
                    handleSubmit(e);
                  }
                }
              }}
              className="mt-3 min-h-[16rem] w-full resize-none rounded-[1rem] border border-[#46544c] bg-[#111816] p-4 text-sm leading-6 text-[#d3dbd2] outline-none placeholder:text-[#718078] focus:border-[#c5f56b] focus:ring-2 focus:ring-[#c5f56b]/30"
              placeholder="Paste a transcript, idea, draft, or press Ctrl+Enter to generate..."
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#718078]">
              <div className="flex items-center gap-2">
                <span>{inputMeta.wordCount} {inputMeta.wordCount === 1 ? "word" : "words"}</span>
                <span>•</span>
                <span>~{inputMeta.readTime} min read</span>
              </div>
              {rawInput && (
                <button
                  type="button"
                  onClick={() => setRawInput("")}
                  className="text-xs text-[#89968d] transition hover:text-red-400"
                >
                  Clear input
                </button>
              )}
            </div>

            <div className="mt-4 rounded-[1rem] border border-[#2d3934] bg-[#111816] p-3">
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
                <span className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>Generate content</span>
                  <kbd className="hidden sm:inline-flex items-center rounded border border-[#101514]/20 bg-[#101514]/10 px-1.5 py-0.5 text-[10px] font-mono font-medium">
                    Ctrl + ↵
                  </kbd>
                </span>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-[#718078]" aria-live="polite">
              {saveStatus === "saving" && "Generating variants with AI..."}
              {saveStatus === "saved" && "✨ Generated & saved to your studio"}
              {saveStatus === "error" && (
                <span className="text-red-400">{errorMessage || "Could not generate content"}</span>
              )}
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
                      Paste your source, choose the tone, or click any starter template to generate multiple formats instantly.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Variant Output Stats Bar */}
                  {variantMeta && (
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#26352d] bg-[#111816] px-4 py-2 text-xs text-[#718078]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#c5f56b]">
                          {variantMeta.countLabel}
                        </span>
                        <span>•</span>
                        <span>{variantMeta.words}</span>
                        <span>•</span>
                        <span>{variantMeta.chars}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#89968d]">
                        <span>⏱️</span>
                        <span>{variantMeta.readTime}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto rounded-[1rem] border border-[#34423b] bg-[#111816] p-5">
                    {activeTab === "twitter" ? (
                      <div className="space-y-4">
                        {(Array.isArray(generatedData.twitterThread)
                          ? generatedData.twitterThread
                          : [generatedData.twitterThread]
                        ).map((tweet, i, arr) => (
                          <div key={i} className="relative flex gap-4 pb-2">
                            {i < arr.length - 1 && (
                              <span className="absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-[#34423b]" />
                            )}
                            <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c5f56b]/50 bg-[#15201d] text-xs font-bold text-[#c5f56b]">
                              {i + 1}
                            </span>
                            <div className="flex-1 rounded-xl border border-[#34423b] bg-[#15201d] p-4 text-sm text-[#d3dbd2]">
                              <p className="whitespace-pre-line leading-6">{tweet}</p>
                              <div className="mt-3 flex items-center justify-between border-t border-[#26322d] pt-2 text-xs text-[#718078]">
                                <span className={tweet.length > 280 ? "text-amber-400 font-medium" : ""}>
                                  {tweet.length} / 280 chars
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyTweet(tweet, i)}
                                  className="flex items-center gap-1.5 rounded-lg border border-[#34423b] bg-[#111816] px-2.5 py-1 text-xs text-[#aeb9b0] transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
                                >
                                  {copiedIndex === i ? (
                                    <>
                                      <Check size={12} className="text-[#c5f56b]" />
                                      <span className="text-[#c5f56b]">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="whitespace-pre-line text-sm leading-7 text-[#d3dbd2]">
                        {getActiveText()}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#41504a] bg-[#15201d] px-4 py-3 text-sm font-semibold transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="text-[#c5f56b]" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy current tab
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadAll}
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#34423b] bg-[#111816] px-4 py-3 text-sm font-semibold text-[#d3dbd2] transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
                      title="Download all variants as a Markdown file"
                    >
                      {downloadSuccess ? (
                        <>
                          <Check size={16} className="text-[#c5f56b]" /> Exported .md
                        </>
                      ) : (
                        <>
                          <Download size={16} /> Export all (.md)
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Keyboard Shortcuts Dialog */}
      {isShortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsShortcutsOpen(false)}
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#34423b] bg-[#111816] p-6 shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between border-b border-[#2d3934] pb-4">
              <div className="flex items-center gap-2.5">
                <Keyboard size={18} className="text-[#c5f56b]" />
                <h3 className="text-base font-semibold text-[#f5f1e8]">Keyboard Shortcuts</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsShortcutsOpen(false)}
                className="rounded-lg p-1 text-[#718078] hover:bg-[#1a2520] hover:text-[#f5f1e8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              {[
                { keys: ["Ctrl", "↵"], desc: "Generate content variants" },
                { keys: ["Ctrl", "Shift", "C"], desc: "Copy current output tab" },
                { keys: ["Esc"], desc: "Close drawer or dialog" },
                { keys: ["?"], desc: "Toggle keyboard shortcuts guide" },
              ].map((shortcut, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-[#26352d] bg-[#15201d] px-3.5 py-2.5"
                >
                  <span className="text-xs text-[#d3dbd2]">{shortcut.desc}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((k, ki) => (
                      <kbd
                        key={ki}
                        className="rounded border border-[#3d4f45] bg-[#101514] px-2 py-0.5 text-[11px] font-mono font-semibold text-[#c5f56b]"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] text-[#718078]">
              On macOS, use <kbd className="font-mono text-[#aeb9b0]">⌘ Command</kbd> in place of Ctrl.
            </p>
          </div>
        </div>
      )}

      {/* History Slide-over Drawer with Search & Filter */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsHistoryOpen(false)}
          />

          <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#34423b] bg-[#111816] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2d3934] pb-4">
              <div className="flex items-center gap-2">
                <History size={18} className="text-[#c5f56b]" />
                <h2 className="text-base font-semibold text-[#f5f1e8]">Saved Creations</h2>
                <span className="rounded-full bg-[#1e2a25] px-2 py-0.5 text-xs text-[#aeb9b0]">
                  {history.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="rounded-lg p-1 text-[#718078] hover:bg-[#1a2520] hover:text-[#f5f1e8]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search input and tone filter */}
            {history.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 border-b border-[#2d3934] pb-4">
                <div className="relative">
                  <Search
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#718078]"
                  />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search past content..."
                    className="w-full rounded-xl border border-[#34423b] bg-[#15201d] py-2 pl-9 pr-8 text-xs text-[#d3dbd2] placeholder:text-[#718078] outline-none focus:border-[#c5f56b]"
                  />
                  {historySearch && (
                    <button
                      type="button"
                      onClick={() => setHistorySearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#718078] hover:text-[#d3dbd2]"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {["All", ...TONES].map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setHistoryToneFilter(tone)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                        historyToneFilter === tone
                          ? "border border-[#c5f56b] bg-[#c5f56b]/10 text-[#c5f56b]"
                          : "border border-[#2d3934] bg-[#15201d] text-[#89968d] hover:border-[#46544c] hover:text-[#d3dbd2]"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                  {(historySearch || historyToneFilter !== "All") && (
                    <span className="ml-auto text-[10px] text-[#718078]">
                      {filteredHistory.length} found
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto py-4">
              {loadingHistory ? (
                <div className="flex h-32 items-center justify-center text-xs text-[#718078]">
                  <Loader2 size={16} className="mr-2 animate-spin text-[#c5f56b]" />
                  Loading your history...
                </div>
              ) : history.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center text-center text-xs text-[#718078]">
                  <FileText size={28} className="mb-2 text-[#46544c]" />
                  <p>No saved creations yet.</p>
                  <p className="mt-1 text-[#89968d]">Generate variants to see them saved here!</p>
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center text-center text-xs text-[#718078]">
                  <Search size={24} className="mb-2 text-[#46544c]" />
                  <p>No matches found for your filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setHistorySearch("");
                      setHistoryToneFilter("All");
                    }}
                    className="mt-2 text-xs text-[#c5f56b] underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredHistory.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleLoadItem(item)}
                      className="group cursor-pointer rounded-xl border border-[#2d3934] bg-[#15201d] p-3.5 transition hover:border-[#c5f56b]/60 hover:bg-[#182622]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-md border border-[#34423b] bg-[#101514] px-2 py-0.5 text-[10px] font-medium text-[#c5f56b]">
                          {item.tone || "Professional"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#718078]">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "Recent"}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteItem(e, item._id)}
                            disabled={deletingId === item._id}
                            className="rounded p-1 text-[#718078] transition hover:bg-red-500/10 hover:text-red-400"
                            title="Delete creation"
                          >
                            {deletingId === item._id ? (
                              <Loader2 size={13} className="animate-spin text-red-400" />
                            ) : (
                              <Trash2 size={13} />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#d3dbd2]">
                        {item.rawInput}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-[#718078] group-hover:text-[#c5f56b]">
                        <span>Click to load into editor</span>
                        <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}