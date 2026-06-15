"use client"

import ClauseGroup from "@/components/analysis/ClauseGroup";
import NegotiationSection from "@/components/analysis/NegotiationSection";
import RedFlagsSection from "@/components/analysis/RedFlagsSection";
import RiskCategoryBreakdown from "@/components/analysis/RiskCategoryBreakdown";
import RiskScoreHeader from "@/components/analysis/RiskScoreHeader";
import { useAuth } from "@/utils/hooks/useAuth";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AnalysisResultPage() {

  const router = useRouter();
  const { data, isLoading, error } = useAuth();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const analyse = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/scan/analyse`,
        { withCredentials: true }
      );
      setAnalysis(response.data.data);

    } catch (error) {
      console.error("Error analysing contract :", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    analyse();
  }, []);

  useEffect(() => {
    if (!isLoading && !data?.data?.authenticated) {
      router.push("/signin");
    }
  }, [data, isLoading, router]);

  if (isLoading ||!data?.data?.authenticated || loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)] ">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  
   if (error) {
    <div className="font-semibold flex items-center justify-center h-[calc(100vh-150px)] gap-4">
      <WifiOff className="h-8 w-8 text-red-500" />
      <div className="text-2xl">Network Error</div>
    </div>
  }

  return (
    <div>
      {analysis && <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <RiskScoreHeader
          score={analysis.overallRiskScore}
          summary={analysis.summary}
        />

        {/* Risk Breakdown */}
        <RiskCategoryBreakdown categories={analysis.riskCategories} />

        {/* Red Flags */}
        <RedFlagsSection
          redFlags={analysis.redFlags}
          isUnlocked={analysis.isUnlocked}
        />

        {/* Clause Groups */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClauseGroup
            title="Harmful Clauses"
            clauses={analysis.harmfulClauses}
            isUnlocked={analysis.isUnlocked}
          />

          <ClauseGroup
            title="Safe Clauses"
            clauses={analysis.safeClauses}
            isUnlocked={analysis.isUnlocked}
          />
        </section>

        {/* Negotiation */}
        <NegotiationSection
          suggestions={analysis.negotiationSuggestions}
          isUnlocked={analysis.isUnlocked}
        />
      </div>}
    </div>
  );
}
