import { getTranslations } from "next-intl/server";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { SiteIdentityForm } from "@/components/admin/general-settings/SiteIdentityForm";

export default async function SiteIdentityPage() {
    const t = await getTranslations("Admin.GeneralSettings.site_identity");
    const tGeneralSettings = await getTranslations("Admin.GeneralSettings");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tGeneralSettings("menu_title"), href: "/admin/general-settings" },
                { label: t("title"), href: "/admin/general-settings/site-identity" }
            ]}
        >
            <SiteIdentityForm />
        </AdminPageWrapper>
    );
}