"use client";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ShieldCheck, Scale, Brain, X, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jurisdictions } from "@/utils/CountryNames";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UploadContractPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectFile, setSelectFile] = useState(null);

  const [jurisdiction, setJuristiction] = useState("india");

  const uploadContract = async (file) => {
    if (!file) return;

    setSelectFile(file);
    setLoading(true);

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("location", jurisdiction);

    try {
      const res = await axios.post(`${BASE_URL}/scan`, formdata, {
        withCredentials: true,
      });
      console.log("File uploaded successfully:", res);

      if (res.data.status === "Success") {
        toast.success(res.data.message);
        router.push(`/analysis`);
      }
      //window.location.href = `/analysis/${res.data.id}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      setSelectFile(null);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange= (e) => {
    const file = e.target.files?.[0];
    console.log(file)
    uploadContract(file);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (!file) return;
    uploadContract(file);
  }

  const uploadFile = useRef(null);

  const handleButtonClick = () => {
    uploadFile.current.click();
  }

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
              accept=".pdf,.doc,.docx,.txt"
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
                    onClick={() => {
                      setSelectFile(null);
                      uploadFile.current.value = ""; // clears hidden input
                    }}
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
              Supported formats: PDF, DOC, DOCX, TXT
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
              
              <Button variant="outline"
                onClick={handleButtonClick}
                disabled={selectFile !== null}
              >
                {selectFile ? "Contract Uploaded" : "Upload Contract"}
              </Button>
              
              <div>
                <Select
                  value={jurisdiction}
                  onValueChange={setJuristiction}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {jurisdictions.map((country) => (
                      <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
          
            </div>

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
            <ShieldCheck className="h-4 w-4" />
            <span>Contracts are processed securely and not saved</span>
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
            <li>🚨 High-risk clauses that need attention</li>
            <li>⚠️ Overall contract risk level</li>
            <li>🧠 Plain-English clause explanations</li>
            <li>💡 Negotiation suggestions before signing</li>
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
