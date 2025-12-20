import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { CreateRoleModal } from "@/components/admin/roles/CreateRoleModal";

const mockRoles = [
    { id: 1, name: "Super Admin", isSuper: true },
    { id: 2, name: "Admin", isSuper: false },
    { id: 3, name: "Editor", isSuper: false },
];

export default async function AllAdminRolesPage() {
    const t = await getTranslations("Admin.RoleManage.AllRoles");
    const tMenu = await getTranslations("Admin.RoleManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_roles"), href: "/admin/roles" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("title")}</h2>

                    <CreateRoleModal />
                </div>

                <div className="flex items-center justify-between gap-4">
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

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="w-[100px] font-semibold text-foreground">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.name")}</TableHead>
                                <TableHead className="text-end font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockRoles.map((role) => (
                                <TableRow key={role.id} className="hover:bg-muted/20 border-b-border/40">
                                    <TableCell className="font-medium text-muted-foreground">{role.id}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell className="text-end">
                                        {role.isSuper ? (
                                            <Badge variant="secondary" className="bg-brand-orange text-white hover:bg-brand-orange/90 rounded-md font-normal px-3 py-1 transition-colors duration-300">
                                                {t("table.super_admin_access")}
                                            </Badge>
                                        ) : (
                                            <div className="flex gap-2 justify-end">
                                                <Button size="icon" className="h-8 w-8 bg-primary hover:bg-primary/90 text-white rounded-md dark:text-black transition-colors duration-300">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" className="h-8 w-8 bg-destructive hover:bg-destructive/90 text-white rounded-md">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing 1 to 3 of 3 entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-white dark:text-black transition-colors duration-300">1</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
