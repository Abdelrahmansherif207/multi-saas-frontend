import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export function BlogsSkeleton() {
    return (
        <>
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

            <div className="container mx-auto px-4 py-10 md:py-15 lg:py-20">
                <div className="flex flex-col gap-8">
                    {/* Search Card Skeleton */}
                    <div className="w-full rounded-xl border p-6 space-y-4">
                        <Skeleton className="h-8 w-48" />
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>

                    {/* Blogs Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="sm:mt-5 overflow-hidden">
                                <CardHeader className="flex gap-3">
                                    <Skeleton className="w-full aspect-video rounded-lg" />
                                    <div className="flex gap-3 p-3">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-6 w-full" />
                                </CardHeader>
                                <CardFooter>
                                    <Skeleton className="h-4 w-24" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
