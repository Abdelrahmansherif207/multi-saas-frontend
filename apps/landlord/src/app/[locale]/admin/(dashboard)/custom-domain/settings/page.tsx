import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { CustomDomainSettingsForm } from "./CustomDomainSettingsForm";

export default async function CustomDomainSettingsPage() {
    const t = await getTranslations("Admin.CustomDomain.Settings");
    const tMenu = await getTranslations("Admin.CustomDomain.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("settings"), href: "/admin/custom-domain/settings" }
            ]}
        >
            <CustomDomainSettingsForm
                translations={{
                    title: t("title"),
                    field_title: t("field_title"),
                    description: t("description"),
                    table_info_title: t("table_info_title"),
                    type_one: t("type_one"),
                    host_one: t("host_one"),
                    value_one: t("value_one"),
                    ttl_one: t("ttl_one"),
                    type_two: t("type_two"),
                    host_two: t("host_two"),
                    value_two: t("value_two"),
                    ttl_two: t("ttl_two"),
                    ip_address: t("ip_address"),
                    screenshot: t("screenshot"),
                    screenshot_hint: t("screenshot_hint"),
                    upload: t("upload"),
                    update: t("update"),
                }}
            />
        </AdminPageWrapper>
    );
}
