import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { LoginRegisterSettingsForm } from "./LoginRegisterSettingsForm";

export default async function LoginRegisterSettingsPage() {
    const t = await getTranslations("Admin.AppearanceSettings.LoginRegisterSettings");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("login_register"), href: "/admin/appearance/login-register" }
            ]}
        >
            <LoginRegisterSettingsForm
                translations={{
                    title: t("title"),
                    login_title: t("login_title"),
                    register_title: t("register_title"),
                    feature_title_one: t("feature_title_one"),
                    feature_desc_one: t("feature_desc_one"),
                    feature_title_two: t("feature_title_two"),
                    feature_desc_two: t("feature_desc_two"),
                    feature_title_three: t("feature_title_three"),
                    feature_desc_three: t("feature_desc_three"),
                    feature_image_one: t("feature_image_one"),
                    feature_image_two: t("feature_image_two"),
                    feature_image_three: t("feature_image_three"),
                    enable_facebook_login: t("enable_facebook_login"),
                    enable_google_login: t("enable_google_login"),
                    enable_recaptcha: t("enable_recaptcha"),
                    update_settings: t("update_settings"),
                    change: t("change"),
                    remove: t("remove"),
                }}
            />
        </AdminPageWrapper>
    );
}
