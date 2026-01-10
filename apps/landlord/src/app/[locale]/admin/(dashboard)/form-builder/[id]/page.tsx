import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { FormBuilderEditor } from "../FormBuilderEditor";

interface EditFormPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditFormPage({ params }: EditFormPageProps) {
    const { id } = await params;
    const t = await getTranslations("Admin.FormBuilder.Editor");
    const tMenu = await getTranslations("Admin.FormBuilder.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("title"), href: `/admin/form-builder/${id}` }
            ]}
        >
            <FormBuilderEditor
                translations={{
                    title: t("title"),
                    all_form: t("all_form"),
                    new_form: t("new_form"),
                    language: t("language"),
                    form_title: t("form_title"),
                    receiving_email: t("receiving_email"),
                    email_hint: t("email_hint"),
                    button_title: t("button_title"),
                    success_message: t("success_message"),
                    save_changes: t("save_changes"),
                    available_fields: t("available_fields"),
                    fields: {
                        text: t("fields.text"),
                        email: t("fields.email"),
                        tel: t("fields.tel"),
                        url: t("fields.url"),
                        select: t("fields.select"),
                        checkbox: t("fields.checkbox"),
                        file: t("fields.file"),
                        textarea: t("fields.textarea"),
                    },
                }}
                isEdit={true}
            />
        </AdminPageWrapper>
    );
}
