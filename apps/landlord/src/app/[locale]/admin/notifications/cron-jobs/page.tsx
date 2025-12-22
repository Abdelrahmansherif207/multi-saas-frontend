import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { useTranslations } from "next-intl";
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

interface CronJobItem {
    id: string;
    title: string;
    type: string;
    sendEmail: boolean;
    date: string;
    log: string;
}

const jobs: CronJobItem[] = [];

export default function CronJobsPage() {
    const t = useTranslations("Admin.Notifications.CronJobs");
    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.notifications"), href: "/admin/notifications" },
                { label: t("breadcrumbs.cron_jobs"), href: "/admin/notifications/cron-jobs" },
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
                            <Input className="h-9 w-[220px]" placeholder={t("search_placeholder")} />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                    <TableHead className="w-[80px] text-right font-semibold text-foreground">{t("table.sl")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.title")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.type")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.send_email")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.date")}</TableHead>
                                    <TableHead className="font-semibold text-foreground">{t("table.log")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground bg-muted/5">
                                            {t("table.no_data")}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    jobs.map((job, idx) => (
                                        <TableRow key={job.id} className="hover:bg-muted/20 border-b-border/40">
                                            <TableCell className="text-right">{idx + 1}</TableCell>
                                            <TableCell className="font-medium">{job.title}</TableCell>
                                            <TableCell>{job.type}</TableCell>
                                            <TableCell>{job.sendEmail ? t("table.yes") : t("table.no")}</TableCell>
                                            <TableCell>
                                                <span className="text-muted-foreground">{job.date}</span>
                                            </TableCell>
                                            <TableCell>{job.log}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        <div className="flex items-center justify-between text-sm text-muted-foreground p-4">
                            <div>
                                {t("pagination.showing", {
                                    from: 0,
                                    to: 0,
                                    total: 0,
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