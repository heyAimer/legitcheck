// src/app/auth/AuthHeader.jsx
export default function AuthHeader({ title, description }) {
  return (
    <div className="text-center space-y-3 relative z-10">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}