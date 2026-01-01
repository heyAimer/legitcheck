// src/components/analysis/RiskScoreHeader.jsx

export default function RiskScoreHeader({ score, summary, analysisId }) {
  return (
    <section className="border rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-1">
        Contract Risk Analysis
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Analysis ID: {analysisId}
      </p>

      <div className="flex items-center gap-6">
        <div className="text-5xl font-bold">{score}</div>

        <div>
          <p className="text-sm text-gray-500">Overall Risk Score</p>
          <p className="mt-1 text-gray-700">{summary}</p>
        </div>
      </div>
    </section>
  );
}
