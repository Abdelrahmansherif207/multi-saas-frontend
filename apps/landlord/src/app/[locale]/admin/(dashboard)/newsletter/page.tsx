import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { Trash2 } from "lucide-react";

// Mock subscriber data
const mockSubscribers = [
    { id: 1, email: "john@example.com", status: "active" },
    { id: 2, email: "jane@example.com", status: "active" },
    { id: 3, email: "bob@example.com", status: "inactive" },
];

export default async function AllSubscribersPage() {
    const t = await getTranslations("Admin.NewsletterManage.AllSubscribers");
    const tMenu = await getTranslations("Admin.NewsletterManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_subscribers"), href: "/admin/newsletter" }
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Subscribers Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">{t("subscriber_list")}</h3>

                        {/* Bulk Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <Select>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder={t("bulk_action")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="delete">{t("delete")}</SelectItem>
                                        <SelectItem value="activate">{t("activate")}</SelectItem>
                                        <SelectItem value="deactivate">{t("deactivate")}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                                    {t("apply")}
                                </Button>
                            </div>
                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-sm font-medium">{t("search")}:</span>
                                <Input className="h-9 w-[200px]" placeholder="" />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                        <TableHead className="w-12">
                                            <Checkbox />
                                        </TableHead>
                                        <TableHead className="font-semibold text-foreground">{t("table.id")}</TableHead>
                                        <TableHead className="font-semibold text-foreground">{t("table.email")}</TableHead>
                                        <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                                        <TableHead className="font-semibold text-foreground">{t("table.action")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockSubscribers.map((subscriber) => (
                                        <TableRow key={subscriber.id} className="hover:bg-muted/20 border-b-border/40">
                                            <TableCell>
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="font-medium">{subscriber.id}</TableCell>
                                            <TableCell>{subscriber.email}</TableCell>
                                            <TableCell>
                                                <Badge className={
                                                    subscriber.status === "active"
                                                        ? "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-300"
                                                        : "bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-300"
                                                }>
                                                    {subscriber.status === "active" ? t("active") : t("inactive")}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" variant="destructive" className="h-7 px-2">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Info */}
                        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                            <div>{t("showing")} 1 {t("to")} {mockSubscribers.length} {t("of")} {mockSubscribers.length} {t("entries")}</div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>{t("previous")}</Button>
                                <Button variant="outline" size="sm" disabled>{t("next")}</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Add New Subscriber */}
                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">{t("add_subscriber")}</h3>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    {t("email")}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t("email_placeholder")}
                                />
                            </div>

                            <Button className="w-full bg-primary hover:bg-primary/90 text-white dark:text-black">
                                {t("submit")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
