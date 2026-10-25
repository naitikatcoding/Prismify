"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How does Prismify keep my content authentic?",
    answer:
      "Prismify analyzes the underlying insight, vocabulary, and natural cadence of your raw input rather than injecting generic corporate jargon. You can also switch between Professional, Conversational, and Bold tones to match your exact voice.",
  },
  {
    question: "What formats can I generate from a single idea?",
    answer:
      "From a single voice note transcript or rough bullet draft, Prismify generates a structured X (Twitter) thread with numbered hooks, a high-engagement LinkedIn thought leadership post, and a ready-to-send newsletter email with a catchy subject line.",
  },
  {
    question: "Is my content stored privately and securely?",
    answer:
      "Yes. Your notes, drafts, and generated variants are securely linked to your account and saved in your private studio. We never share your drafts or use your private ideas to train public AI models.",
  },
  {
    question: "Can I export or download my generated content?",
    answer:
      "Yes! You can copy individual tweets (with built-in 280-char counters), copy any platform tab with one click, or export all variants together as a formatted Markdown (.md) file for Notion, Obsidian, or your CMS.",
  },
  {
    question: "What is the maximum input length?",
    answer:
      "You can enter up to 5,000 characters per generation. That provides plenty of capacity for full podcast transcripts, lengthy voice memos, outline dumps, or article drafts.",
  },
  {
    question: "Is Prismify free to get started?",
    answer:
      "Yes, Prismify is completely free to start. Simply sign in with Google or GitHub to access the studio—no credit card or complicated setup required.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      className="scroll-mt-12 mt-24 lg:mt-32 border-t border-[#2d3934] pt-16"
      aria-labelledby="faq-heading"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5f56b]/30 bg-[#16241c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
            <HelpCircle size={14} />
            <span>Common Questions</span>
          </div>
          <h2
            id="faq-heading"
            className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#f5f1e8] sm:text-4xl lg:text-5xl"
          >
            Everything you need to know{" "}
            <span className="text-[#c5f56b]">about Prismify.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-[#89968d]">
          Got questions on how repurposing works, content privacy, or export options? Here are the quick answers.
        </p>
      </div>

      <div className="mt-12 space-y-4 max-w-4xl mx-auto">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? "border-[#c5f56b]/50 bg-[#16201d] shadow-[0_0_20px_rgba(197,245,107,0.05)]"
                  : "border-[#2d3934] bg-[#121917] hover:border-[#3d5045]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
              >
                <span className="text-base sm:text-lg font-medium text-[#f5f1e8]">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#c5f56b] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-[#243029] px-5 pb-5 pt-3 sm:px-6 sm:pb-6 text-sm leading-7 text-[#aeb9b0]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom FAQ Help Box */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#26352d] bg-[#131c19] px-6 py-5 sm:flex-row max-w-4xl mx-auto">
        <div>
          <p className="text-sm font-semibold text-[#f5f1e8]">
            Have a different question or feedback?
          </p>
          <p className="text-xs text-[#718078] mt-0.5">
            We are actively improving Prismify based on creator suggestions.
          </p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 rounded-full border border-[#41504a] bg-[#18231f] px-5 py-2.5 text-xs font-semibold text-[#c5f56b] transition hover:border-[#c5f56b] hover:bg-[#1f2e28]"
        >
          <span>Contact our team</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
