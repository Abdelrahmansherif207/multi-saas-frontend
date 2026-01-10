import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { CreateUserForm } from "@/components/admin/users/CreateUserForm";
import { getTranslations } from "next-intl/server";

export default async function NewUserPage() {
    const t = await getTranslations("Admin.UserManage.AddUser");
    const tMenu = await getTranslations("Admin.UserManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("add_user"), href: "/admin/users/new" }
            ]}
        >
            <CreateUserForm />
        </AdminPageWrapper>
    );
}
