import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash, Plus } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DeleteAdminButton } from "@/components/admin/admins/DeleteAdminButton";

export const dynamic = 'force-dynamic';

interface Admin {
    id: number;
    name: string;
    email: string;
    username: string;
    mobile: string;
    image: string | null;
    email_verified: boolean;
    roles: string[];
    permissions: string[];
    created_at: string;
    updated_at: string;
}

interface AdminsResponse {
    success: boolean;
    message: string;
    data: Admin[];
    pagination: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        from: number;
        to: number;
    };
}

async function getAdmins(): Promise<AdminsResponse | null> {
    const token = await getAdminAuthCookie();

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<AdminsResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/admins`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to fetch admins:", error);
        return null;
    }
}

export default async function AllAdminsPage() {
    const t = await getTranslations("Admin.RoleManage.AllAdmins");
    const tMenu = await getTranslations("Admin.RoleManage.menu");
    const locale = await getLocale();

    const result = await getAdmins();
    const admins = result?.data ?? [];
    const pagination = result?.pagination ?? { total: 0, per_page: 15, current_page: 1, last_page: 1, from: 0, to: 0 };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_admins"), href: "/admin/admins" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("subtitle")}</h2>

                    {/* Search and Show Entries - reusing pattern from users page */}
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
                        <Link href={`/${locale}/admin/admins/create`}>
                            <Button className="h-9 bg-primary hover:bg-primary/90 text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                {tMenu("add_admin")}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="w-[100px] font-semibold text-foreground">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.name")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.image")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.role")}</TableHead>
                                <TableHead className="text-end font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {admins.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground bg-muted/5">
                                        {t("table.no_data")}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                admins.map((admin) => (
                                    <TableRow key={admin.id} className="hover:bg-muted/20 border-b-border/40">
                                        <TableCell className="font-medium text-muted-foreground">{admin.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{admin.name}</span>
                                                <span className="text-xs text-muted-foreground">{admin.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={admin.image || ""} />
                                                <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {admin.roles.map((role, idx) => (
                                                    <Badge key={idx} variant="secondary" className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 border-brand-orange/20">
                                                        {role}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex gap-2 justify-end">
                                                <Link href={`/${locale}/admin/admins/${admin.id}`}>
                                                    <Button size="icon" className="h-8 w-8 bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors duration-300" title={t("table.actions.view_details")}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                                                    </Button>
                                                </Link>
                                                <Link href={`/${locale}/admin/admins/${admin.id}/edit`}>
                                                    <Button size="icon" className="h-8 w-8 bg-primary hover:bg-primary/90 text-white rounded-md dark:text-black transition-colors duration-300">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <DeleteAdminButton adminId={admin.id} adminName={admin.name} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total} entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
