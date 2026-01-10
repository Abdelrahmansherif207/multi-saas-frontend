import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { DepartmentsForm } from "./DepartmentsForm";

export default async function DepartmentsPage() {
    const t = await getTranslations("Admin.SupportTicketManage.Departments");
    const tMenu = await getTranslations("Admin.SupportTicketManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("subtitle"), href: "/admin/support-tickets/departments" }
            ]}
        >
            <DepartmentsForm
                translations={{
                    bulk_action: t("bulk_action"),
                    apply: t("apply"),
                    search: t("search"),
                    add_new: t("add_new"),
                    table: {
                        id: t("table.id"),
                        title: t("table.title"),
                        status: t("table.status"),
                        action: t("table.action"),
                    }
                }}
            />
        </AdminPageWrapper>
    );
}
