import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTranslations } from "next-intl/server";

export default async function WebsiteIssuesPage() {
    const t = await getTranslations("Admin.WebsiteManage.Issues");
    const tMenu = await getTranslations("Admin.WebsiteManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("issues"), href: "/admin/websites/issues" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("subtitle")}</h2>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-600 dark:text-blue-400 text-sm">
                        {t("info_text")}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Show</span>
                            <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
                            <span>entries</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Search:</span>
                            <Input className="h-9 w-[200px]" placeholder="" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="font-semibold text-foreground">{t("table.issue_id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.user_id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.user_name")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.issue_type")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.subdomain")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.domain_status")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground bg-muted/5">
                                    {t("table.no_data")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing 0 to 0 of 0 entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
