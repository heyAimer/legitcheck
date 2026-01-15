// src/app/signin/page.jsx

import AuthHeader from "@/components/auth/AuthHeader";
import ForgotPassword from "@/components/auth/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader
          title="Forgot your password?"
          description="Enter your email address below and we'll send you a link to reset your password."
        />
        <ForgotPassword />
      </div>
    </main>
  );
}

export const metadata = {
  title: "Forgot Password - LegitCheck",
  description: "Reset your password.",
};