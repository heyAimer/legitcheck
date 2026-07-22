import { ShieldOff, Plus, Info } from "lucide-react";

const riskStyles = {
  HIGH: {
    badge: "bg-red-100 text-red-700 border-red-200",
    accent: "border-l-red-500",
  },
  MEDIUM: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    accent: "border-l-amber-400",
  },
  LOW: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    accent: "border-l-blue-500",
  },
};

export default function MissingProtectionsSection({ protections, isUnlocked="true" }) {
  if (!protections?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <ShieldOff className="h-5 w-5 text-amber-600" />
        <h2 className="text-lg font-semibold">Missing Protections</h2>
        <span className="text-xs text-muted-foreground">
          ({protections.length})
        </span>
      </div>

      <div className="space-y-3">
        {protections.map((protection, idx) => {
          const risk = riskStyles[protection.riskLevel?.toUpperCase()] || riskStyles.MEDIUM;

          return (
            <div
              key={idx}
              className={`rounded-lg border border-l-4 ${risk.accent} bg-card p-4 space-y-3`}
            >
              {/* Header row: clause name + risk badge */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-sm">
                  {isUnlocked ? protection.item : "🔒 Unlock to view this clause"}
                </h3>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border shrink-0 ${risk.badge}`}
                >
                  {protection.riskLevel}
                </span>
              </div>

              {isUnlocked && (
                <div className="space-y-2.5">
                  {/* What to add */}
                  <div className="flex gap-2">
                    <Plus className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        What to add
                      </p>
                      <p className="text-sm">{protection.whatToAdd}</p>
                    </div>
                  </div>

                  {/* Why it matters */}
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Why it matters
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {protection.whyItMatters}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}