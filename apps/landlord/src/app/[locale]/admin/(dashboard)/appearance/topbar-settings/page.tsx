import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { TopbarSettingsForm } from "./TopbarSettingsForm";

export default async function TopbarSettingsPage() {
    const t = await getTranslations("Admin.AppearanceSettings.TopbarSettings");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("topbar_settings"), href: "/admin/appearance/topbar-settings" }
            ]}
        >
            <TopbarSettingsForm
                translations={{
                    title: t("title"),
                    phone: t("phone"),
                    email: t("email"),
                    facebook_url: t("facebook_url"),
                    instagram_url: t("instagram_url"),
                    linkedin_url: t("linkedin_url"),
                    twitter_url: t("twitter_url"),
                    enable_contact_info: t("enable_contact_info"),
                    enable_language: t("enable_language"),
                    enable_social_info: t("enable_social_info"),
                    enable_full_topbar: t("enable_full_topbar"),
                    update_settings: t("update_settings"),
                }}
            />
        </AdminPageWrapper>
    );
}
