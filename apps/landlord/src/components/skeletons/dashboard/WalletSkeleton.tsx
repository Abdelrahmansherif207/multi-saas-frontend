import { Skeleton } from "@/components/ui/skeleton";

export function WalletSkeleton() {
    return (
        <div className="space-y-8 p-6">
            {/* Balance Card Skeleton */}
            <div className="rounded-xl p-8 shadow-lg flex items-center justify-between border h-[128px]">
                <div className="flex items-center gap-6">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-32" /> {/* Balance */}
                        <Skeleton className="h-6 w-24" />  {/* Label */}
                    </div>
                </div>
            </div>

            {/* Wallet History Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" /> {/* Title */}
                        <Skeleton className="h-4 w-64" /> {/* Desc */}
                    </div>
                    <Skeleton className="h-10 w-36" /> {/* Deposit Button */}
                </div>

                {/* Table Skeleton */}
                <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="border-b bg-muted/50 p-4 flex gap-4 overflow-x-auto">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-20 flex-shrink-0" />
                        ))}
                    </div>
                    {/* Table Body - Rows */}
                    <div className="divide-y divide-border">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="p-4 flex gap-4 overflow-x-auto">
                                <Skeleton className="h-5 w-24 flex-shrink-0" /> {/* ID */}
                                <Skeleton className="h-5 w-20 flex-shrink-0" /> {/* Gateway */}
                                <Skeleton className="h-5 w-24 flex-shrink-0" /> {/* Status */}
                                <Skeleton className="h-5 w-20 flex-shrink-0" /> {/* Amount */}
                                <Skeleton className="h-5 w-24 flex-shrink-0" /> {/* Date */}
                                <Skeleton className="h-5 w-10 flex-shrink-0" /> {/* Image */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
