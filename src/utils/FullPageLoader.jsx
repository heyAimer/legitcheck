'use client'

import Image from 'next/image';

export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 bg-background flex items-center justify-center">

            <div className="flex flex-col items-center gap-5">

                <Image
                    src="/iconLogo.png"
                    alt="LegitCheck"
                    width={64}
                    height={64}
                    priority
                    className="
                        animate-bounce
                    "
                />

                <div className="text-center">

                    <p className="text-lg font-medium">
                        One moment please...
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                        Checking your session
                    </p>

                </div>

            </div>

        </div>
    );
}