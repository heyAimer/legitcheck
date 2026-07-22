'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCard, Shield, Layers, AlertTriangle } from "lucide-react";

export const CARDS = [
  {
    id: "payment-risks",
    title: "Payment & milestone risks",
    description:
      "Finds unclear payment terms, late-payment loopholes, and missing milestones that can delay or reduce your pay.",
    icon: CreditCard,
    badge: "High risk",
    accentColor: "blue",
  },
  {
    id: "ip-ownership",
    title: "Intellectual property exposure",
    description:
      "Reveals who actually owns the work, what rights you’re giving away, and where your IP may be permanently lost.",
    icon: Shield,
    badge: "Critical",
    accentColor: "purple",
  },
  {
    id: "scope-creep",
    title: "Scope & revision traps",
    description:
      "Detects vague deliverables, unlimited revisions, and clauses that quietly increase unpaid work.",
    icon: Layers,
    badge: "Common issue",
    accentColor: "amber",
  },
  {
    id: "termination-liability",
    title: "Termination & liability risks",
    description:
      "Highlights one-sided termination clauses, excessive liability, and risky indemnity language.",
    icon: AlertTriangle,
    badge: "High risk",
    accentColor: "red",
  },
];

const OutcomeSection = () => {
  return (
    <section className="md:py-24 py-10 relative mx-auto max-w-7xl" id="risk-analysis">
      <div className="md:mb-14 mb-7 text-center">
          <h1 className="mx-auto max-w-3xl lg:text-5xl md:text-4xl sm:text-3xl text-xl font-semibold tracking-tight text-slate-900">
              Know the risks before you sign
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto md:mt-6 mt-2 max-w-2xl sm:text-lg text-sm leading-relaxed text-slate-500">
              Upload any contract and get clear, actionable risk highlights in under 60 seconds
          </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:px-26 md:px-10">
        {CARDS.map((c) => (
          <Card
            key={c.id}  
            className="relative transition-all duration-200 hover:shadow-lg lg:flex"
          >
            <div className="flex justify-center">
              <div className="flex items-center justify-center lg:h-24 lg:w-24 h-18 w-18 rounded-2xl bg-linear-to-br from-blue-600/10 to-transparent group-hover:from-blue-600/20 transition-colors shrink-0 lg:m-5 mt-5">
                <c.icon className=" md:h-10 lg:w-10 w-8 h-8 text-blue-800" />
              </div>
            </div>
            <div className="flex flex-col">
              <CardHeader className="space-y-2 flex items-center lg:items-start text-center lg:text-start">
                  {/* Title */}
                <CardTitle className="text-lg font-semibold text-slate-900">
                {c.title}
                </CardTitle>

                  {/* Description */}
                <CardDescription className="text-sm text-slate-600">
                  {c.description}
                </CardDescription>
                
                <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 mt-4">
                  {c.badge}
                </span>
              </CardHeader>
            </div>
          </Card>
        ))}
      </div>
    </section >
  )
}

export default OutcomeSection
