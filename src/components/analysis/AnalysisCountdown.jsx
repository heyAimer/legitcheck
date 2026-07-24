// components/analysis/AnalysisCountdown.jsx
"use client";

import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export default function AnalysisCountdown({ expiresAt, onExpire }) {
  const [remainingMs, setRemainingMs] = useState(
    () => new Date(expiresAt).getTime() - Date.now()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      setRemainingMs(diff);
      if (diff <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const isExpired = totalSeconds <= 0;
  const isWarning = !isExpired && totalSeconds <= 120; // last 2 minutes

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors border border-neutral-200 ${
        isExpired
          ? "bg-red-100 text-red-700"
          : isWarning
          ? "bg-amber-100 text-amber-700 animate-pulse"
          : "bg-neutral-100 text-neutral-700"
      }`}
    >
      {isExpired || isWarning ? (
        <AlertTriangle className="h-3.5 w-3.5" />
      ) : (
        <Clock className="h-3.5 w-3.5" />
      )}
      {isExpired
        ? "Analysis expired"
        : `${minutes}:${seconds.toString().padStart(2, "0")} remaining`}
    </div>
  );
}