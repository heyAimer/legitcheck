'use client'
import GradientRing from "@/utils/GradientRings";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuthContext } from "@/utils/providers/AuthProvider";

const scrollToSection = (id) => {
  const section = document.getElementById(id)

  if (section) {
      section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      })
  } else {
      window.location.href = `/#${id}`
  }
}

export default function HeroSection() {

  const { data } = useAuthContext();

  const userLoggedIn = data?.data?.authenticated === true;

  return (
    <section className="relative overflow-hidden px-6 py-20" id="hero">

      <GradientRing
        className="
          -left-30 md:top-4 -top-20
          h-[420px] w-[420px]
          bg-[radial-gradient(circle_at_center,#60a5fa,transparent_70%)]
        "
      />

      <GradientRing
        className="
          -right-30 md:bottom-4 bottom-6
          h-[380px] w-[380px]
          bg-[radial-gradient(circle_at_center,#a78bfa,transparent_70%)]
        "
      />

      <div className="relative mx-auto max-w-7xl md:px-6 md:py-30 text-center" id="/hero">
        {/* Headline */}
        <h1 className="mx-auto max-w-3xl lg:text-5xl md:text-4xl sm:text-3xl text-xl font-semibold tracking-tight text-slate-900">
          Don’t sign a contract you only
          <span className="block text-blue-600 md:mt-2">half understand.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mt-6 max-w-2xl sm:text-lg text-sm leading-relaxed text-slate-500">
          Upload your contract and get plain-English red flags for payment delays, ownership, scope creep, revisions, and cancellation — in under a minute.
        </p>

        {/* Trust line
        <p className="mt-4 text-sm text-slate-400 font-semibold">
          Built for freelancers and small agencies • Private & secure
        </p> */}

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={userLoggedIn ? "/upload" : "/signin"}>
            <Button size="lg">
              Analyze Contract
            </Button>
          </Link>

          <Link
            href="/sample-report"
          >
            <Button className="" variant="secondary" size="lg" onClick={() => scrollToSection("demo")} >
              Watch demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}