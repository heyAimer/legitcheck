// src/app/auth/SignInForm.jsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      toast.error("Google sign-in failed");
    }
  }, []);
 
  const [form , setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/signin`, {
        email: form.email,
        password: form.password,
      });

      toast.success("Signin successful");

      setForm({
        email: "",
        password: "",
      })
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Signin failed";
        setForm({
        email: "",
        password: "",
      })
        toast.error(message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    window.location.href = (`${BASE_URL}/oauth/login`);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
     
    if (!form.email || !form.password) {
      return setError("Please fill in all required fields.");
    }
    setIsLoading(true);

    handleSignIn(); 
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
                <Link
                  href="/signin/forgotpassword"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
            
            <div className="flex">
              <Button type="submit" disabled={isLoading} className="btn-primary btn2 w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
              </Button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
          </form>

          <div className="flex">
            <Button onClick={() => {handleGoogleSignIn()}} disabled={isLoading} className="btn-secondary btn w-full cursor-pointer">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in with Google
            </Button>
          </div>

          <div className="pt-2">
            <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="text-lg">🔒</span>
              {/* Your contracts are encrypted in transit and at rest. */}
              Your data is encrypted and handled securely.
            </p>
          </div>
          
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}