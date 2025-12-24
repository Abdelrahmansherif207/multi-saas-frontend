import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { AllFormsList } from "./AllFormsList";

export default async function AllFormsPage() {
    const t = await getTranslations("Admin.FormBuilder.AllForms");
    const tEditor = await getTranslations("Admin.FormBuilder.Editor");
    const tMenu = await getTranslations("Admin.FormBuilder.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("title"), href: "/admin/form-builder" }
            ]}
        >
            <AllFormsList
                translations={{
                    title: t("title"),
                    bulk_action: t("bulk_action"),
                    apply: t("apply"),
                    show: t("show"),
                    entries: t("entries"),
                    search: t("search"),
                    new_form: t("new_form"),
                    table: {
                        id: t("table.id"),
                        title: t("table.title"),
                        button_text: t("table.button_text"),
                        action: t("table.action"),
                    },
                    no_data: t("no_data"),
                    form_title: tEditor("form_title"),
                    receiving_email: tEditor("receiving_email"),
                    email_hint: tEditor("email_hint"),
                    button_title: tEditor("button_title"),
                    success_message: tEditor("success_message"),
                    save_changes: tEditor("save_changes"),
                    close: "Close",
                }}
            />
        </AdminPageWrapper>
    );
}
