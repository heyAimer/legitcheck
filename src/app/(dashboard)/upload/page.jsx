"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ShieldCheck, Scale, Brain, X, Loader2, WifiOff, FileSearch, MessageCircle, Crown, Sparkles } from "lucide-react";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jurisdictions } from "@/utils/CountryNames";
import { useAuthContext } from "@/utils/providers/AuthProvider";
import ProtectedPage from "@/components/auth/ProtectedPage";
import getEntitlement from "@/utils/Entitlement";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const roles = [
  { value: "designer", label: "Designer / Creative Freelancer" },
  { value: "freelancer", label: "Freelancer / Consultant" },
  { value: "agency", label: "Small Agency / Studio" },
  { value: "founder", label: "Startup Founder" },
  { value: "client", label: "Client / Hiring Party" },
  { value: "other", label: "Other / Not sure" },
];
const ALLOWED_TYPES = [".pdf", ".docx", ".txt"];
const ALLOWED_TYPES_LABEL = "PDF, DOCX, or TXT";
const ACCEPT_ATTR = ALLOWED_TYPES.join(",");
const MAX_SIZE_MB = 20;

export default function UploadContractPage() {
  const router = useRouter();
  const { data, isLoading, error } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectFile, setSelectFile] = useState(null);

  const [reviewerRole, setReviewerRole] = useState("designer");
  const [jurisdiction, setJuristiction] = useState("united_states");

  const [entitlement, setEntitlement] = useState(null);

  const scansRemaining = entitlement?.subscription?.scans ?? 0;
  const canAnalyze = scansRemaining > 0;

  const uploadFile = useRef(null);
  const abortControllerRef = useRef(null);

  const validateFile = (file) => {
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_TYPES.includes(ext)) {
      toast.error("Unsupported file type. Please upload PDF, DOC, DOCX, or TXT.");
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large. Max size is ${MAX_SIZE_MB}MB.`);
      return false;
    }
    return true;
  };

  const stageFile = (file) => {
    if (!file || !validateFile(file)) return;
    setSelectFile(file);
  };

  const handleFileChange= (e) => {
    const file = e.target.files?.[0];
    stageFile(file);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !validateFile(file)) return;

    if (uploadFile.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      uploadFile.current.files = dataTransfer.files;
    }
    setSelectFile(file);
  }

  const handleAnalyze  = async () => {
    if (!selectFile) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    const formdata = new FormData();
    formdata.append("file", selectFile);

    const params = new URLSearchParams({
      location: jurisdiction,
      user_role: reviewerRole,
    });

    try {
      const response = await axios.post(`${BASE_URL}/scan?${params.toString()}`, formdata, {
        withCredentials: true,
        signal: controller.signal
      });

      if (response.data.status === "Success") {
        toast.success(response.data.message);
        router.replace(`/analysis`);
      }
    } catch (error) {
      if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
        return;
      }

      if (error.response?.status === 402) {
        toast.error(error.response.data?.message || "You're out of scans. Please buy more to continue.");
        router.push("/#pricing");
        return;
      }
      
      console.error("Error uploading file:", error);
      toast.error("Something went wrong while analyzing your contract. Please try again.");
      setSelectFile(null);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setSelectFile(null);
    setLoading(false);
    if(uploadFile.current) {
      uploadFile.current.value = "";
    }
  }

  const handleButtonClick = () => {
    if (uploadFile.current) uploadFile.current.value = "";
    uploadFile.current.click();
  }

  useEffect(() => {
    if (!isLoading && data?.data?.authenticated) {
      getEntitlement()
        .then(setEntitlement)
        .catch(() => setEntitlement({subscription: { scans: 0, subscriptionName: null }}));
    }
  }, [isLoading, data]);

  // Abort any pending request if the user navigates away mid-upload
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !data?.data?.authenticated) {
      router.replace("/signin");
    }
  }, [data, isLoading, router]);

  if (isLoading ||!data?.data?.authenticated) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)] ">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="font-semibold flex items-center justify-center h-[calc(100vh-150px)] gap-4">
        <WifiOff className="h-8 w-8 text-red-500" />
        <div className="text-2xl">Network Error</div>
      </div>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-16">

          {/* SECTION 1: PAGE HEADER */}
          <div className="text-center space-y-3 mb-16">
            <h1 className="text-3xl font-semibold tracking-tight">
              Don’t sign a contract you only half understand.
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Upload your contract and get clear red flags, risk score, plain-English explanations, and negotiation questions before you sign.
            </p>
          </div>

          <div className="flex items-center gap-2 justify-end mb-4">
            {entitlement && (
              <>
                {entitlement?.subscription?.subscriptionName === "free trial" ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium 
                  text-blue-700 bg-blue-50 rounded-sm px-4 py-2 border border-blue-200">
                    <Sparkles className="h-5 w-5" />
                    {entitlement.subscription?.subscriptionName}
                  </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-yellow-600 bg-yellow-50 rounded-sm px-4 py-2 border border-yellow-400">
                      <Crown className="h-5 w-5" />
                      {entitlement.subscription.subscriptionName}
                    </span>
                )}

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-800 bg-neutral-100/60 rounded-sm px-4 py-2 border border-neutral-200">
                  <FileSearch className="h-5 w-5 text-yellow-600" />
                  {entitlement.subscription.scans} scan{entitlement.subscription.scans === 1 ? "" : "s"} left
                </span>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-800 bg-neutral-100/60 rounded-sm px-4 py-2 border border-neutral-200">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  {entitlement.subscription.questionsLeft} question{entitlement.subscription.questionsLeft === 1 ? "" : "s"} left per scan
                </span>
              </>
            )}
          </div>

          {/* SECTION 2: UPLOAD CARD */}
          <Card className={`border-dashed border-2 transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
              : "hover:bg-muted/30"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              if (e.currentTarget.contains(e.relatedTarget)) return;
              setIsDragging(false);
            }}
            onDrop={handleDrop}
          >
            <CardContent className="flex flex-col items-center justify-center space-y-6 py-10">

              <div className="flex flex-col items-center space-y-3 text-center">
                <Upload
                  className={`h-8 w-8 transition-all ${
                    isDragging ? "scale-125 text-blue-500" : "text-muted-foreground"
                  }`}
                />
                <p className="text-sm font-medium">
                  Drag & drop your contract here
                </p>
                <p className="text-xs text-muted-foreground">
                  or click on upload button
                </p>
              </div>

              {/* Hidden file input (connect later) */}
              <input
                type="file"
                ref={uploadFile}
                accept={ACCEPT_ATTR}
                className="hidden"
                onChange={handleFileChange}
              />

              <AnimatePresence>
                {selectFile ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-md rounded-lg border py-3 px-6 bg-neutral-200/60 relative"
                  >
                    <button
                      type="button"
                      className="absolute -top-[10px] right-4 text-white bg-red-700 rounded-full transition p-[3px] cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={handleCancel}
                    >
                      <X size={16} />
                    </button>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sem">
                          {selectFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(selectFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      {!loading ? (
                        <span className="text-green-600 text-sm">
                          ✓
                        </span>
                      ) :
                        (
                          <span className="text-blue-600 text-sm">
                            <Loader2 className="animate-spin"/>
                          </span>
                        )
                      }
                    </div>
                  </motion.div>
                ):(
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full max-w-md rounded-lg border py-3 px-6 bg-neutral-200/60 relative"
                    >
                      <div>
                        <p className="font-medium text-sem">
                          No file selected
                        </p>
                        <p className="text-xs text-muted-foreground">
                          0 MB
                        </p>
                      </div>
                    </motion.div>
                )}
              </AnimatePresence>
              
              <div className="text-xs text-muted-foreground">
                Supported formats: {ALLOWED_TYPES_LABEL}
              </div>

              <div className="mt-5 flex flex-col items-center justify-center gap-4 ">
                
                <Button variant="outline"
                  onClick={handleButtonClick}
                  disabled={selectFile !== null}
                >
                  {selectFile ? "Contract Uploaded" : "Upload Contract"}
                </Button>

                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <div className="text-sm font-semibold px-2 py-2">Which country applies?</div>
                    <Select
                      value={jurisdiction}
                      onValueChange={setJuristiction}
                    >
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {jurisdictions.map((country) => (
                          <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="text-sm font-semibold px-2 py-2">I am reviewing this contract as...</div>
                    <Select
                      value={reviewerRole}
                      onValueChange={setReviewerRole}
                    >
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="I am reviewing this contract as..." />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {entitlement && !canAnalyze ? (
                <div className="w-full max-w-xs text-center space-y-2 border border-dashed rounded-lg p-4">
                  <p className="text-sm font-medium">You've used your free scan</p>
                  <p className="text-xs text-muted-foreground">
                    Buy credits to analyze more contracts.
                  </p>
                  <Button onClick={() => router.push("/#pricing")} className="w-full">
                    View Pricing
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectFile || loading || !entitlement}
                  className="w-full max-w-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Contract"
                  )}
                </Button>
              )}
              
              <div className="text-xs text-muted-foreground text-center">
                <p>
                  Files are processed securely and deleted after analysis.
                </p>
                <p className="mt-2">
                  Takes approximately 30–60 seconds
                </p>
                
              </div>
              
            </CardContent>
          </Card>

          {/* SECTION 3: TRUST STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <div><ShieldCheck className="h-4 w-4" /></div>
              <span className="text-start">Files are processed securely and not saved</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div><Scale className="h-4 w-4" /></div>
              <span className="text-start">Informational analysis only, does not replace a lawyer</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div><Brain className="h-4 w-4" /></div>
              <span className="text-start">Analysis usually takes 30–60 seconds.</span>
            </div>
          </div>

          {/* SECTION 4: WHAT YOU’LL GET */}
          <div className="space-y-4 px-4">
            <h2 className="text-lg font-semibold">
              What you’ll get
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🚨 High-risk clauses that need attention</li>
              <li>⚠️ Overall contract risk level</li>
              <li>🧠 Plain-English clause explanations</li>
              <li>💡 Negotiation suggestions before signing</li>
            </ul>
          </div>

          {/* SECTION 5: HOW IT WORKS */}
          <div className="space-y-4 px-4">
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
    </ProtectedPage>
  );
}
