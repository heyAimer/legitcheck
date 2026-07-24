"use client"

import AnalysisCountdown from "@/components/analysis/AnalysisCountdown";
import AskQuestion from "@/components/analysis/AskQues";
import ClauseGroup from "@/components/analysis/ClauseGroup";
import DownloadAnalysisPDF from "@/components/analysis/DownloadAnalysisPDF";
import EmptyAnalysisState from "@/components/analysis/EmptyAnalysisState";
import MissingProtectionSection from "@/components/analysis/MissingProtectionSection";
import NegotiationSection from "@/components/analysis/NegotiationSection";
import RedFlagsSection from "@/components/analysis/RedFlagsSection";
import RiskCategoryBreakdown from "@/components/analysis/RiskCategoryBreakdown";
import RiskScoreHeader from "@/components/analysis/RiskScoreHeader";
import WhatCanGoWrongSection from "@/components/analysis/WhatCanGoWrongSection";
import ProtectedPage from "@/components/auth/ProtectedPage";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AnalysisResultPage() {

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [chatsLeft, setChatsLeft] = useState(null);

  const expiresAt = analysis?.expiresAt ?? (analysis?.createdAt
    ? new Date(new Date(analysis.createdAt).getTime() + 20 * 60 * 1000).toISOString()
    : null);
  
  const analyse = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/scan/analyse`,
        { withCredentials: true }
      );
      setAnalysis(response.data.data);
      if (typeof response.data.chatsLeft === 'number') {
        setChatsLeft(response.data.chatsLeft);
      }
    } catch (error) {
      toast.error("Failed to analyse contract");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    analyse();
  }, []);

  if (loading) {
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
          {expiresAt && (
          <AnalysisCountdown
            expiresAt={expiresAt}
            onExpire={() => setExpired(true)}
          />
          )}
          
          {expired && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
              <p className="text-sm font-medium text-red-700">
                This analysis has expired and is no longer available.
              </p>
              <p className="text-xs text-red-600 mt-1">
                Upload a new contract to get a fresh report.
              </p>
            </div>
          )}
          
          <RiskScoreHeader
            score={analysis.overallRiskScore}
            summary={analysis.summary}
          />

          <div className="flex justify-end">
            <DownloadAnalysisPDF analysis={analysis}/>
          </div>
          {/* Risk Breakdown */}
          <RiskCategoryBreakdown categories={analysis.riskCategories} />

          {/* Red Flags */}
          <RedFlagsSection
            redFlags={analysis.redFlags}
            isUnlocked={analysis.isUnlocked}
          />

          <MissingProtectionSection
            protections={analysis.missingProtections}
            isUnlocked={analysis.isUnlocked}
          />

          <WhatCanGoWrongSection
            scenarios={analysis.whatCanGoWrong}
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
          <AskQuestion chatsLeft={chatsLeft} setChatsLeft={setChatsLeft}/>
        </div>}
      </div>
    </ProtectedPage>
  );
}
