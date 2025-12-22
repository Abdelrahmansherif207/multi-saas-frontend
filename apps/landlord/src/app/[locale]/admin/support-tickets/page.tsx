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
import { Eye, Trash2, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function AllTicketsPage() {
    const t = await getTranslations("Admin.SupportTicketManage.AllTickets");
    const tMenu = await getTranslations("Admin.SupportTicketManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("subtitle"), href: "/admin/support-tickets" }
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
                                <SelectItem value="delete">Delete</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-[180px] h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary">
                                <SelectValue placeholder={t("filterByPriority")} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/40">
                                <SelectItem value="all">All Priorities</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-10 font-semibold transition-all duration-300">
                            {t("apply")}
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t("search")}
                                className="h-10 pl-4 pr-10 rounded-xl bg-background/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-[250px] transition-all"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                        </div>
                        <Link href="/admin/support-tickets/create">
                            <Button className="bg-primary hover:bg-primary/90 rounded-xl h-10 font-semibold flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                {t("new_ticket")}
                            </Button>
                        </Link>
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
                                <TableHead className="font-semibold text-foreground">{t("table.title")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.department")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.user")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.priority")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                                <TableHead className="font-semibold text-foreground text-right">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Mock Data */}
                            <TableRow className="hover:bg-muted/20 border-b-border/40">
                                <TableCell>
                                    <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                </TableCell>
                                <TableCell>#1</TableCell>
                                <TableCell className="font-medium">Login Issue</TableCell>
                                <TableCell>Support</TableCell>
                                <TableCell>abdelrahman</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Select defaultValue="low">
                                            <SelectTrigger className="h-8 w-[100px] rounded-lg bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[11px] font-bold">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-border/40">
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="urgent">Urgent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Select defaultValue="close">
                                        <SelectTrigger className={cn(
                                            "h-8 w-[100px] rounded-lg text-[11px] font-bold border-none ring-1 transition-all",
                                            "bg-red-500/10 text-red-600 ring-red-500/20 hover:ring-red-500/40"
                                        )}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/40">
                                            <SelectItem value="open" className="text-emerald-600 focus:text-emerald-700">Open</SelectItem>
                                            <SelectItem value="pending" className="text-amber-600 focus:text-amber-700">Pending</SelectItem>
                                            <SelectItem value="close" className="text-red-600 focus:text-red-700">Close</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-primary hover:text-primary hover:bg-primary/10">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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
