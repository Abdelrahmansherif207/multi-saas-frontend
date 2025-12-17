import { Skeleton } from "@/components/ui/skeleton";

export function TicketsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Pages Header Skeleton Copy */}
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

            <div className="p-6 space-y-6">
                <div className="flex justify-start">
                    <Skeleton className="h-10 w-32" />
                </div>

                {/* Table Skeleton */}
                <div className="rounded-md border bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="w-full">
                            <div className="bg-muted/50 border-b p-4 flex gap-4">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="divide-y divide-border">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="p-4 flex gap-4 items-center">
                                        <Skeleton className="h-4 w-20" />
                                        <div className="flex flex-col gap-1 w-full max-w-xs">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <Skeleton className="h-6 w-24 rounded-md" />
                                        <Skeleton className="h-6 w-24 rounded-md" />
                                        <div className="ml-auto">
                                            <Skeleton className="h-8 w-8 rounded-md" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
