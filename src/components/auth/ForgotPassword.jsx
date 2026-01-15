// src/app/auth/SignInForm.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login/forgotpassword`, {
        email: form.email
      });
      console.log("Forgot password response:", response.data);
      if (response.data.success) {
        toast.success("OTP has been sent to your email.");
        setEmail("");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      toast.error("Something went wrong.");
    }finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    handleSendOtp();

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
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Send reset link
            </Button>

          </form>

          <div className="mt-6 text-center text-sm">
            Remembered your password?{" "}
            <Link
              href="/signin"
              className="text-primary font-medium hover:underline"
            >
              Back to signin
            </Link>
          </div>

           <p className="mt-4 text-xs text-center text-slate-500">
            🔒 For security reasons, we don’t disclose whether an email exists.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}