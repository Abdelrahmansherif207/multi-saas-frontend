import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { TicketSettingsForm } from "./TicketSettingsForm";

export default async function TicketSettingsPage() {
    const t = await getTranslations("Admin.SupportTicketManage.PageSettings");
    const tMenu = await getTranslations("Admin.SupportTicketManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("title"), href: "/admin/support-tickets/settings" }
            ]}
        >
            <TicketSettingsForm
                translations={{
                    title: t("title"),
                    login_notice: t("login_notice"),
                    form_title: t("form_title"),
                    button_text: t("button_text"),
                    success_message: t("success_message"),
                    update: t("update")
                }}
            />
        </AdminPageWrapper>
    );
}
