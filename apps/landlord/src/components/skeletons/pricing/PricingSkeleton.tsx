import { Skeleton } from "@/components/ui/skeleton";

export function PricingSkeleton() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
            {/* Header Skeleton */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <Skeleton className="h-10 w-64 md:w-96" />
            </div>

            {/* Pricing Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col p-8 rounded-3xl border h-[600px] justify-between"
                    >
                        <div>
                            {/* Plan Name */}
                            <Skeleton className="h-8 w-32 mb-4" />

                            {/* Price */}
                            <div className="flex items-baseline mb-6">
                                <Skeleton className="h-12 w-24" />
                                <Skeleton className="h-4 w-12 ml-2" />
                            </div>

                            {/* Description */}
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-8" />

                            {/* Features */}
                            <div className="space-y-4 mb-8">
                                {[...Array(8)].map((__, i) => (
                                    <div key={i} className="flex items-center">
                                        <Skeleton className="w-5 h-5 rounded-full mr-3" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Button & Link */}
                        <div className="space-y-6">
                            <Skeleton className="h-4 w-24 mx-auto" />
                            <Skeleton className="w-full h-14 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
