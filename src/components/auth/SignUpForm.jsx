
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

     if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError("Please fill in all required fields.");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!form.agreed) {
      return setError("You must agree to the Terms and Privacy Policy.");
    }
    // Simulate auth (replace with your actual auth logic, e.g. NextAuth, Supabase, etc.)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup form data:", form);
    }, 1200);
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
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <div className="mb-2">
                <Label htmlFor="name">Full name</Label>
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Alex Johnson"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="">
              <div className="mb-2">
                <Label htmlFor="email">Email address</Label>
              </div>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
              </div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="mb-4 flex items-start gap-2">
              <input
                type="checkbox"
                name="agreed"
                checked={form.agreed}
                onChange={handleChange}
                className="mt-1"
              />
              <p className="text-xs text-slate-600">
                By creating an account, you agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {error && (
              <p className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="btn-primary btn2 cursor-pointer w-full "
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </form>

          <div className="pt-2">
            <p className="mt-4 text-center text-xs text-slate-500">
            🔒 Your contracts and personal data are encrypted and never shared.
            </p>
          </div>
          
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}