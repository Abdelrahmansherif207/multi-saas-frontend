import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AllUsersPage() {
    const t = await getTranslations("Admin.UserManage.AllUsers");
    const tMenu = await getTranslations("Admin.UserManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_users"), href: "/admin/users" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("subtitle")}</h2>

                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert h-5 w-5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                        <span>{t("delete_warning")}</span>
                    </div>

                    {/* Search and Show Entries - reusing pattern from admins page */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Show</span>
                            <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
                            <span>entries</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm font-medium">Search:</span>
                            <Input className="h-9 w-[200px]" placeholder="" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="w-[80px] font-semibold text-foreground">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.name")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.email")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Mock Data Row - Replace with actual data */}
                            <TableRow className="hover:bg-muted/20 border-b-border/40">
                                <TableCell className="font-medium">9</TableCell>
                                <TableCell>abdelrahman</TableCell>
                                <TableCell>dodgersherif127@gmail.com</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1.5">
                                        <Button size="sm" variant="destructive" className="h-7 px-2">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button size="sm" className="h-7 px-2 bg-cyan-600 hover:bg-cyan-700 text-white">
                                            <Edit className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button size="sm" className="h-7 px-2 bg-sky-600 hover:bg-sky-700 text-white text-xs">
                                            {t("table.actions.change_password")}
                                        </Button>
                                        <Button size="sm" className="h-7 px-2 bg-teal-600 hover:bg-teal-700 text-white text-xs">
                                            {t("table.actions.assign_subscription")}
                                        </Button>
                                        <Button size="sm" className="h-7 px-2 bg-amber-500 hover:bg-amber-600 text-white text-xs">
                                            {t("table.actions.send_mail")}
                                        </Button>
                                        <Button size="sm" className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs">
                                            {t("table.actions.login_as_user")}
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                            {t("table.actions.view_details")}
                                        </Button>
                                        <Button size="sm" className="h-7 px-2 bg-green-500 hover:bg-green-600 text-white text-xs">
                                            {t("table.actions.enable_email_verify")}
                                        </Button>
                                    </div>
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
