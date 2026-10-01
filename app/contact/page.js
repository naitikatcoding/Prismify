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
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  Zap,
  Clock,
  Globe,
} from "lucide-react";

const CATEGORIES = [
  { id: "General Feedback", label: "General", icon: MessageSquare, color: "#c5f56b" },
  { id: "Feature Request", label: "Feature Idea", icon: Lightbulb, color: "#60d9fa" },
  { id: "Bug Report", label: "Bug Report", icon: Bug, color: "#ff7b7b" },
  { id: "UI/UX Suggestion", label: "UI / UX", icon: Palette, color: "#d4a8ff" },
  { id: "Appreciation", label: "Appreciation", icon: Heart, color: "#ff9f7b" },
];

const QUICK_SUGGESTIONS = [
  "Love the UI aesthetic and speed!",
  "Would love export options for Notion & Markdown.",
  "Suggestion to improve generation quality:",
  "Found an issue while on mobile:",
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
      if (!res.ok) throw new Error(data.error || "Failed to deliver feedback.");
      setSubmitResult(data);
      setSubmitSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
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
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit(e);
  };

  return (
    <div className="prism-page min-h-screen bg-[#0c1210] pt-24 pb-24 text-[#f5f1e8] selection:bg-[#c5f56b]/30 selection:text-[#c5f56b]">
      {/* Ambient grid */}
      <div className="prism-grid" aria-hidden="true" />

      {/* Glow orbs */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#c5f56b]/8 blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-80 w-80 rounded-full bg-[#34433b]/25 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/3 left-0 h-64 w-64 rounded-full bg-[#60d9fa]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Top nav */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-[#2a3830] bg-[#131c19]/70 px-4 py-2 text-xs font-medium text-[#aeb9b0] backdrop-blur transition hover:border-[#c5f56b]/40 hover:text-[#c5f56b]"
          >
            <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Prismify
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#2a3830] bg-[#131c19]/70 px-4 py-2 text-xs text-[#aeb9b0] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5f56b] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5f56b]" />
            </span>
            Developer inbox active
          </div>
        </div>

        {/* Hero */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5f56b]/25 bg-[#c5f56b]/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#c5f56b] mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Direct channel to the creator
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-[#f5f1e8]">Share your </span>
            <span
              style={{
                background: "linear-gradient(135deg, #c5f56b 0%, #8de84a 50%, #60d9fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              thoughts
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#8a9990] sm:text-lg leading-relaxed">
            Ideas, bugs, kudos — whatever&apos;s on your mind, it lands straight
            in my inbox. Every message shapes what Prismify becomes.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

          {/* Feedback window */}
          <div className="prism-window overflow-hidden rounded-3xl border border-[#2a3830] bg-[#111918]/90 shadow-2xl shadow-black/50 backdrop-blur-xl">

            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-[#1e2e28] bg-[#151f1c]/90 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]/40" />
                <div className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1fa033]/40" />
                <span className="ml-3 font-mono text-[11px] text-[#516059]">
                  prismify://feedback
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#516059]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#c5f56b]" />
                <span className="hidden sm:inline text-[#718078]">To:</span>
                <span className="font-mono text-[#c5f56b] max-w-[160px] truncate sm:max-w-none">
                  {developerEmail}
                </span>
              </div>
            </div>

            {/* Window body */}
            <div className="p-6 sm:p-8">
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#c5f56b]/30 bg-gradient-to-br from-[#c5f56b]/20 to-[#8de84a]/10 text-[#c5f56b] shadow-xl shadow-[#c5f56b]/10">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#f5f1e8]">
                    {submitResult?.emailDelivered ? "Delivered!" : "Feedback Recorded!"}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-[#8a9990] leading-relaxed">
                    {submitResult?.emailDelivered
                      ? `Your feedback was routed straight to ${developerEmail}. Thank you — I read every one.`
                      : "Your message has been saved in the database."}
                  </p>

                  {submitResult?.needsActivation && (
                    <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/8 p-4 text-left max-w-md w-full">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-200/80 leading-relaxed">
                          <span className="font-semibold text-amber-300 block mb-1">One-Time Activation Required</span>
                          Check <span className="font-mono font-semibold text-white">{developerEmail}</span> for an activation email and click &quot;Activate Form&quot; once.
                        </div>
                      </div>
                    </div>
                  )}

                  {submitResult?.gmailUrl && (
                    <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-[#2a3830] bg-[#151f1c]/80 p-5 max-w-md w-full">
                      <span className="text-xs text-[#8a9990]">
                        {submitResult?.emailDelivered ? "Want to follow up?" : "Send a direct copy:"}
                      </span>
                      <div className="flex flex-wrap gap-2.5 w-full">
                        <a
                          href={submitResult.gmailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#c5f56b] px-4 py-2.5 text-xs font-bold text-[#0c1210] transition hover:bg-[#b5e759] shadow-md shadow-[#c5f56b]/20"
                        >
                          <Mail className="h-4 w-4" />
                          Open in Gmail
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        {submitResult.mailtoUrl && (
                          <a
                            href={submitResult.mailtoUrl}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#2a3830] bg-[#151f1c] px-4 py-2.5 text-xs font-medium text-[#aeb9b0] transition hover:border-[#c5f56b]/40 hover:text-[#f5f1e8]"
                          >
                            Mail App
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="rounded-xl border border-[#2a3830] bg-[#151f1c] px-6 py-2.5 text-sm font-medium text-[#f5f1e8] transition hover:border-[#c5f56b]/40 hover:bg-[#1c2922]"
                    >
                      Send Another
                    </button>
                    <Link
                      href="/workspace"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#c5f56b] px-6 py-2.5 text-sm font-bold text-[#0c1210] shadow-md shadow-[#c5f56b]/20 transition hover:bg-[#b5e759]"
                    >
                      Return to Studio
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">

                  {/* Category pills */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#516059] mb-3">
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
                            style={isSelected ? { borderColor: `${cat.color}60`, boxShadow: `0 0 12px ${cat.color}15` } : {}}
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border bg-[#1c2a23] text-[#f5f1e8]"
                                : "border border-[#1e2e28] bg-[#151f1c] text-[#718078] hover:border-[#2d3f36] hover:text-[#c5f1e8]"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" style={isSelected ? { color: cat.color } : {}} />
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fb-name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#516059] mb-2">
                        Your Name
                      </label>
                      <input
                        id="fb-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full rounded-xl border border-[#1e2e28] bg-[#0f1814]/80 px-4 py-2.5 text-sm text-[#f5f1e8] placeholder-[#3d5045] outline-none transition-all duration-200 focus:border-[#c5f56b]/60 focus:bg-[#131c19] focus:ring-1 focus:ring-[#c5f56b]/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="fb-email" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#516059] mb-2">
                        Email (so I can reply)
                      </label>
                      <input
                        id="fb-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full rounded-xl border border-[#1e2e28] bg-[#0f1814]/80 px-4 py-2.5 text-sm text-[#f5f1e8] placeholder-[#3d5045] outline-none transition-all duration-200 focus:border-[#c5f56b]/60 focus:bg-[#131c19] focus:ring-1 focus:ring-[#c5f56b]/30"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="fb-subject" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#516059] mb-2">
                      Subject
                    </label>
                    <input
                      id="fb-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={`e.g. Idea for ${category}`}
                      className="w-full rounded-xl border border-[#1e2e28] bg-[#0f1814]/80 px-4 py-2.5 text-sm text-[#f5f1e8] placeholder-[#3d5045] outline-none transition-all duration-200 focus:border-[#c5f56b]/60 focus:bg-[#131c19] focus:ring-1 focus:ring-[#c5f56b]/30"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#516059]">
                        Experience Rating
                      </label>
                      <span className="text-xs font-mono text-[#c5f56b]">
                        {hoveredRating || rating} / 5
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= (hoveredRating || rating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-1.5 rounded-lg transition-transform duration-100 hover:scale-110 focus:outline-none"
                            aria-label={`Rate ${star} star`}
                          >
                            <Star
                              className={`h-6 w-6 transition-all duration-150 ${
                                active
                                  ? "fill-[#c5f56b] text-[#c5f56b]"
                                  : "text-[#2a3830]"
                              }`}
                              style={active ? { filter: "drop-shadow(0 0 6px #c5f56b80)" } : {}}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick suggestions */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#516059] mb-2.5 block">
                      Quick starters
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_SUGGESTIONS.map((sug, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setMessage((prev) => prev ? `${prev}\n${sug}` : sug)}
                          className="rounded-lg border border-[#1e2e28] bg-[#0f1814] px-3 py-1.5 text-[11px] text-[#718078] transition hover:border-[#c5f56b]/30 hover:bg-[#131c19] hover:text-[#c5f56b]"
                        >
                          + {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label htmlFor="fb-message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#516059]">
                        Your Message *
                      </label>
                      <span className="text-[11px] font-mono text-[#516059]">
                        {message.length} chars
                      </span>
                    </div>
                    <div className="relative rounded-2xl border border-[#1e2e28] bg-[#0f1814]/80 transition-all duration-200 focus-within:border-[#c5f56b]/50 focus-within:bg-[#111918] focus-within:ring-1 focus-within:ring-[#c5f56b]/20">
                      <textarea
                        id="fb-message"
                        rows={6}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What do you like? What could be better? Any features you'd love to see?"
                        className="w-full resize-y rounded-2xl bg-transparent px-4 py-4 text-sm text-[#e8f0e5] placeholder-[#3d5045] outline-none font-sans leading-relaxed"
                      />
                    </div>
                    <p className="mt-2 flex items-center justify-between text-[11px] text-[#3d5045]">
                      <span>
                        <kbd className="rounded border border-[#1e2e28] bg-[#131c19] px-1.5 py-0.5 font-mono text-[10px] text-[#718078]">Ctrl</kbd>
                        {" + "}
                        <kbd className="rounded border border-[#1e2e28] bg-[#131c19] px-1.5 py-0.5 font-mono text-[10px] text-[#718078]">Enter</kbd>
                        {" to send"}
                      </span>
                      <span>→ {developerEmail}</span>
                    </p>
                  </div>

                  {/* Error */}
                  {errorMessage && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-red-500/25 bg-red-500/8 p-3.5 text-xs text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                    <div className="flex items-center gap-2 text-xs text-[#3d5045]">
                      <ShieldCheck className="h-4 w-4 text-[#c5f56b]/70" />
                      <span>Never shared with third parties</span>
                    </div>
                    <button
                      type="submit"
                      id="fb-submit"
                      disabled={isSubmitting || !message.trim()}
                      className="group relative overflow-hidden cursor-pointer flex items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold text-[#0c1210] transition-all duration-200 hover:shadow-xl active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #c5f56b 0%, #8de84a 100%)",
                        boxShadow: "0 4px 24px rgba(197,245,107,0.25)",
                      }}
                    >
                      <span className="absolute inset-0 bg-white/0 transition-all group-hover:bg-white/10 rounded-xl" />
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0c1210] border-t-transparent" />
                          <span>Transmitting…</span>
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

          {/* Sidebar */}
          <div className="flex flex-col gap-5">

            {/* Direct email card */}
            <div className="rounded-3xl border border-[#1e2e28] bg-[#111918]/90 p-6 shadow-xl backdrop-blur transition hover:border-[#2a3f35]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c5f56b]/20 bg-gradient-to-br from-[#c5f56b]/15 to-[#8de84a]/8 text-[#c5f56b]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#f5f1e8]">Direct Email</h3>
                  <p className="text-[11px] text-[#516059]">Developer&apos;s personal inbox</p>
                </div>
              </div>
              <div className="rounded-xl border border-[#1e2e28] bg-[#0c1210] px-4 py-3 text-xs">
                <p className="font-mono text-[#c5f56b] break-all">{developerEmail}</p>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#1e2e28] bg-[#151f1c] py-2.5 text-xs font-medium text-[#aeb9b0] transition hover:border-[#c5f56b]/40 hover:bg-[#1c2922] hover:text-[#c5f56b] cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#c5f56b]" />
                      <span className="text-[#c5f56b]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${developerEmail}?subject=${encodeURIComponent("Prismify Feedback")}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#1e2e28] bg-[#151f1c] px-4 py-2.5 text-xs font-medium text-[#aeb9b0] transition hover:border-[#c5f56b]/40 hover:bg-[#1c2922] hover:text-[#f5f1e8]"
                  title="Open mail app"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Mail App
                </a>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, label: "Response", value: "24–48h", color: "#c5f56b" },
                { icon: Zap, label: "Direct", value: "Inbox", color: "#60d9fa" },
                { icon: Globe, label: "Built", value: "Next.js", color: "#d4a8ff" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#1e2e28] bg-[#111918]/90 p-4 text-center backdrop-blur"
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                  <span className="text-[10px] text-[#516059] uppercase tracking-wide">{label}</span>
                  <span className="text-xs font-semibold text-[#f5f1e8]">{value}</span>
                </div>
              ))}
            </div>

            {/* About card */}
            <div className="rounded-3xl border border-[#1e2e28] bg-[#111918]/90 p-6 shadow-xl backdrop-blur">
              <h3 className="text-sm font-semibold text-[#f5f1e8] mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#c5f56b]" />
                About Prismify
              </h3>
              <p className="text-xs text-[#718078] leading-relaxed">
                Continuously built and improved. Every bug report, idea, and kind word is read and
                evaluated to craft a better content engine for everyone.
              </p>
            </div>

            {/* Social connects */}
            <div className="rounded-3xl border border-[#1e2e28] bg-[#111918]/90 p-6 shadow-xl backdrop-blur">
              <h3 className="text-sm font-semibold text-[#f5f1e8] mb-4">Connect Directly</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/naitik-gupta-509b6a37a" },
                  { label: "X / Twitter", href: "https://x.com/NGupta20845" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-[#1e2e28] bg-[#0f1814] px-4 py-3 text-xs text-[#718078] transition hover:border-[#c5f56b]/30 hover:bg-[#131c19] hover:text-[#c5f56b]"
                  >
                    {label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
