'use client';

import "../globals.css";
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background p-4 text-foreground">
                    <h2 className="text-2xl font-bold">Something went wrong!</h2>
                    <p className="text-muted-foreground">A critical error occurred.</p>
                    <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-md overflow-auto max-h-[200px] max-w-md">
                        {error.message || "Unknown error occurred"}
                    </div>
                    <Button onClick={() => reset()}>Try again</Button>
                </div>
            </body>
        </html>
    );
}
