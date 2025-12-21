import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AllWebsitesPage() {
    const t = await getTranslations("Admin.WebsiteManage.AllWebsites");
    const tMenu = await getTranslations("Admin.WebsiteManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_websites"), href: "/admin/websites" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("subtitle")}</h2>

                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert h-5 w-5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                        <span>{t("delete_warning")}</span>
                    </div>

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
                                <TableHead className="font-semibold text-foreground">{t("table.user_name")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.subdomain")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.domain")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.browse")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Mock Data Row */}
                            <TableRow className="hover:bg-muted/20 border-b-border/40">
                                <TableCell>abdelrahman</TableCell>
                                <TableCell>test</TableCell>
                                <TableCell>
                                    <Button size="sm" className="h-7 px-2 bg-sky-600 hover:bg-sky-700 text-white text-xs">
                                        test.localhost
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1.5">
                                        <Button size="sm" className="h-7 px-2 bg-brand-orange hover:bg-brand-orange/80 text-white text-xs transition-colors duration-300">
                                            {t("table.actions.visit_website")}
                                        </Button>
                                        <Button size="sm" className="h-7 px-2 bg-pink-700 hover:bg-pink-700/80 text-white text-xs transition-colors duration-300">
                                            {t("table.actions.login_as_admin")}
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button size="sm" variant="destructive" className="h-7 px-2">
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing 1 to 1 of 1 entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
