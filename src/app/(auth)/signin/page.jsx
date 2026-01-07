// src/app/signin/page.jsx

import AuthHeader from "@/components/auth/AuthHeader";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Link href='/' className="text-lg font-semibold absolute top-0 left-0 z-10 bg-white px-6 py-[14]">
        LegitCheck
      </Link>
      <div className="w-full max-w-md space-y-8">
        <AuthHeader
          title="Welcome back"
          description="Sign in to your LegitCheck account to continue analyzing contracts."
        />
        <SignInForm />
      </div>
    </main>
  );
}

export const metadata = {
  title: "Sign In - LegitCheck",
  description: "Sign in to your contract risk analysis dashboard.",
};