// src/components/analysis/RedFlagsSection.jsx

export default function RedFlagsSection({ redFlags, isUnlocked }) {
  return (
    <section className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-2">
        Red Flags
      </h2>

      {!isUnlocked && (
        <p className="text-sm text-gray-500 mb-4">
          {redFlags.length} high-risk clauses detected. Unlock to view details.
        </p>
      )}

      <ul className="space-y-3">
        {redFlags.map((flag) => (
          <li
            key={flag.id}
            className={`border rounded-md p-4 ${
              !isUnlocked ? "blur-sm select-none" : ""
            }`}
          >
            <p className="font-medium">{flag.clause}</p>
            <p className="text-sm text-gray-600 mt-1">
              {flag.explanation}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
