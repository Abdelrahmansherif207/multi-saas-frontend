import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { AccountSettingsForm } from "@/components/admin/users/AccountSettingsForm";

import { getTranslations } from "next-intl/server";

export default async function AccountSettingsPage() {
    const t = await getTranslations("Admin.UserManage.Settings");
    const tMenu = await getTranslations("Admin.UserManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("settings"), href: "/admin/users/settings" }
            ]}
        >
            <AccountSettingsForm />
        </AdminPageWrapper>
    );
}
