// src/components/analysis/ClauseGroup.jsx

export default function ClauseGroup({
  title,
  clauses,
  isUnlocked,
  lockedText
}) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="font-semibold mb-2">{title}</h3>

      <p className="text-sm text-gray-500 mb-4">
        {clauses.length} clauses found
      </p>

      {isUnlocked ? (
        clauses.map((c) => (
          <div key={c.id} className="mb-3">
            <p className="font-medium">{c.clause}</p>
            <p className="text-sm text-gray-600">
              {c.explanation}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">
          {lockedText}
        </p>
      )}
    </div>
  );
}
