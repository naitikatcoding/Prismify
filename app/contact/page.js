"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Star,
  MessageSquare,
  Bug,
  Lightbulb,
  Heart,
  Palette,
  ArrowRight,
  ShieldCheck,
  CornerDownLeft,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const CATEGORIES = [
  { id: "General Feedback", label: "General Feedback", icon: MessageSquare },
  { id: "Feature Request", label: "Feature Idea", icon: Lightbulb },
  { id: "Bug Report", label: "Bug Report", icon: Bug },
  { id: "UI/UX Suggestion", label: "UI / UX Design", icon: Palette },
  { id: "Appreciation", label: "Appreciation", icon: Heart },
];

const QUICK_SUGGESTIONS = [
  "Love the UI aesthetic and speed!",
  "Would love to see export options for Notion & Markdown.",
  "Here is a suggestion to improve the generation quality:",
  "Found an issue while navigating on mobile:",
];

export default function ContactPage() {
  const [session, setSession] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("General Feedback");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const developerEmail = "naitikgupta2713@gmail.com";

  useEffect(() => {
    getSession().then((sess) => {
      if (sess?.user) {
        setSession(sess);
        if (sess.user.name) setName(sess.user.name);
        if (sess.user.email) setEmail(sess.user.email);
      }
    });
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(developerEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) {
      setErrorMessage("Please type your feedback before sending.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || (session?.user?.name ?? "Anonymous"),
          email: email.trim() || (session?.user?.email ?? ""),
          subject: subject.trim() || `${category} on Prismify`,
          category,
          rating,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver feedback.");
      }

      setSubmitResult(data);
      setSubmitSuccess(true);
    } catch (err) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setMessage("");
    setSubject("");
    setRating(5);
    setSubmitSuccess(false);
    setSubmitResult(null);
    setErrorMessage("");
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="prism-page min-h-screen bg-[#101514] pt-28 pb-20 text-[#f5f1e8] selection:bg-[#c5f56b]/30 selection:text-[#c5f56b]">
      {/* Background ambient grid */}
      <div className="prism-grid" aria-hidden="true" />

      {/* Background glow orbs */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[#c5f56b]/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-96 right-10 h-72 w-72 rounded-full bg-[#34433b]/30 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Status header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#aeb9b0]">
            <Link href="/" className="transition hover:text-[#c5f56b]">
              Prismify
            </Link>
            <span className="text-[#34433b]">/</span>
            <span className="text-[#c5f56b]">Contact & Feedback</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#2d3934] bg-[#131c19]/80 px-3 py-1 text-xs text-[#aeb9b0] shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5f56b] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5f56b]"></span>
            </span>
            <span>Developer inbox active & ready</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#34433b] bg-[#18221e]/60 px-3.5 py-1 text-xs font-medium text-[#c5f56b] backdrop-blur mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Direct Channel to the Creator</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#f5f1e8] sm:text-4xl lg:text-5xl font-sans">
            Share Your Thoughts with Me
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#aeb9b0] sm:text-lg">
            Have an idea for a feature, spotted a quirk, or just want to tell me how Prismify is working for you?
            Type your message into the window below and it will be delivered straight to my mail inbox.
          </p>
        </div>

        {/* Main Grid: Feedback Window + Contact Info Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Feedback Window (8 cols) */}
          <div className="lg:col-span-8">
            <div className="prism-window overflow-hidden rounded-3xl border border-[#2d3934] bg-[#131c19]/95 shadow-2xl shadow-black/40 backdrop-blur-xl transition">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-[#2d3934] bg-[#18221e]/80 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/50" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]/50" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1fa033]/50" />
                  <span className="ml-2 font-mono text-xs text-[#aeb9b0]">
                    prismify://feedback-terminal
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#718078]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#c5f56b]" />
                  <span className="hidden sm:inline">Delivered to:</span>
                  <span className="text-[#c5f56b] font-mono text-[11px] truncate max-w-[170px] sm:max-w-none">
                    {developerEmail}
                  </span>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-6 sm:p-8">
                {submitSuccess ? (
                  /* Success State inside Window */
                  <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-300">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c5f56b]/30 bg-[#c5f56b]/15 text-[#c5f56b] shadow-lg shadow-[#c5f56b]/10">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#f5f1e8]">
                      Thank You! Feedback Dispatched
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-[#aeb9b0]">
                      {submitResult?.deliveredVia === "smtp"
                        ? "Your feedback was sent directly to my personal email inbox. I read every single note!"
                        : "Your feedback has been successfully recorded in the database and prepared for direct mail!"}
                    </p>

                    {/* Fallback / Direct mailto action */}
                    {submitResult?.mailtoUrl && (
                      <div className="mt-6 flex flex-col items-center gap-2.5 rounded-2xl border border-[#2d3934] bg-[#18221e]/70 p-4 max-w-md w-full">
                        <span className="text-xs text-[#aeb9b0]">
                          Want to open this directly in your local mail client or Gmail?
                        </span>
                        <a
                          href={submitResult.mailtoUrl}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#263a2f] px-4 py-2 text-xs font-semibold text-[#c5f56b] transition hover:bg-[#324a3d] border border-[#c5f56b]/30"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Open in Mail Client / Gmail</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="rounded-xl border border-[#34433b] bg-[#18221e] px-5 py-2.5 text-sm font-medium text-[#f5f1e8] transition hover:border-[#c5f56b]/50 hover:bg-[#202e29]"
                      >
                        Send Another Note
                      </button>
                      <Link
                        href="/workspace"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#c5f56b] px-5 py-2.5 text-sm font-bold text-[#101514] shadow-md shadow-[#c5f56b]/20 transition hover:bg-[#b5e759]"
                      >
                        <span>Return to Studio</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Form View inside Window */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category Selector Pills */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#aeb9b0] mb-2.5">
                        Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => {
                          const Icon = cat.icon;
                          const isSelected = category === cat.id;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setCategory(cat.id)}
                              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition cursor-pointer ${
                                isSelected
                                  ? "border border-[#c5f56b] bg-[#263a2f] text-[#c5f56b] shadow-sm shadow-[#c5f56b]/10"
                                  : "border border-[#2d3934] bg-[#18221e]/70 text-[#aeb9b0] hover:border-[#3d4f45] hover:text-[#f5f1e8]"
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              <span>{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sender details: Name & Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#aeb9b0] mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Rivera"
                          className="w-full rounded-xl border border-[#2d3934] bg-[#18221e]/80 px-4 py-2.5 text-sm text-[#f5f1e8] placeholder-[#718078] outline-none transition focus:border-[#c5f56b] focus:ring-1 focus:ring-[#c5f56b]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#aeb9b0] mb-1.5">
                          Your Email (so I can reply)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className="w-full rounded-xl border border-[#2d3934] bg-[#18221e]/80 px-4 py-2.5 text-sm text-[#f5f1e8] placeholder-[#718078] outline-none transition focus:border-[#c5f56b] focus:ring-1 focus:ring-[#c5f56b]"
                        />
                      </div>
                    </div>

                    {/* Subject line */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#aeb9b0] mb-1.5">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={`e.g. Idea for ${category}`}
                        className="w-full rounded-xl border border-[#2d3934] bg-[#18221e]/80 px-4 py-2.5 text-sm text-[#f5f1e8] placeholder-[#718078] outline-none transition focus:border-[#c5f56b] focus:ring-1 focus:ring-[#c5f56b]"
                      />
                    </div>

                    {/* Rating row */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#aeb9b0]">
                          Experience Rating
                        </label>
                        <span className="text-xs text-[#c5f56b] font-mono">
                          {hoveredRating || rating} / 5 stars
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = star <= (hoveredRating || rating);
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="p-1 rounded-lg transition hover:scale-110 focus:outline-none"
                              aria-label={`Rate ${star} star`}
                            >
                              <Star
                                className={`h-5 w-5 transition ${
                                  active
                                    ? "fill-[#c5f56b] text-[#c5f56b]"
                                    : "text-[#34433b]"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick suggestion pills */}
                    <div>
                      <span className="text-xs text-[#718078] mb-1.5 block">
                        Quick prompt ideas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_SUGGESTIONS.map((sug, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setMessage((prev) =>
                                prev ? `${prev}\n${sug}` : sug
                              );
                            }}
                            className="rounded-lg border border-[#26352e] bg-[#141d19] px-2.5 py-1 text-[11px] text-[#aeb9b0] transition hover:border-[#c5f56b]/40 hover:text-[#c5f56b]"
                          >
                            + {sug}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* The Feedback Window (Typeable area) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#aeb9b0]">
                          Your Message / Feedback *
                        </label>
                        <span className="text-xs text-[#718078] font-mono">
                          {message.length} chars
                        </span>
                      </div>
                      <div className="relative rounded-2xl border border-[#2d3934] bg-[#141e1a] p-1 transition focus-within:border-[#c5f56b] focus-within:ring-1 focus-within:ring-[#c5f56b]">
                        <textarea
                          rows={6}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your feedback here... What do you like? What could be better? Any features you'd love to see next?"
                          className="w-full resize-y rounded-xl bg-transparent p-3.5 text-sm text-[#f5f1e8] placeholder-[#718078] outline-none font-sans leading-relaxed"
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] text-[#718078] flex items-center justify-between">
                        <span>Tip: Press <kbd className="rounded border border-[#34433b] bg-[#18221e] px-1 py-0.5 font-mono text-[10px] text-[#aeb9b0]">Ctrl/Cmd</kbd> + <kbd className="rounded border border-[#34433b] bg-[#18221e] px-1 py-0.5 font-mono text-[10px] text-[#aeb9b0]">Enter</kbd> to send</span>
                        <span>Delivered directly to {developerEmail}</span>
                      </p>
                    </div>

                    {/* Error message */}
                    {errorMessage && (
                      <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Actions bar */}
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#718078]">
                        <ShieldCheck className="h-4 w-4 text-[#c5f56b]" />
                        <span>Your feedback is never shared with third parties</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !message.trim()}
                        className="cursor-pointer group flex items-center justify-center gap-2.5 rounded-xl bg-[#c5f56b] px-7 py-3 text-sm font-bold text-[#101514] shadow-lg shadow-[#c5f56b]/20 transition-all hover:bg-[#b5e759] hover:shadow-xl hover:shadow-[#c5f56b]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#101514] border-t-transparent" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Feedback</span>
                            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Creator Info (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            {/* Direct Email Card */}
            <div className="rounded-3xl border border-[#2d3934] bg-[#131c19]/90 p-6 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#263a2f] text-[#c5f56b] border border-[#c5f56b]/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#f5f1e8]">
                    Direct Email
                  </h3>
                  <p className="text-xs text-[#aeb9b0]">Developer&apos;s personal mailbox</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#2d3934] bg-[#18221e] p-3 text-xs">
                <p className="font-mono text-[#c5f56b] break-all">{developerEmail}</p>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#34433b] bg-[#18221e] py-2 text-xs font-medium text-[#f5f1e8] transition hover:border-[#c5f56b]/50 hover:bg-[#212d27]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#c5f56b]" />
                      <span className="text-[#c5f56b]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${developerEmail}?subject=${encodeURIComponent(
                    "Prismify Website Inquiry"
                  )}`}
                  className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#34433b] bg-[#18221e] px-3.5 py-2 text-xs font-medium text-[#f5f1e8] transition hover:border-[#c5f56b]/50 hover:bg-[#212d27]"
                  title="Open mail application"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Mail App</span>
                </a>
              </div>
            </div>

            {/* Response Time & Developer Note Card */}
            <div className="rounded-3xl border border-[#2d3934] bg-[#131c19]/90 p-6 shadow-xl backdrop-blur">
              <h3 className="text-sm font-semibold text-[#f5f1e8] mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#c5f56b]" />
                <span>About this project</span>
              </h3>
              <p className="text-xs text-[#aeb9b0] leading-relaxed">
                Prismify is continuously being built and improved. Every piece of
                feedback, bug report, or feature concept is evaluated to craft a
                better creation engine for everyone.
              </p>

              <div className="mt-4 pt-4 border-t border-[#2d3934] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#aeb9b0]">
                  <span>Response time:</span>
                  <span className="text-[#c5f56b] font-medium">Within 24-48 hours</span>
                </div>
                <div className="flex items-center justify-between text-[#aeb9b0]">
                  <span>Built with:</span>
                  <span className="text-[#f5f1e8]">Next.js & AI</span>
                </div>
              </div>
            </div>

            {/* Social Connects */}
            <div className="rounded-3xl border border-[#2d3934] bg-[#131c19]/90 p-6 shadow-xl backdrop-blur">
              <h3 className="text-sm font-semibold text-[#f5f1e8] mb-3">
                Connect Directly
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.linkedin.com/in/naitik-gupta-509b6a37a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#2d3934] bg-[#18221e] px-4 py-2.5 text-xs text-[#aeb9b0] transition hover:border-[#c5f56b]/50 hover:text-[#c5f56b]"
                >
                  <span>LinkedIn</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://x.com/NGupta20845"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#2d3934] bg-[#18221e] px-4 py-2.5 text-xs text-[#aeb9b0] transition hover:border-[#c5f56b]/50 hover:text-[#c5f56b]"
                >
                  <span>X / Twitter</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
