import { Button } from "@repo/ui/button";
import { headers } from "next/headers";

export default async function Home() {
    const headersList = await headers();
    const host = headersList.get('host') || 'unknown';

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-4 p-8 border rounded-xl shadow-sm bg-card">
                <div className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mb-4">
                    ROOT LANDING PAGE
                </div>
                <h1 className="text-4xl font-bold">Tenant Portal</h1>
                <p className="text-muted-foreground">Welcome to the root storefront hosting domain.</p>

                <div className="mt-8 pt-8 border-t text-left">
                    <p className="text-sm font-semibold mb-2">Debug Info:</p>
                    <code className="text-xs block bg-muted p-3 rounded">
                        Host: {host}<br />
                        Env Root: {process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'not set'}
                    </code>
                    <p className="text-xs text-muted-foreground mt-2">
                        If you are seeing this on a subdomain (e.g. karim123.localhost:3001),
                        then your middleware rewrite is not working.
                    </p>
                </div>
            </div>
        </div>
    );
}
