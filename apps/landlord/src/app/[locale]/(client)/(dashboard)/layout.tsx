import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-4 py-8 flex items-start gap-8 min-h-[calc(100vh-200px)]">
            {/* Sidebar - Sticky on desktop */}
            <aside className="hidden md:block w-64 shrink-0 sticky top-32">
                <Sidebar />
            </aside>

            {/* Main Content Details */}
            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    );
}
