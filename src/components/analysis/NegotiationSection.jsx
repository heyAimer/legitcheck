// src/components/analysis/NegotiationSection.jsx

export default function NegotiationSection({
  suggestions,
  isUnlocked
}) {
  return (
    <section className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-2">
        What You Can Negotiate
      </h2>

      {isUnlocked ? (
        <ul className="space-y-3">
          {suggestions.map((tip, idx) => (
            <li key={idx} className="border rounded-md p-4">
              <p className="font-medium">{tip.clause}</p>
              <p className="text-sm text-gray-600">
                {tip.suggestion}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          Unlock full report to see negotiation suggestions.
        </p>
      )}
    </section>
  );
}
