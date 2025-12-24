import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { ColorsSettingsForm } from "@/components/admin/general-settings/ColorsSettingsForm";
import { getTranslations } from "next-intl/server";

export default async function ColorsSettingsPage() {
    const t = await getTranslations("Admin.GeneralSettings.colors_settings");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("title"), href: "/admin/general-settings/colors-settings" }
            ]}
        >
            <ColorsSettingsForm />
        </AdminPageWrapper>
    );
}                                                                                       