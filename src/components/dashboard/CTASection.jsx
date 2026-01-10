import GradientRing from "@/utils/GradientRings"
import { AlertCircle, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"

const CTASection = () => {
    return (
        <section className="relative overflow-hidden px-6 py-20 md:h-[80vh] justify-center items-center flex">
            <GradientRing
                className="
                    -left-30 top-14
                    h-[420px] w-[420px]
                    bg-[radial-gradient(circle_at_center,#60a5fa,transparent_70%)]
                "
            />

            <GradientRing
                className="
                    -right-30 bottom-2
                    h-[380px] w-[380px]
                    bg-[radial-gradient(circle_at_center,#a78bfa,transparent_70%)]
                "
            />
            
            <div className=" relative mx-auto max-w-7xl md:px-6 md:py-24 text-center ">
                <h1 className="mx-auto max-w-3xl lg:text-5xl md:text-4xl sm:text-3xl text-xl font-semibold tracking-tight text-slate-900">
                   Sign with clarity, not assumptions
                </h1>
                <p className="mx-auto mt-4 max-w-2xl sm:text-lg text-sm leading-relaxed text-slate-500">Understand what you’re agreeing to — without decoding legal language.</p>

                {/* <p className="mx-auto md:mt-6 mt-8 text-xs leading-relaxed text-slate-500 max-w-2xl">
                    <ShieldCheck className="w-4 h-4 text-gray-500 inline" /> Private & secure
                    • 
                    <AlertCircle className="w-4 h-4 text-gray-500 inline" /> Risk awareness, not legal advice
                    •
                    <Zap className="w-4 h-4 text-gray-500 inline" /> Fast results
                </p> */}

                 <div className=" flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10 mt-8">
                    <Link href="/tryFree" className="btn-primary md:btn4 btn3 cursor-pointer md:text-lg ">
                        Try free analysis
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CTASection
