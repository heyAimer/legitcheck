// src/components/analysis/RiskScoreHeader.jsx

export default function RiskScoreHeader({ score, summary }) {
  return (
    <section className="border rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-1">
        Contract Risk Analysis
      </h1>

      <div className="flex md:flex-row flex-col items-center md:gap-4">
        <div className="flex flex-col gap-2 py-4">
          <div className="text-5xl font-bold bg-secondary p-4 px-6 rounded-md">{score}</div>
          <p className="text-sm text-gray-500 md:hidden flex">Overall Risk Score</p>
        </div>

        <div className="md:text-start text-justify">
          <p className="text-sm text-gray-500 md:flex hidden">Overall Risk Score</p>
          <p className="mt-1 text-gray-700">{summary}</p>
        </div>
      </div>
    </section>
  );
}
