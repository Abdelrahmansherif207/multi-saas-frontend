import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function WalletSettingsSkeleton() {
    return (
        <div className="space-y-8 p-6">
            {/* Balance Card Skeleton */}
            <Card className="bg-foreground text-background dark:bg-card dark:text-card-foreground p-6 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full bg-muted/20" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32 bg-muted/20" />
                        <Skeleton className="h-4 w-24 bg-muted/20" />
                    </div>
                </div>
            </Card>

            {/* Settings Form Skeleton */}
            <div className="space-y-8">
                <Skeleton className="h-8 w-48" />

                <div className="space-y-6 max-w-lg">
                    {/* Package Renewal */}
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-4 w-32" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-11 rounded-full" />
                            <Skeleton className="h-3 w-10" />
                        </div>
                    </div>

                    {/* Balance Alert */}
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-4 w-32" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-11 rounded-full" />
                            <Skeleton className="h-3 w-10" />
                        </div>
                    </div>

                    {/* Minimum Amount Input */}
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>

                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
            </div>
        </div>
    );
}
