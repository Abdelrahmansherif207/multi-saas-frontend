import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { SendMailClient } from "./SendMailClient";

export default async function SendMailPage() {
    const t = await getTranslations("Admin.NewsletterManage.SendMail");
    const tMenu = await getTranslations("Admin.NewsletterManage.menu");

    const translations = {
        send_to_all: t("send_to_all"),
        subject: t("subject"),
        subject_placeholder: t("subject_placeholder"),
        message: t("message"),
        send_mail: t("send_mail"),
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("send_mail"), href: "/admin/newsletter/send" }
            ]}
        >
            <SendMailClient translations={translations} />
        </AdminPageWrapper>
    );
}
