// src/app/(dashboard)/analysis/[analysisId]/page.jsx

import { getMockAnalysisById } from "@/lib/mock/analysis.mock";

import RiskScoreHeader from "@/components/analysis/RiskScoreHeader";
import RiskCategoryBreakdown from "@/components/analysis/RiskCategoryBreakdown";
import RedFlagsSection from "@/components/analysis/RedFlagsSection";
import ClauseGroup from "@/components/analysis/ClauseGroup";
import NegotiationSection from "@/components/analysis/NegotiationSection";
import PaywallSection from "@/components/analysis/PaywallSection";

export default async function AnalysisResultPage({ params }) {
  const resolvedParams = await params;
  const { analysisId } = resolvedParams;
  let analysis;
  try {
    analysis = await getMockAnalysisById(analysisId);
  } catch {
    throw new Error("Analysis not found");
  }

  const {
    overallRiskScore,
    summary,
    riskCategories,
    redFlags,
    harmfulClauses,
    safeClauses,
    negotiationSuggestions,
    isUnlocked
  } = analysis;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <RiskScoreHeader
        score={overallRiskScore}
        summary={summary}
        analysisId={analysisId}
      />

      {/* Risk Breakdown */}
      <RiskCategoryBreakdown categories={riskCategories} />

      {/* Red Flags */}
      <RedFlagsSection
        redFlags={redFlags}
        isUnlocked={isUnlocked}
      />

      {/* Clause Groups */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClauseGroup
          title="Harmful Clauses"
          clauses={harmfulClauses}
          isUnlocked={isUnlocked}
          lockedText="Unlock to view harmful clauses"
        />

        <ClauseGroup
          title="Safe Clauses"
          clauses={safeClauses}
          isUnlocked={isUnlocked}
          lockedText="Unlock to view safe clauses"
        />
      </section>

      {/* Negotiation */}
      <NegotiationSection
        suggestions={negotiationSuggestions}
        isUnlocked={isUnlocked}
      />

      {/* Paywall */}
      {!isUnlocked && <PaywallSection />}
    </div>
  );
}
