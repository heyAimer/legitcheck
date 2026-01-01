// src/app/(dashboard)/analysis/[analysisId]/error.jsx

"use client";

export default function Error({ error, reset }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center">
      <h2 className="text-xl font-semibold mb-2">
        Unable to load analysis
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        This analysis could not be found or failed to load.
      </p>

      <button
        onClick={() => reset()}
        className="px-5 py-2 bg-black text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
}
