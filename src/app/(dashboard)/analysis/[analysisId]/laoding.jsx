// src/app/(dashboard)/analysis/[analysisId]/loading.jsx

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-lg font-medium">
        Analyzing contract…
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Extracting clauses and assessing risks.
      </p>
    </div>
  );
}
