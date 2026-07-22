import { AlertTriangle, ArrowRight } from "lucide-react";

export default function WhatCanGoWrongSection({ scenarios, isUnlocked="true" }) {
  if (!scenarios?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <h2 className="text-lg font-semibold">What Can Go Wrong</h2>
        <span className="text-xs text-muted-foreground">
          ({scenarios.length})
        </span>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-card p-4"
          >
            {!isUnlocked ? (
              <p className="font-medium text-sm">
                🔒 Unlock to view this scenario
              </p>
            ) : (
              <div className="space-y-2">
                {/* Consequence — the headline */}
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-red-600 shrink-0 mt-0.5">
                    If unchanged
                  </span>
                </div>
                <p className="text-sm font-medium">
                  {scenario.consequence}
                </p>

                {/* Impact — the downstream effect */}
                <div className="flex items-start gap-2 pt-1 border-t border-dashed">
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    {scenario.impact}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}