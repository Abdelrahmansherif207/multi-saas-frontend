import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ProfileSkeleton() {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="grid gap-5">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-3">
                <Skeleton className="h-10 w-full sm:w-32" />
            </CardFooter>
        </Card>
    );
}
