// src/app/auth/ForgotPasswordForm.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendResetLink = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login/forgotpassword`,
        { email },
        { withCredentials: true }
      );

      if (response.data.status === "Success") {
        setSent(true);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      toast.error(backendMessage || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setIsLoading(true);
    handleSendResetLink();
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
              repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
              ),
              repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
              )
          `,
          WebkitMaskImage: `
              repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
              ),
              repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
              )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <Card className="bg-white relative">
        <CardContent className="relative z-20">
          {sent ? (
            <div className="text-center space-y-3 py-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                <MailCheck className="h-6 w-6 text-blue-700" />
              </div>
              <h2 className="font-semibold text-lg">Check your email</h2>
              <p className="text-sm text-muted-foreground">
                If an account exists for <span className="font-medium">{email}</span>,
                we've sent a link to reset your password.
              </p>
              <Link
                href="/signin"
                className="inline-block text-sm text-primary font-medium hover:underline pt-2"
              >
                Back to signin
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={onSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="mt-2"
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-primary btn2 cursor-pointer w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send reset link
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                Remembered your password?{" "}
                <Link href="/signin" className="text-primary font-medium hover:underline">
                  Back to signin
                </Link>
              </div>

              <p className="mt-4 text-xs text-center text-slate-500">
                🔒 For security reasons, we don't disclose whether an email exists.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}