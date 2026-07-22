'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const USE_CASE_ITEMS = [
  {
    title: "Freelancers",
    href: "/use-cases/freelancers",
    description: "Don’t lose money to vague terms or late-payment traps.",
    outcomes: [
      "Detect unclear payment schedules",
      "Flag unpaid revision clauses",
      "Catch one-sided termination terms",
    ],
    highlight: "Know if you’ll actually get paid before you start work.",
  },
  {
    title: "Small agencies",
    href: "/use-cases/agencies",
    description: "Prevent scope creep and legal exposure as you scale.",
    outcomes: [
      "Identify vague or expanding deliverables",
      "Spot unlimited revision risks",
      "Review liability and indemnity clauses",
    ],
    highlight: "Protect your team from contracts that silently expand scope.",
  },
  {
    title: "Designers & developers",
    href: "/use-cases/creators",
    description: "Understand who owns your work and how it can be used.",
    outcomes: [
      "Clarify intellectual property ownership",
      "Catch full buyout or transfer clauses",
      "Review usage, resale, and license rights",
    ],
    highlight: "Know exactly what rights you’re giving away — or keeping.",
  },
]

export default function OutcomeSection() {
  return (
    <section id="use-cases" className="px-6 md:py-24 py-10 relative mx-auto max-w-7xl ">
     
      <div className="md:mb-14 mb-7 text-center">
        <h2 className="max-w-3xl md:text-4xl sm:text-3xl text-xl font-semibold tracking-tight text-slate-900 mx-auto">
          Built for people who sign contracts, not lawyers
        </h2>
        <p className="md:mt-6 mt-2 max-w-2xl sm:text-lg text-sm leading-relaxed text-slate-500 text-muted-foreground mx-auto">
          LegitCheck helps freelancers and small teams spot risks early —
          without legal jargon or expensive reviews.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10 xl:px-26 md:px-10">
        {USE_CASE_ITEMS.map((item) => (
          <Card
            key={item.title}
            className="group relative border border-border/60 transition hover:shadow-md"
          >
            {/* Accent bar */}
            <div className="absolute left-0 top-0 h-full w-1 bg-primary/70 opacity-0 transition group-hover:opacity-100" />

            <CardContent className="flex h-full flex-col">

              <h3 className="mt-4 text-lg font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>

              {/* Outcomes */}
              <ul className="mt-5 space-y-3 text-sm">
                {item.outcomes.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight */}
              <p className="mt-4 text-sm italic text-muted-foreground">
                “{item.highlight}”
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
    </section>
  )
}
