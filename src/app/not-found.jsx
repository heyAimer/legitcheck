// app/not-found.jsx

import Link from "next/link";
import { FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100vh-150px)] items-center justify-center px-6">

            <div className="max-w-md text-center">

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <FileWarning className="h-8 w-8 text-primary" />
                </div>

                <h1 className="text-4xl font-bold">
                    404
                </h1>

                <h2 className="mt-2 text-2xl font-semibold">
                    Page not found
                </h2>

                <p className="mt-4 text-muted-foreground">
                    The page you're looking for doesn't exist,
                    may have been moved, or the URL was typed incorrectly.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Link href="/">
                        <Button className="border-2 border-primary">
                            Go Home
                        </Button>
                    </Link>

                    <Link href="/signin">
                        <Button variant="outline">
                            Sign in
                        </Button>
                    </Link>
                </div>

            </div>

        </div>
    );
}