import { Skeleton } from "@/components/ui/skeleton";

export function ContactSkeleton() {
    return (
        <main className="min-h-screen">
            {/* Pages Header Skeleton */}
            <div className="bg-muted/10">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Skeleton className="h-10 w-32" />
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-12" />
                        </div>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-4 py-16 md:py-24">
                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 rounded-3xl border space-y-6">
                            <Skeleton className="w-16 h-16 rounded-2xl" />
                            <Skeleton className="h-6 w-32" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 pb-16 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Map Skeleton */}
                    <Skeleton className="w-full h-[400px] lg:h-auto min-h-[400px] rounded-3xl" />

                    {/* Form Skeleton */}
                    <div className="space-y-8">
                        <Skeleton className="h-10 w-48" />
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-[150px] w-full rounded-md" />
                            </div>
                            <Skeleton className="h-12 w-40 rounded-md" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
