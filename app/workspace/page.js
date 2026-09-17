import Link from "next/link";

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-[#101514] px-5 py-8 text-[#f5f1e8] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between border-b border-[#2d3934] pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718078]">
              Prismify workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Create something remarkable.
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-full border border-[#41504a] px-4 py-2 text-sm font-semibold transition hover:border-[#c5f56b] hover:text-[#c5f56b]"
          >
            Back home
          </Link>
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-[#34423b] bg-[#1b2621] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aeb9b0]">
              Your idea
            </p>
            <textarea
              className="mt-5 min-h-64 w-full resize-none rounded-xl border border-[#46544c] bg-[#111816] p-4 text-sm leading-6 text-[#d3dbd2] outline-none placeholder:text-[#718078] focus:border-[#c5f56b]"
              placeholder="Paste your transcript, rough idea, or brain dump here..."
            />
            <button
              type="button"
              className="mt-5 w-full rounded-lg bg-[#c5f56b] px-4 py-3 text-sm font-bold text-[#101514] transition hover:bg-white"
            >
              Generate content
            </button>
          </div>

          <div className="flex min-h-96 items-center justify-center rounded-2xl border border-dashed border-[#405047] bg-[#18211e] p-6 text-center">
            <div>
              <p className="text-lg font-semibold">Your generated content will appear here.</p>
              <p className="mt-2 text-sm text-[#89968d]">
                Choose a tone and generate your first post.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}