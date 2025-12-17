import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
    return (
        <div className="flex flex-col gap-8 pb-20">

            {/* Hero Section Skeleton */}
            <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-3/4" /> {/* Title Line 1 */}
                            <Skeleton className="h-16 w-2/3" /> {/* Title Line 2 */}
                            <Skeleton className="h-16 w-1/2" /> {/* Title Line 3 + Icon */}
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-full max-w-[600px]" />
                            <Skeleton className="h-6 w-5/6 max-w-[600px]" />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <Skeleton className="h-12 w-full sm:w-40 rounded-md" /> {/* Button */}
                            <Skeleton className="h-6 w-32" /> {/* Trial text */}
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className="w-full aspect-square lg:aspect-[4/3]">
                        <Skeleton className="w-full h-full rounded-2xl" />
                    </div>
                </div>
            </section>

            {/* Company Logos Skeleton */}
            <section className="container mx-auto px-4">
                <div className="flex justify-between gap-8 overflow-hidden opacity-50">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-32 rounded-lg flex-shrink-0" />
                    ))}
                </div>
            </section>

            {/* Features Section Skeleton */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center gap-4 mb-16">
                    <Skeleton className="h-4 w-32" /> {/* Subtitle */}
                    <Skeleton className="h-10 w-64 md:w-96" /> {/* Title */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="p-8 rounded-3xl border space-y-6 h-[280px]">
                            <Skeleton className="w-14 h-14 rounded-2xl" />
                            <Skeleton className="h-8 w-1/2" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
