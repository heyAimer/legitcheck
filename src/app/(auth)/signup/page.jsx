// src/app/signin/page.jsx

import AuthHeader from "@/components/auth/AuthHeader";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Link href='/' className="text-lg font-semibold absolute top-0 left-0 z-10 bg-white px-6 py-[14]">
        LegitCheck
      </Link>

      <div className="w-full max-w-md space-y-8">
        <AuthHeader
          title="Create your account"
          description="Run contract risk checks and keep your reports in one place."
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