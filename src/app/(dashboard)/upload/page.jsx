"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ShieldCheck, Scale, Brain } from "lucide-react";
import Link from "next/link";


const DEV_ANALYSIS_ID = "demo-locked";

export default function UploadContractPage() {
  
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-12">

        {/* SECTION 1: PAGE HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Upload your contract for instant risk analysis
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Get clear red flags, risk score, and negotiation tips in plain English — in under 60 seconds.
          </p>
        </div>

        {/* SECTION 2: UPLOAD CARD */}
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center space-y-6 py-10">

            <div className="flex flex-col items-center space-y-3 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Drag & drop your contract here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to upload
              </p>
            </div>

            {/* Hidden file input (connect later) */}
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />

            <div className="text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX, TXT
            </div>

            <div className="mt-10 flex    flex-col items-center justify-center gap-4 sm:flex-row">
              
              <Link href="/upload" className="btn-primary btn3 cursor-pointer ">
                  Upload contract
              </Link>

              <Link
                href={`/analysis/${DEV_ANALYSIS_ID}`}
                className="btn3 btn-secondary"
              >
                View report
              </Link>
          
            </div>

            <p className="text-xs text-muted-foreground">
              Takes approximately 30–60 seconds
            </p>
          </CardContent>
        </Card>

        {/* SECTION 3: TRUST STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>We do not store your contracts</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Informational analysis only</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI-assisted clause review</span>
          </div>
        </div>

        {/* SECTION 4: WHAT YOU’LL GET */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            What you’ll get
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>🚨 Red flags that could harm you</li>
            <li>⚠️ Overall contract risk score</li>
            <li>🧠 Plain-English explanation of clauses</li>
            <li>❌ Clauses you should be careful about</li>
            <li>✅ Clauses that are safe or standard</li>
            <li>💡 What you can negotiate before signing</li>
          </ul>
        </div>

        {/* SECTION 5: HOW IT WORKS */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>1. Upload your contract</div>
            <div>2. AI scans key clauses</div>
            <div>3. Receive a clear risk report</div>
          </div>
        </div>

        {/* SECTION 6: DISCLAIMER */}
        <div className="text-xs text-muted-foreground text-center pt-6 border-t">
          This tool provides informational insights only and does not replace professional legal advice.
        </div>

      </div>
    </div>
  );
}
