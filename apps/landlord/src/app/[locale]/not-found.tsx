import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-4 bg-muted/40">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">404</CardTitle>
                    <CardTitle className="text-xl">Page Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        The page you are looking for does not exist or has been moved.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
