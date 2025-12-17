import { Skeleton } from "@/components/ui/skeleton";

export function PaymentsSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Header Row Skeleton */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b">
                <div className="col-span-8"><Skeleton className="h-4 w-24" /></div>
                <div className="col-span-2"><Skeleton className="h-4 w-16" /></div>
                <div className="col-span-2 text-right"><Skeleton className="h-4 w-16 ml-auto" /></div>
            </div>

            {/* Logs List Skeleton */}
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-card border rounded-lg p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6"
                    >
                        {/* Column 1: Order Info */}
                        <div className="md:col-span-8 space-y-4">
                            <div>
                                <Skeleton className="h-6 w-64 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>

                            <div className="space-y-1">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-36" />
                                <div className="flex gap-2 items-center">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-5 w-20 rounded" />
                                </div>
                                <Skeleton className="h-4 w-56" />
                                <Skeleton className="h-4 w-56" />
                            </div>

                            <Skeleton className="h-8 w-32" />
                        </div>

                        {/* Column 2: Status & Pay Now */}
                        <div className="md:col-span-2 flex flex-col items-start gap-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-20 rounded-md" />
                                <Skeleton className="h-7 w-20 rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
