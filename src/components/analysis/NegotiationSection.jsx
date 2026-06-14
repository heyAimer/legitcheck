// src/components/analysis/NegotiationSection.jsx
//clause, section, suggestion! 
import { Lightbulb } from "lucide-react";

export default function NegotiationSection({
  suggestions,
  isUnlocked
}) {
  return (
    <section className="border rounded-lg p-6 border border-blue-200/60 bg-blue-100/20">
      <h2 className="text-xl font-semibold mb-2">
        What You Can Negotiate
      </h2>

      {isUnlocked ? (
        <ul className="space-y-3">
          {suggestions.map((tip, idx) => (
            <li key={idx} className="border border-blue-200/60 rounded-md p-4 bg-white">
              <h1 className="font-semibold">At Section : {tip.section}</h1>
              <p className="">{tip?.clause?.charAt(0).toUpperCase() + tip?.clause?.slice(1)}.</p>
              <div className="flex gap-2 mt-4 items-center">
                <Lightbulb className="h-6 w-6 text-yellow-500 shrink-0 animate-pulse" />
                <p className=""> <span className="font-semibold">Suggestion</span> : {tip.suggestion}.</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          Unlock full report to see negotiation suggestions.
        </p>
      )}
    </section>
  );
}
