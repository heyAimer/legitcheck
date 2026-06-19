"use client"

import ClauseGroup from "@/components/analysis/ClauseGroup";
import EmptyAnalysisState from "@/components/analysis/EmptyAnalysisState";
import NegotiationSection from "@/components/analysis/NegotiationSection";
import RedFlagsSection from "@/components/analysis/RedFlagsSection";
import RiskCategoryBreakdown from "@/components/analysis/RiskCategoryBreakdown";
import RiskScoreHeader from "@/components/analysis/RiskScoreHeader";
import ProtectedPage from "@/components/auth/ProtectedPage";
import { useAuthContext } from "@/utils/providers/AuthProvider";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AnalysisResultPage() {

  const router = useRouter();
  const { data, isLoading, error } = useAuthContext();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const analyse = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/scan/analyse`,
        { withCredentials: true }
      );
      setAnalysis(response.data.data);

    } catch (error) {
      toast.error("Failed to analyse contract");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    analyse();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)] ">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  
   if (!analysis) {
     return (
      <ProtectedPage>
        <EmptyAnalysisState />
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
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
    </ProtectedPage>
  );
}
