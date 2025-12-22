import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationStatus = "read" | "unread";
type NotificationType = "trial" | "new_subscription" | "user_registration" | "package_renew";

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    status: NotificationStatus;
    views: number;
    date: string;
}

const dummyNotifications: Notification[] = [
    { id: "22", type: "trial", title: "Database and domain create failed on trial", status: "read", views: 22, date: "Dec,2025 20" },
    { id: "21", type: "new_subscription", title: "New subscription plan taken", status: "read", views: 21, date: "Dec,2025 20" },
    { id: "20", type: "user_registration", title: "1. New user registered", status: "unread", views: 20, date: "Dec,2025 16" },
    { id: "19", type: "user_registration", title: "1. New user registered", status: "unread", views: 19, date: "Dec,2025 14" },
    { id: "18", type: "user_registration", title: "1. New user registered", status: "unread", views: 18, date: "Dec,2025 07" },
    { id: "17", type: "user_registration", title: "1. New user registered", status: "unread", views: 17, date: "Sep,2025 23" },
    { id: "16", type: "user_registration", title: "1. New user registered", status: "unread", views: 16, date: "Sep,2025 06" },
    { id: "15", type: "package_renew", title: "Package subscription renewed", status: "unread", views: 15, date: "Sep,2025 02" },
    { id: "14", type: "new_subscription", title: "New subscription plan taken", status: "unread", views: 14, date: "Sep,2025 01" },
    { id: "13", type: "user_registration", title: "1. New user registered", status: "unread", views: 13, date: "Aug,2025 07" },
];

export default function NotificationsPage() {
    const t = useTranslations("Admin.Notifications.All");
    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.notifications"), href: "/admin/notifications" },
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("table_title")}</h2>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="hidden sm:flex gap-2">
                            <Button variant="secondary" size="sm">{t("filter.all")}</Button>
                            <Button variant="outline" size="sm">{t("filter.read")}</Button>
                            <Button variant="outline" size="sm">{t("filter.unread")}</Button>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{t("pagination.show")}</span>
                            <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
                            <span>{t("pagination.entries")}</span>
                        </div>

                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm font-medium">{t("search_label")}</span>
                            <Input className="h-9 w-[200px]" placeholder={t("search_placeholder")} />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                    <TableHead className="w-[110px] font-semibold text-foreground">{t("table.actions")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.date")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.type")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.notification_title")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.count")}</TableHead>
                                    <TableHead className="w-[60px] text-right font-semibold text-foreground">{t("table.select")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dummyNotifications.map((n) => (
                                    <TableRow key={n.id} className="hover:bg-muted/20 border-b-border/40">
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="destructive" size="sm" className="h-8 px-2">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                                <Button variant="secondary" size="sm" className="h-8 px-2">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{n.date}</TableCell>
                                        <TableCell className="capitalize">
                                            {t(`types.${n.type}`)}
                                        </TableCell>
                                        <TableCell className="font-medium">{n.title}</TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    n.status === "read"
                                                        ? "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
                                                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                )}
                                            >
                                                {t(`statuses.${n.status}`)}
                                            </span>
                                        </TableCell>
                                        <TableCell>{n.views}</TableCell>
                                        <TableCell className="text-right">
                                            <Checkbox aria-label={`select-${n.id}`} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex items-center justify-between text-sm text-muted-foreground p-4">
                            <div>
                                {t("pagination.showing", {
                                    from: 1,
                                    to: dummyNotifications.length,
                                    total: dummyNotifications.length,
                                })}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>{t("pagination.previous")}</Button>
                                <Button variant="outline" size="sm" disabled>{t("pagination.next")}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}