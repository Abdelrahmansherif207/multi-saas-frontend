import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-9 w-24" />
            </div>
            <Card>
                <CardHeader className="border-b p-4">
                    <div className="flex gap-4">
                        <Skeleton className="h-8 w-full max-w-sm" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="space-y-6 p-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-3 w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
