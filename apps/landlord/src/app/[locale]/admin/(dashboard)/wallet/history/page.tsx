import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTranslations } from "next-intl/server";

export default async function WalletHistoryPage() {
    const t = await getTranslations("Admin.WalletManage.History");
    const tMenu = await getTranslations("Admin.WalletManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("history"), href: "/admin/wallet/history" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("subtitle")}</h2>

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
                                <TableHead className="font-semibold text-foreground">{t("table.no")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.user_details")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.payment_gateway")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.payment_status")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.amount")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.manual_payment_image")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground bg-muted/5">
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
