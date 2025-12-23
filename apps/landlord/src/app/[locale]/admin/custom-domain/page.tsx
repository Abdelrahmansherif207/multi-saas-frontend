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
import { Check, X } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PendingRequestsPage() {
    const t = await getTranslations("Admin.CustomDomain.PendingRequests");
    const tMenu = await getTranslations("Admin.CustomDomain.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("pending_requests"), href: "/admin/custom-domain" }
            ]}
        >
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3">
                        <Select defaultValue="bulk">
                            <SelectTrigger className="w-[180px] h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary">
                                <SelectValue placeholder={t("bulk_action")} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/40">
                                <SelectItem value="bulk">{t("bulk_action")}</SelectItem>
                                <SelectItem value="approve">Approve</SelectItem>
                                <SelectItem value="reject">Reject</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-10 font-semibold transition-all duration-300">
                            {t("apply")}
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{t("show")}</span>
                            <Select defaultValue="10">
                                <SelectTrigger className="w-[70px] h-9 rounded-lg bg-background/50 border-border/40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg border-border/40">
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>{t("entries")}</span>
                        </div>
                        <div className="relative">
                            <span className="text-sm text-muted-foreground mr-2">{t("search")}</span>
                            <input
                                type="text"
                                className="h-9 pl-3 pr-3 rounded-lg bg-background/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-[180px] transition-all text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="w-[50px]">
                                    <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                </TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.username")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.current_domain")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.requested_domain")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.date")}</TableHead>
                                <TableHead className="font-semibold text-foreground text-right">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    {t("no_data")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-sm text-muted-foreground">
                    <p>Showing 0 to 0 of 0 entries</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50" disabled>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50" disabled>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
