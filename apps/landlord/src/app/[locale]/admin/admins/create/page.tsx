import { getTranslations } from "next-intl/server";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { CreateAdminForm } from "@/components/admin/admins/CreateAdminForm";

export default async function CreateAdminPage() {
    const t = await getTranslations("Admin.RoleManage.AddAdmin");
    const tMenu = await getTranslations("Admin.RoleManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_admins"), href: "/admin/admins" },
                { label: tMenu("add_admin"), href: "/admin/admins/create" }
            ]}
        >
            <CreateAdminForm />
        </AdminPageWrapper>
    );
}
