import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

export default function EmptyAnalysisState() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
      <Card className="max-w-md w-full">
        <CardContent className="py-10 text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <FileSearch className="h-7 w-7 text-primary" />
          </div>

          <h2 className="text-xl font-semibold">
            No analysis found
          </h2>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            You haven't analyzed any contracts yet.
            Upload a contract to receive a detailed risk report,
            clause explanations, and negotiation suggestions.
          </p>

          <div className="flex justify-center py-10">
            <Link href="/upload">
              <Button className="">
                Upload Contract
              </Button>
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}