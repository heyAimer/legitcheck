// src/components/analysis/ClauseGroup.jsx

import { Star } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ClauseGroup({
  title,
  clauses,
  isUnlocked,
  lockedText
}) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <p className="text-sm text-gray-500 mb-4">
        {clauses.length} clauses found !
      </p>

      {isUnlocked ? (
        clauses.map((c) => (
          <div key={c.id} className="mb-3 space-y-4 border border-border p-4 rounded-md shadow-md shadow-neutral-300/30">
            <h1 className="font-semibold">At Section : {c.section}</h1>
            <p className="">{c.clause}.</p>
            
            <div className="flex gap-2 items-center">
              <Star className="h-4 w-4 animate-spin text-yellow-600" />
              <p className="text-sm text-yellow-800">
                {c.explanation}
              </p>
            </div>

            <div className="flex justify-end">
              <Badge
                className={
                  c.riskLevel === "HIGH"
                    ? "bg-red-200/10 text-red-600 border-red-500/20"
                    : c.riskLevel === "MEDIUM"
                    ? "bg-yellow-200/10 text-yellow-600 border-yellow-500/20"
                    : "bg-green-200/10 text-green-600 border-green-500/20"
                }
              >
                Risk Level : {c.riskLevel}
              </Badge>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">
          {lockedText}
        </p>
      )}
    </div>
  );
}
