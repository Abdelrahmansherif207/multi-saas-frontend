import { AdminPageHeader } from "./AdminPageHeader";
import { AdminPageFooter } from "./AdminPageFooter";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AdminPageWrapperProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    children: React.ReactNode;
}

export function AdminPageWrapper({ title, breadcrumbs, children }: AdminPageWrapperProps) {
    return (
        <div className="flex flex-col min-h-full flex-1">
            <AdminPageHeader title={title} breadcrumbs={breadcrumbs} />
            <div className="h-px bg-border/40 mb-6" />

            <div className="flex-1 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-8">
                {children}
            </div>

            <AdminPageFooter />
        </div>
    );
}
