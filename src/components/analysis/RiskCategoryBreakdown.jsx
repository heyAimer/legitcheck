// src/components/analysis/RiskCategoryBreakdown.jsx

export default function RiskCategoryBreakdown({ categories }) {
  return (
    <section className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        Risk Breakdown
      </h2>

      <ul className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <li
            key={cat.key}
            className="flex justify-between border rounded-md px-4 py-3"
          >
            <span>{cat.key}</span>
            <span className="font-medium">{cat.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
