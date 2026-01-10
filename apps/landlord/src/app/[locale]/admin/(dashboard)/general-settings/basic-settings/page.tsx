import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { BasicSettingsForm } from "@/components/admin/general-settings/BasicSettingsForm";
import { getTranslations } from "next-intl/server";

export default async function BasicSettingsPage() {
    const t = await getTranslations("Admin.GeneralSettings.basic_settings");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("title"), href: "/admin/general-settings/basic-settings" }
            ]}
        >
            <BasicSettingsForm />
        </AdminPageWrapper>
    );
}