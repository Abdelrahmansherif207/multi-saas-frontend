import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { MaintenanceSettingsForm } from "./MaintenanceSettingsForm";

export default async function MaintenanceSettingsPage() {
    const t = await getTranslations("Admin.AppearanceSettings.MaintenanceSettings");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("maintenance"), href: "/admin/appearance/maintenance" }
            ]}
        >
            <MaintenanceSettingsForm
                translations={{
                    title: t("title"),
                    page_title: t("page_title"),
                    description: t("description"),
                    coming_back_date: t("coming_back_date"),
                    maintenance_logo: t("maintenance_logo"),
                    maintenance_bg_image: t("maintenance_bg_image"),
                    update_settings: t("update_settings"),
                    change: t("change"),
                    remove: t("remove"),
                }}
            />
        </AdminPageWrapper>
    );
}
