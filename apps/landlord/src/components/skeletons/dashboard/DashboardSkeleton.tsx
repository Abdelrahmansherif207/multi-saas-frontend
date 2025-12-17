import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardSkeleton() {
    return (
        <div className="pb-20">
            <div className="space-y-8">
                {/* Action Button Section */}
                <div className="flex justify-end">
                    <Skeleton className="h-10 w-40" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, index) => (
                        <Card key={index} className="border-0 shadow-md overflow-hidden">
                            <CardContent className="p-6 flex items-center gap-6">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-12" /> {/* Value */}
                                    <Skeleton className="h-5 w-24" /> {/* Label */}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Your Website Section */}
                <div className="space-y-4">
                    <Skeleton className="h-7 w-48 mx-auto md:mx-0" /> {/* Title */}
                    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                        {/* Table Header */}
                        <div className="border-b bg-muted/50 p-4 grid grid-cols-3 gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        {/* Table Body - Placeholder Row */}
                        <div className="p-6 flex justify-center">
                            <Skeleton className="h-5 w-40" />
                        </div>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="space-y-4">
                    <Skeleton className="h-7 w-48 mx-auto md:mx-0" /> {/* Title */}
                    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                        {/* Table Header */}
                        <div className="border-b bg-muted/50 p-4 flex gap-4 overflow-x-auto">
                            {[...Array(8)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-24 flex-shrink-0" />
                            ))}
                        </div>
                        {/* Table Body - Rows */}
                        <div className="divide-y divide-border">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="p-4 flex gap-4 overflow-x-auto">
                                    {[...Array(8)].map((__, i) => (
                                        <Skeleton key={i} className="h-5 w-24 flex-shrink-0" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
