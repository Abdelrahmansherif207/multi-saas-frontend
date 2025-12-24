import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { NotFoundSettingsForm } from "./NotFoundSettingsForm";

export default async function NotFoundSettingsPage() {
    const t = await getTranslations("Admin.AppearanceSettings.NotFoundSettings");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("404_settings"), href: "/admin/appearance/404-settings" }
            ]}
        >
            <NotFoundSettingsForm
                translations={{
                    title: t("title"),
                    page_title: t("page_title"),
                    button_text: t("button_text"),
                    site_logo: t("site_logo"),
                    update_settings: t("update_settings"),
                    change: t("change"),
                    image_alt: t("image_alt"),
                }}
            />
        </AdminPageWrapper>
    );
}
