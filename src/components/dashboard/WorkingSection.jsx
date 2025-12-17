
import {UploadCloud, ScanSearch, FileCheck} from "lucide-react"

const steps = [
    {
      "step": 1,
      "title": "Upload your contract",
      "description": "Upload a PDF or Word file, or paste contract text. Your document is encrypted and never shared.",
      "icon": UploadCloud
    },
    {
      "step": 2,
      "title": "AI scans for risks",
      "description": "ContractKit analyzes payment terms, IP ownership, termination clauses, and scope creep risks in seconds.",
      "icon": ScanSearch
    },
    {
      "step": 3,
      "title": "Get a clear risk report",
      "description": "Risky clauses are highlighted with plain-English explanations and suggested fixes you can copy.",
      "icon": FileCheck
    }
]
  
const WorkingSection = () => {
    return (
        <section className="py-10 md:py-14 px-6">
            <div className=" mx-auto max-w-7xl md:px-6 md:mb-14 mb-7 text-center">
                <h1 className="mx-auto max-w-3xl lg:text-5xl md:text-4xl sm:text-3xl text-xl font-semibold tracking-tight text-slate-900">How LegitCheck works</h1>
                <p className="mx-auto md:mt-6 mt-2 max-w-2xl sm:text-lg text-sm leading-relaxed text-slate-500">Upload a contract and get clear, actionable risk insights no legal jargon, no waiting.</p>
            </div>   
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:px-10 xl:px-26 md:px-24">
                {steps.map((step) => (
                    <div className=" relative duration-200 px-4 py-8 rounded-lg flex flex-col gap-4 transition-all border border-3 border-gray-100"
                    key={step.step}>
                        <div className="absolute bg-[#1D4ED8] text-white font-semibold py-2 px-4 rounded-full top-[-20] left-5">{step.step}</div>
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <step.icon className="text-[#1D4ED8]" size={40} />
                            </div>
                            <div className="text-lg font-semibold mt-4 mb-1">{step.title}</div>
                            <div className="text-sm text-slate-600">{step.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WorkingSection
