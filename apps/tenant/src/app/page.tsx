import { Button } from "@repo/ui/button";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Tenant Portal</h1>
                <p className="text-muted-foreground">Welcome to your storefront</p>
                <Button variant="outline">Browse Products</Button>
            </div>
        </div>
    );
}
