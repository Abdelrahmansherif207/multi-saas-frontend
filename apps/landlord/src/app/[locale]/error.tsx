'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Error({
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
        <div className="flex h-screen w-full items-center justify-center p-4 bg-muted/40">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Something went wrong!</CardTitle>
                    <CardDescription>
                        An unexpected error has occurred.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-md overflow-auto max-h-[200px]">
                        {error.message || "Unknown error occurred"}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={reset}>Try again</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
