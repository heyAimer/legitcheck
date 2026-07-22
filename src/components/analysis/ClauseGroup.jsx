// src/components/analysis/ClauseGroup.jsx

import { AlertTriangle, ShieldCheck, Lock, Lightbulb } from "lucide-react";
import { Badge } from "../ui/badge";

const riskAccent = {
  HIGH: "border-l-red-500",
  MEDIUM: "border-l-amber-500",
  LOW: "border-l-green-500",
};

const riskBadge = {
  HIGH: "bg-red-100 text-red-700 border-red-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-green-100 text-green-700 border-green-200",
};

export default function ClauseGroup({
  title,
  clauses,
  isUnlocked,
  lockedText
}) {
  const isHarmful = title?.toLowerCase().includes("harmful");
  const HeaderIcon = isHarmful ? AlertTriangle : ShieldCheck;
  
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeaderIcon
            className={`h-5 w-5 ${isHarmful ? "text-red-600" : "text-green-600"}`}
          />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <span className="text-xs text-muted-foreground">
          {clauses.length} found
        </span>
      </div>

      {isUnlocked ? (
        <div className="space-y-3">
          {clauses.map((c, idx) => {
            const level = c.riskLevel?.toUpperCase();
            const accent = riskAccent[level] || "border-l-muted";
            const badge = riskBadge[level] || "bg-muted text-muted-foreground border-border";

            return (
              <div
                key={c.id ?? idx}
                className={`space-y-3 border border-l-4 ${accent} p-4 rounded-md`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Section: {c.section}
                  </p>
                  <Badge className={`text-[10px] uppercase tracking-wide shrink-0 ${badge}`}>
                    {c.riskLevel}
                  </Badge>
                </div>

                <p className="text-sm">{c.clause}</p>

                <div className="flex gap-2 items-start bg-muted/40 rounded-md p-3">
                  <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    {c.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-2 py-8 border border-dashed rounded-md">
          <Lock className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground max-w-[220px]">
            {lockedText}
          </p>
        </div>
      )}
    </div>
  );
}
