import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";

export default function UserDetailsLoading() {
    return (
        <AdminPageWrapper
            title="..."
            breadcrumbs={[
                { label: "User Manage", href: "#" },
                { label: "All Users", href: "#" },
                { label: "Loading...", href: "#" }
            ]}
        >
            <div className="space-y-6 animate-pulse">
                {/* Back Button Skeleton */}
                <div className="h-9 w-32 bg-muted/50 rounded-lg" />

                {/* Info Cards Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                            <div className="h-6 w-40 bg-muted/50 rounded mb-4" />
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5, 6].map((j) => (
                                    <div key={j} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                                        <div className="h-4 w-24 bg-muted/50 rounded" />
                                        <div className="h-4 w-32 bg-muted/50 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dates Skeleton */}
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                    <div className="flex flex-wrap gap-8">
                        <div className="h-4 w-48 bg-muted/50 rounded" />
                        <div className="h-4 w-48 bg-muted/50 rounded" />
                    </div>
                </div>

                {/* Tenants Skeleton */}
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                    <div className="h-6 w-40 bg-muted/50 rounded mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-xl border border-border/40 bg-background/50 p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-muted/50" />
                                        <div className="h-4 w-20 bg-muted/50 rounded" />
                                    </div>
                                    <div className="h-5 w-16 bg-muted/50 rounded-full" />
                                </div>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4].map((j) => (
                                        <div key={j} className="flex justify-between">
                                            <div className="h-3 w-16 bg-muted/50 rounded" />
                                            <div className="h-3 w-20 bg-muted/50 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
