import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

type ActivityLog = {
    id: string;
    userAgent: string;
    content: string;
    sl: number;
};

const dummyLogs: ActivityLog[] = [
    {
        id: "1",
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        content:
            "Kareem Ahmed Saad login • 197.39.19.192 • time: Dec,2025 20, 09:31 PM",
        sl: 1,
    },
    {
        id: "2",
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        content:
            "Kareem Ahmed Saad logout • 197.39.19.192 • time: Dec,2025 20, 09:37 PM",
        sl: 2,
    },
    {
        id: "3",
        userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        content:
            "Kareem Ahmed Saad created PaymentLog • 197.39.19.192 • time: Dec,2025 20, 09:59 PM",
        sl: 3,
    },
];

export default function UserActivityLogPage() {
    const t = useTranslations("Admin.Notifications.UserActivity");
    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.notifications"), href: "/admin/notifications" },
                { label: t("breadcrumbs.user_activity"), href: "/admin/notifications/user-activity-log" },
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="destructive" size="sm">{t("clear_all")}</Button>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{t("pagination.show")}</span>
                            <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
                            <span>{t("pagination.entries")}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm font-medium">{t("search_label")}</span>
                            <Input className="h-9 w-[220px]" placeholder="" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                    <TableHead className="w-[90px] font-semibold text-foreground">{t("table.actions")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.log")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.content")}</TableHead>
                                    <TableHead className="w-[70px] text-right font-semibold text-foreground">{t("table.sl")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dummyLogs.map((log) => (
                                    <TableRow key={log.id} className="hover:bg-muted/20 border-b-border/40">
                                        <TableCell>
                                            <Button variant="destructive" size="sm" className="h-8 px-2">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            className="text-muted-foreground text-xs font-mono max-w-[420px] truncate"
                                            title={log.userAgent}
                                        >
                                            {log.userAgent}
                                        </TableCell>

                                        <TableCell className="align-top">
                                            {(() => {
                                                const parts = log.content.split("•").map((p) => p.trim());
                                                const summary = parts[0] || "";
                                                const ip = parts.find((p) => /^\d{1,3}(\.\d{1,3}){3}$/.test(p)) || "";
                                                const time = parts.find((p) => p.toLowerCase().startsWith("time:")) || "";
                                                return (
                                                    <div className="space-y-1">
                                                        <div className="font-medium text-foreground">{summary}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {ip && <span className="mr-4">{t("table.ip")}: {ip}</span>}
                                                            {time && <span>{t("table.time")}: {time.replace(/^time:\s*/i, "")}</span>}
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </TableCell>
                                        <TableCell className="text-right">{log.sl}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex items-center justify-between text-sm text-muted-foreground p-4">
                            <div>
                                {t("pagination.showing", {
                                    from: 1,
                                    to: dummyLogs.length,
                                    total: dummyLogs.length,
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