import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Eye } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PaymentLogsPage() {
    const t = await getTranslations("Admin.PackageOrderManage.PaymentLogs");
    const tMenu = await getTranslations("Admin.PackageOrderManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("title"), href: "/admin/package-orders/payment-logs" }
            ]}
        >
            <div className="space-y-6">
                {/* Bulk Actions and Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Select defaultValue="bulk">
                            <SelectTrigger className="w-[180px] h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary">
                                <SelectValue placeholder={t("bulk_action")} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/40">
                                <SelectItem value="bulk">{t("bulk_action")}</SelectItem>
                                <SelectItem value="delete">Delete</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 h-10 font-semibold transition-all duration-300 transform hover:translate-y-[-1px]">
                            {t("apply")}
                        </Button>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
                </div>

                {/* Table Container */}
                <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="w-[50px]">
                                    <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                </TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.payer_name")}</TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.payer_email")}</TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.package_name")}</TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.amount")}</TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.package_gateway")}</TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.payment_status")}</TableHead>
                                <TableHead className="font-semibold text-foreground whitespace-nowrap">{t("table.date")}</TableHead>
                                <TableHead className="font-semibold text-foreground text-right">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Mock Data Row */}
                            <TableRow className="hover:bg-muted/20 border-b-border/40">
                                <TableCell>
                                    <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                </TableCell>
                                <TableCell>1</TableCell>
                                <TableCell className="font-medium whitespace-nowrap">John Doe</TableCell>
                                <TableCell className="whitespace-nowrap">john@example.com</TableCell>
                                <TableCell className="whitespace-nowrap">Premium Monthly</TableCell>
                                <TableCell className="font-bold">$99.00</TableCell>
                                <TableCell>Stripe</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-lg px-3 py-1 text-[11px] font-bold">
                                        COMPLETED
                                    </Badge>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">2025-12-22</TableCell>
                                <TableCell className="text-right">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-primary hover:text-primary hover:bg-primary/10" title="View Details">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
