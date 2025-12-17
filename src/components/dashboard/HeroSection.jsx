import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 md:h-screen py-20">
      {/* Gradient blobs */}
      {/* <div
        aria-hidden
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 opacity-30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-500 via-purple-600 to-blue-600 opacity-30 blur-3xl"
      /> */}

      {/* Content */}
      <div className="relative mx-auto max-w-7xl md:px-6 md:py-24 text-center">
        {/* Headline */}
        <h1 className="mx-auto max-w-3xl lg:text-5xl md:text-4xl sm:text-3xl text-xl font-semibold tracking-tight text-slate-900">
          Know the risks in your contract —
          <span className="block text-blue-600 md:mt-2">before you sign.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mt-6 max-w-2xl sm:text-lg text-sm leading-relaxed text-slate-500">
          Upload a contract and get clear, plain-English risk highlights for
          payment, IP, and scope in under a minute.
        </p>

        {/* Trust line
        <p className="mt-4 text-sm text-slate-400 font-semibold">
          Built for freelancers and small agencies • Private & secure
        </p> */}

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/tryFree" className="btn-primary btn3 cursor-pointer ">
              Try free analysis
          </Link>

          <Link
            href="/sample-report"
            className="btn3 btn-secondary"
          >
            View sample report
          </Link>
        </div>
      </div>
    </section>
  );
}
