"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/utils/CheckoutButton";

export const pricingPlans = [
  {
    section: "§01",
    name: "1 Credit",
    planKey: "one time",
    price: "$2",
    description: "For one contract you need to review before signing.",
    buttonText: "Buy 1 Credit",
    highlighted: false,
    features: [
      "1 credit = 1 full contract scan",
      "Full contract risk report",
      "10 chat questions for this contract",
      "Downloadable PDF report",
    ],
  },
  {
    section: "§02",
    name: "5 Credits",
    planKey: "super pack",
    price: "$5",
    description: "For freelancers and designers handling multiple clients.",
    buttonText: "Get 5 Credits",
    highlighted: true,
    badge: "Popular",
    badgeType:"popular",
    features: [
      "5 credits = 5 full contract scans",
      "Full contract risk reports for each scan",
      "10 chat questions per contract",
      "Downloadable PDF reports",
    ],
  },
  {
    section: "§03",
    name: "15 Credits",
    planKey: "mega pack",
    price: "$9",
    description:
      "For freelancers, studios, and small agencies reviewing contracts regularly.",
    buttonText: "Buy 15 Credits",
    highlighted: true,
    badge: "Best value",
    badgeType:"value",
    features: [
      "15 credits = 15 full contract scans",
      "Full contract risk report for each scan",
      "15 chat questions per contract",
      "Downloadable PDF reports",
    ],
  },
];

const highlighterColors = {
  popular: "#FDE68A", // warm yellow
  value: "#A7F3D0",   // mint green, ties into the emerald check icons
};

function HighlighterMark({ type}) {
  return (
    <svg
      viewBox="0 0 160 34"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4,20 C 30,6 60,28 90,10 C 115,-2 140,18 156,14 L156,30 C 120,26 90,32 60,26 C 35,21 15,30 4,28 Z"
        fill={highlighterColors[type] || highlighterColors.popular}
        opacity="0.9"
      />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section className=" relative py-20 px-4" id="pricing">

      <div className="mx-auto max-w-7xl">

        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
            Pricing
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
            Simple pricing for safer contract decisions
          </h2>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Pick a one-time scan for a single contract, or go Pro if you
            review agreements regularly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border bg-white p-6 transition-shadow ${
                plan.highlighted
                  ? "border-blue-600/30 ring-1 ring-blue-600/40 shadow-xl md:-translate-y-3"
                  : "border-neutral-200 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.highlighted && plan.badge && (
                <div className="absolute -top-4 -right-3 rotate-6">
                  <div className="relative w-28 h-8 flex items-center justify-center px-2">
                    <HighlighterMark type={plan.badgeType} />
                    <span className="relative text-xs font-semibold text-neutral-800">
                      {plan.badge}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {plan.name}
                </h3>
              </div>

              <div className="flex items-baseline gap-1 mt-3 mb-3">
                <span className="text-3xl font-semibold text-neutral-900">
                  {plan.price}
                </span>
                {plan.interval && (
                  <span className="text-sm text-neutral-400">
                    {plan.interval}
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                {plan.description}
              </p>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                      <Check className="h-2.5 w-2.5 text-emerald-700" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <CheckoutButton plan = {plan}/>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}