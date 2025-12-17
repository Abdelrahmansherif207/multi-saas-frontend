import { Skeleton } from "@/components/ui/skeleton";

export function TemplatesSkeleton() {
    return (
        <main className="min-h-screen">
            {/* Pages Header Skeleton */}
            <div className="bg-muted/10">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Skeleton className="h-10 w-48" />
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-4 pb-24">
                {/* Secondary Heading Skeleton */}
                <div className="flex flex-col items-center text-center mb-12 space-y-2 pt-12">
                    <Skeleton className="h-12 w-96 md:w-[500px]" />
                </div>

                {/* Search and Filter Skeleton */}
                <div className="max-w-4xl mx-auto mb-16 space-y-8">
                    {/* Search Bar */}
                    <Skeleton className="w-full h-14 rounded-2xl" />

                    {/* Category Tags */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-24 rounded-full" />
                        ))}
                    </div>
                </div>

                {/* Results Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="rounded-xl border overflow-hidden space-y-3 p-4">
                            <Skeleton className="w-full aspect-video rounded-lg" />
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <Skeleton className="h-10 w-full rounded-md mt-4" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
