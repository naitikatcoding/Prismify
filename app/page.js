export default function Home() {
  return (
    <div id="top" className="prism-page min-h-screen overflow-hidden bg-[#101514] text-[#f5f1e8]">
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
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c5f56b] px-6 py-3.5 text-sm font-bold text-[#101514] transition hover:bg-white"
              >
                Start creating
                <span aria-hidden="true" className="text-lg leading-none">
                  -&gt;
                </span>
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
            className="prism-window relative mx-auto w-full max-w-2xl rounded-[1.75rem] border border-[#405047] bg-[#18211e] p-3 shadow-2xl shadow-black/30"
          >
            <div className="rounded-[1.25rem] border border-[#34423b] bg-[#111816] p-5 sm:p-7">
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

              <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-xl border border-[#34423b] bg-[#1b2621] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#aeb9b0]">
                      Your idea
                    </span>
                    <span className="text-xs text-[#718078]">2,048 chars</span>
                  </div>
                  <p className="text-sm leading-6 text-[#d3dbd2]">
                    Building in public taught me that consistency beats perfect
                    timing. Here&apos;s what changed when I started sharing the
                    process...
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-md bg-[#293a30] px-2.5 py-1.5 text-xs text-[#c5f56b]">
                      Professional
                    </span>
                    <span className="rounded-md border border-[#46544c] px-2.5 py-1.5 text-xs text-[#aeb9b0]">
                      Add a tone +
                    </span>
                  </div>
                  <button className="mt-7 w-full rounded-lg bg-[#c5f56b] px-4 py-3 text-sm font-bold text-[#101514] transition hover:bg-white">
                    Generate content
                  </button>
                </div>

                <div className="rounded-xl border border-[#34423b] bg-[#f5f1e8] p-4 text-[#17211d]">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-4 text-xs font-bold">
                      <span className="border-b-2 border-[#17211d] pb-2">
                        LinkedIn
                      </span>
                      <span className="text-[#859089]">X thread</span>
                      <span className="hidden text-[#859089] sm:inline">
                        Newsletter
                      </span>
                    </div>
                    <span className="text-xs text-[#859089]">Copy</span>
                  </div>
                  <p className="text-sm font-semibold leading-6">
                    The most useful creative habit isn&apos;t inspiration.
                    It&apos;s showing up before you feel ready.
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#52605a]">
                    When I began sharing my work, I thought every post needed a
                    perfect conclusion. Then I learned that progress is the
                    story...
                  </p>
                  <div className="mt-7 flex items-center justify-between border-t border-[#d5d1c8] pt-4 text-xs text-[#859089]">
                    <span>Ready to publish</span>
                    <span className="font-semibold text-[#52605a]">
                      146 words
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
              Set the tone, audience, and energy. Prismify handles the rewriting
              work.
            </p>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold text-[#c5f56b]">03</p>
            <h2 className="text-xl font-semibold">Publish everywhere.</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#89968d]">
              Get a social thread, LinkedIn post, and newsletter ready to review
              and share.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
