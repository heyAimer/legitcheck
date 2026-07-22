"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Download, Lock } from "lucide-react";
import AnalysisPDFDocument from "./AnalysisPDFDocument";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="rounded-xl">
        Preparing PDF...
      </Button>
    ),
  }
);

export default function DownloadAnalysisPDF({ analysis }) {
  if (!analysis?.isUnlocked) {
    return (
      <Button disabled variant="outline" className="rounded-xl">
        <Lock className="mr-2 h-4 w-4" />
        Unlock PDF Report
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<AnalysisPDFDocument analysis={analysis} />}
      fileName={`legitcheck-report-${analysis.analysisId || "contract"}.pdf`}
    >
      {({ loading, error }) => (
        <Button disabled={loading || !!error} className="rounded-xl">
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Preparing PDF..." : "Download PDF Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}