import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Trash2,
    Edit,
    Eye,
    Mail,
    FileText,
    Search,
    Filter
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default async function PackageOrdersPage() {
    const t = await getTranslations("Admin.PackageOrderManage.AllOrders");
    const tMenu = await getTranslations("Admin.PackageOrderManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_order"), href: "/admin/package-orders" }
            ]}
        >
            <div className="space-y-6">
                {/* Filters and Actions Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <Select>
                            <SelectTrigger className="w-[150px] h-10 rounded-xl bg-card border-border/40">
                                <SelectValue placeholder={t("bulk_action")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="delete">Delete</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="default" className="bg-primary hover:bg-primary/90 h-10 rounded-xl px-6">
                            {t("apply")}
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">Show</span>
                            <Input className="w-16 h-10 text-center rounded-xl bg-card border-border/40" defaultValue="10" type="number" />
                            <span className="text-sm text-muted-foreground whitespace-nowrap">entries</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[150px] h-10 rounded-xl bg-card border-border/40">
                                    <SelectValue placeholder={t("all_order_filter")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t("all_order_filter")}</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="default" className="bg-primary hover:bg-primary/90 h-10 rounded-xl px-6">
                                {t("filter")}
                            </Button>
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

                {/* Table */}
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                    <TableHead className="w-[50px]">
                                        <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.id")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.package_name")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.paid_amount")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.subdomain")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.payment_status")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.order_status")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.renew_taken")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.start_date")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.expire_date")}</TableHead>
                                    <TableHead className="font-semibold text-foreground text-center">{t("table.action")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* Mock Row based on image */}
                                <TableRow className="hover:bg-muted/20 border-b-border/40">
                                    <TableCell>
                                        <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                    </TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell className="font-medium">Premium Monthly</TableCell>
                                    <TableCell>$0</TableCell>
                                    <TableCell>test</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-full font-medium">
                                            Complete
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-full font-medium">
                                            Complete
                                        </Badge>
                                    </TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell className="text-muted-foreground">17-12-2025</TableCell>
                                    <TableCell className="text-muted-foreground">17-01-2026</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="Resend Email">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" title="View Details">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="default"
                                                className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20 rounded-xl px-5 font-medium transition-all duration-300 transform hover:translate-y-[-1px]"
                                            >
                                                Invoice
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

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
    );
}
