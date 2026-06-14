// src/components/analysis/RedFlagsSection.jsx

import { Badge } from "../ui/badge";


export default function RedFlagsSection({ redFlags, isUnlocked="true" }) {
  return (
    <section className="border border-red-200/60 bg-red-100/20 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-2">
        Red Flags
      </h2>

      <ul className="space-y-3">
        {redFlags.map((flag) => (
          <li
            key={flag.id}
            className={`border border-red-200/60 rounded-md p-4 bg-white shadow-sm shadow-red-200/20 ${
              !isUnlocked ? "blur-sm select-none" : ""
            }`}
          >
            <p className="font-medium">{flag.clause?.charAt(0)?.toUpperCase() + flag.clause?.slice(1)}</p>
            <p className="text-sm text-gray-600 mt-1">
              {flag.explanation}
            </p>

            <div className="mt-5">

              <div className="">
                <Badge
                  className={
                    flag.riskLevel === "HIGH"
                      ? "bg-red-200/10 text-red-600 border-red-600/20"
                      : flag.riskLevel === "MEDIUM"
                      ? "bg-yellow-200/10 text-yellow-600 border-yellow-500/20"
                      : "bg-green-200/10 text-green-600 border-green-500/20"
                  }
                >
                  Risk Level : {flag.riskLevel}
                </Badge>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
