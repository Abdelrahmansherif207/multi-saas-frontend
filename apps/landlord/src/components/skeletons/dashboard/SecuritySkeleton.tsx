import { Skeleton } from "@/components/ui/skeleton";

export function SecuritySkeleton() {
    return (
        <div className="space-y-8 p-6 max-w-4xl">
            <Skeleton className="h-8 w-64" />

            <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-full max-w-xl" />
            </div>

            <div className="space-y-4">
                <Skeleton className="h-6 w-48" />

                {/* QR Code Placeholder */}
                <div className="p-4 bg-white border rounded-md inline-block">
                    <Skeleton className="w-48 h-48 rounded" />
                </div>
            </div>

            <div className="space-y-4 max-w-md">
                <Skeleton className="h-6 w-48" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>

            <Skeleton className="h-10 w-32 rounded-md" />
        </div>
    );
}
