import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import EditUserForm from "./EditUserForm";

interface UserDetails {
    id: number;
    name: string;
    email: string;
    username: string;
    mobile: string | null;
    company: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    image: string | null;
    has_subdomain: boolean;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
}

interface UserResponse {
    success: boolean;
    message: string;
    data: UserDetails;
}

async function getUser(id: string): Promise<UserDetails | null> {
    const token = await getAdminAuthCookie();

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<UserResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
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

export default async function EditUserPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations("Admin.UserManage.EditUser");
    const tMenu = await getTranslations("Admin.UserManage.menu");

    const user = await getUser(id);

    if (!user) {
        return (
            <AdminPageWrapper
                title={t("title")}
                breadcrumbs={[
                    { label: tMenu("title"), href: "#" },
                    { label: tMenu("all_users"), href: `/${locale}/admin/users` },
                    { label: t("title"), href: "#" }
                ]}
            >
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="text-muted-foreground text-lg">{t("user_not_found")}</div>
                </div>
            </AdminPageWrapper>
        );
    }

    return <EditUserForm user={user} locale={locale} />;
}
