// src/app/signin/page.jsx
import OtpVerify from "@/components/auth/OtpVerify";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Link href='/' className="text-lg font-semibold absolute top-0 left-0 z-10 bg-white px-6 py-[14]">
        LegitCheck
      </Link>

      <div className="w-full max-w-md space-y-8">
        <OtpVerify />
      </div>
    </main>
  );
}

export const metadata = {
  title: "OTP - LegitCheck",
  description: "Verify your email to complete registration",
};