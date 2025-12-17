import { Skeleton } from "@/components/ui/skeleton";

export function AboutSkeleton() {
    return (
        <main className="min-h-screen">
            {/* Pages Header Skeleton */}
            <div className="bg-muted/10">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Skeleton className="h-10 w-48" />
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-4 py-8 pb-24">
                <div className="flex flex-col items-start text-left space-y-12 mx-auto">

                    {/* Title */}
                    <Skeleton className="h-12 w-96 max-w-full" />

                    {/* Text Blocks */}
                    <div className="space-y-6 w-full">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full mt-4" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* Illustration */}
                    <div className="w-full max-w-5xl aspect-[16/9] my-8 self-center">
                        <Skeleton className="w-full h-full rounded-lg" />
                    </div>

                    {/* Footer Text */}
                    <Skeleton className="h-4 w-full" />
                </div>
            </section>

            {/* Stats Section Skeleton (Placeholder) */}
            <div className="py-16 bg-muted/5">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <Skeleton className="h-16 w-16 mb-2" />
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
