export default function GradientRing({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-50 ${className}`}
    />
  );
}

