// src/app/signin/page.jsx

import AuthHeader from "@/components/auth/AuthHeader";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader
          title="Welcome back"
          description="Sign in to your LegitCheck account to continue analyzing contracts."
        />
        <SignUpForm />
      </div>
    </main>
  );
}

export const metadata = {
  title: "Sign In - LegitCheck",
  description: "Sign in to your contract risk analysis dashboard.",
};