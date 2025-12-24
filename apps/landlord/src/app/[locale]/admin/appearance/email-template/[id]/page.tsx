import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { EmailTemplateEditor } from "./EmailTemplateEditor";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EmailTemplateEditPage({ params }: PageProps) {
    const { id } = await params;
    const t = await getTranslations("Admin.AppearanceSettings.EmailTemplate");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("edit_title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("email_template"), href: "/admin/appearance/email-template" },
                { label: t("edit_title"), href: `/admin/appearance/email-template/${id}` }
            ]}
        >
            <EmailTemplateEditor
                id={id}
                translations={{
                    edit_title: t("edit_title"),
                    subject: t("subject"),
                    message: t("message"),
                    update_changes: t("update_changes"),
                }}
            />
        </AdminPageWrapper>
    );
}
