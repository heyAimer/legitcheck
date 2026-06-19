'use client'

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';

export default function Contact() {
    return (
        <main className="min-h-screen px-6 py-16">
            <div className="mx-auto max-w-3xl">

                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-semibold tracking-tight">
                        Contact Us
                    </h1>

                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                        Questions, bug reports, partnership inquiries, or feedback —
                        we'd love to hear from you.
                    </p>
                </div>


                <Card>
                    <CardContent className="p-8 space-y-8">

                        {/* Email */}

                        <div className="flex gap-4">
                            <div className="rounded-md bg-primary/10 p-3 h-fit">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Email
                                </h3>

                                <p className="text-muted-foreground text-sm mt-1">
                                    For support, questions, or legal concerns.
                                </p>

                                <a
                                    href="mailto:risingdevs01@gmail.com"
                                    className="
                                        text-primary
                                        text-sm
                                        hover:underline
                                        mt-2
                                        inline-block
                                    "
                                >
                                    Contact support →
                                </a>
                            </div>
                        </div>



                        {/* Founder */}

                        <div className="flex gap-4">
                            <div className="rounded-md bg-primary/10 p-3 h-fit">
                                <MessageCircle className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Built by Rising Devs
                                </h3>

                                <p className="text-muted-foreground text-sm mt-1">
                                    LegitCheck is being built to help freelancers,
                                    agencies, and creators understand contracts
                                    before signing.
                                </p>
                            </div>
                        </div>



                        {/* CTA */}

                        <div className="pt-4 border-t">

                            <Link
                                href="/"
                            >
                                <Button className="gap-2">
                                    Back to Homepage
                                    <ArrowRight className="h-4 w-4"/>
                                </Button>
                            </Link>

                        </div>

                    </CardContent>
                </Card>



                {/* Footer */}

                <p className="
                    text-center
                    text-xs
                    text-muted-foreground
                    mt-8
                ">
                    We usually respond within 1–2 business days.
                </p>

            </div>
        </main>
    );
}