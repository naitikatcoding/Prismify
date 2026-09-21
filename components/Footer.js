import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";

const Footer = () => {
  return (
    <footer className="border-t border-[#2d3934] bg-[#101514] text-[#f5f1e8]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-10 border-b border-[#2d3934] pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt=""
                width={40}
                height={40}
                unoptimized
                className="rounded-xl ring-1 ring-white/15"
              />
              <span className="text-2xl font-black tracking-[-0.05em]">
                Prismify
              </span>
            </div>
            <h2 className="mt-7 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              Make the good idea impossible to ignore.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#89968d]">
              Turn rough thoughts into polished content that sounds like you,
              wherever your audience is reading.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-[#c5f56b] px-5 py-3.5 text-sm font-bold text-[#101514] transition hover:bg-white"
          >
            Start creating
            <span aria-hidden="true" className="text-lg leading-none">
              -&gt;
            </span>
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="max-w-[14rem] text-sm leading-6 text-[#718078]">
              One idea. More ways to share it. Less time staring at a blank
              page.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
              Explore
            </p>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#aeb9b0]">
              <Link className="transition hover:text-[#c5f56b]" href="/">
                Home
              </Link>
              <Link className="transition hover:text-[#c5f56b]" href="/#how-it-works">
                How it works
              </Link>
              <Link className="transition hover:text-[#c5f56b]" href="/workspace">
                Studio
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
              Create
            </p>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#aeb9b0]">
              <Link className="transition hover:text-[#c5f56b]" href="/login">
                Get started
              </Link>
              <a className="transition hover:text-[#c5f56b]" href="mailto:hello@prismify.app">
                Contact us
              </a>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5f56b]">
              Follow along
            </p>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#aeb9b0]">
              <a className="transition hover:text-[#c5f56b]" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="transition hover:text-[#c5f56b]" href="https://x.com" target="_blank" rel="noreferrer">
                X / Twitter
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#2d3934] pt-5 text-xs text-[#718078] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Prismify. Made for ideas in progress.</p>
          <div className="flex gap-5">
            <Link className="transition hover:text-[#c5f56b]" href="/">
              Privacy
            </Link>
            <Link className="transition hover:text-[#c5f56b]" href="/">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
