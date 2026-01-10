import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { EmailTemplateList } from "./EmailTemplateList";

export default async function EmailTemplatesPage() {
    const t = await getTranslations("Admin.AppearanceSettings.EmailTemplate");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("email_template"), href: "/admin/appearance/email-template" }
            ]}
        >
            <EmailTemplateList
                translations={{
                    title: t("title"),
                    subtitle: t("subtitle"),
                    show: t("show"),
                    entries: t("entries"),
                    search: t("search"),
                    search_placeholder: t("search_placeholder"),
                    showing: t("showing"),
                    to: t("to"),
                    of: t("of"),
                    previous: t("previous"),
                    next: t("next"),
                    table: {
                        sl: t("table.sl"),
                        title: t("table.title"),
                        action: t("table.action"),
                    },
                }}
            />
        </AdminPageWrapper>
    );
}
