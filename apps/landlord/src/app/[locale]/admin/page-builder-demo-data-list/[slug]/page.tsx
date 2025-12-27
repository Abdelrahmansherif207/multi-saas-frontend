import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { DemoDataTable } from "./DemoDataTable";

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations("Admin.PackageOrderManage.AllOrders");

    return (
        <AdminPageWrapper title={slug} breadcrumbs={[
            { label: "Donation Home Page", href: "/admin/page-builder-demo-data-list" },
            { label: slug, href: "/admin/page-builder-demo-data-list/" + slug },
        ]}>
            <div className="space-y-6">
                {/* Filters and Actions Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex flex-wrap justify-between gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">Show</span>
                            <Input className="w-16 h-10 text-center rounded-xl bg-card border-border/40" defaultValue="10" type="number" />
                            <span className="text-sm text-muted-foreground whitespace-nowrap">entries</span>
                        </div>

                        <div className="relative flex-1 lg:flex-none min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                className="h-10 pl-9 rounded-xl bg-card border-border/40 w-full"
                                placeholder={t("search")}
                            />
                        </div>
                    </div>
                </div>

                {/* Table with Edit Modal */}
                <DemoDataTable />

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-sm text-muted-foreground">
                    <p>Showing 1 to 1 of 1 entries</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50" disabled>
                            Previous
                        </Button>
                        <Button variant="default" size="sm" className="rounded-xl h-9 w-9 bg-primary hover:bg-primary/90">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50" disabled>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    )
}
