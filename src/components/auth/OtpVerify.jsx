"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const OTP_LENGTH = 6; // customize number of digits

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= OTP_LENGTH) setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== OTP_LENGTH) {
      toast.error(`Please enter a ${OTP_LENGTH}-digit OTP`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/signup/otp`,
        {otp},
        {
          withCredentials: true,
          headers: {
          "Content-Type": "application/json",
          }
        }
      );
      toast.success(response.data.message || "OTP verified successfully!");
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "OTP verification failed";
        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }

      console.error("Error during OTP verification:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-full max-w-sm mx-auto mt-20">
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
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Enter OTP
          </h2>
          <p className="text-sm text-slate-600 text-center mb-6">
            We have sent a {OTP_LENGTH}-digit OTP to your email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={otp}
              onChange={handleChange}
              placeholder={`Enter ${OTP_LENGTH}-digit OTP`}
              className="text-center tracking-widest text-lg"
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="btn-primary btn2 cursor-pointer w-full"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Verify OTP
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            Didn't receive OTP?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => toast("OTP resent! Check your email.")}
            >
              Resend
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
