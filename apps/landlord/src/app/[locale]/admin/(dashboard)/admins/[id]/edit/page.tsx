import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import EditAdminForm from "./EditAdminForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AdminDetails {
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

interface AdminResponse {
    success: boolean;
    message: string;
    data: AdminDetails;
}

async function getAdmin(id: string): Promise<AdminDetails | null> {
    const token = await getAdminAuthCookie();

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<AdminResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/admins/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.data;
    } catch {
        return null;
    }
}

export default async function EditAdminPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations("Admin.RoleManage.EditAdmin");
    const tMenu = await getTranslations("Admin.RoleManage.menu");

    const admin = await getAdmin(id);

    if (!admin) {
        return (
            <AdminPageWrapper
                title={t("title")}
                breadcrumbs={[
                    { label: tMenu("title"), href: "#" },
                    { label: tMenu("all_admins"), href: `/${locale}/admin/admins` },
                    { label: t("title"), href: "#" }
                ]}
            >
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="text-muted-foreground text-lg">{t("admin_not_found")}</div>
                    <Link href={`/${locale}/admin/admins`}>
                        <Button variant="outline" className="mt-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t("back_to_details")}
                        </Button>
                    </Link>
                </div>
            </AdminPageWrapper>
        );
    }

    return <EditAdminForm admin={admin} locale={locale} />;
}
