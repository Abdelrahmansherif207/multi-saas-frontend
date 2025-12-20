import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/admin/sidebar-context";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden bg-[#fafafa] dark:bg-background">
                <AdminSidebar />
                <div className="flex flex-1 flex-col overflow-hidden relative">
                    <AdminHeader />
                    <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 pt-0 m-4 bg-card/60 backdrop-blur-xl border border-white/20 shadow-sm dark:shadow-primary/5 dark:border-white/5 rounded-2xl relative">
                        <div className="w-full min-h-full flex flex-col">
                            {/* Content wrapper for better centering if needed */}
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
