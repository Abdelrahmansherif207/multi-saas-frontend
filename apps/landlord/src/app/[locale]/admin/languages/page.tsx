import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { LanguageList } from "./LanguageList";

export default async function LanguagesPage() {
    const t = await getTranslations("Admin.LanguageManage");
    const tMenu = await getTranslations("Admin.LanguageManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "/admin/languages" },
            ]}
        >
            <LanguageList
                translations={{
                    title: t("title"),
                    info_message: t("info_message"),
                    add_language: t("add_language"),
                    add_new: t("add_new"),
                    show: t("show"),
                    entries: t("entries"),
                    search: t("search"),
                    showing: t("showing"),
                    to: t("to"),
                    of: t("of"),
                    previous: t("previous"),
                    next: t("next"),
                    table: {
                        id: t("table.id"),
                        name: t("table.name"),
                        direction: t("table.direction"),
                        slug: t("table.slug"),
                        status: t("table.status"),
                        default: t("table.default"),
                        action: t("table.action"),
                    },
                    status: {
                        publish: t("status.publish"),
                        draft: t("status.draft"),
                    },
                    direction: {
                        ltr: t("direction.ltr"),
                        rtl: t("direction.rtl"),
                    },
                    actions: {
                        edit_all_words: t("actions.edit_all_words"),
                        edit: t("actions.edit"),
                        clone: t("actions.clone"),
                        delete: t("actions.delete"),
                        make_default: t("actions.make_default"),
                    },
                    form: {
                        language: t("form.language"),
                        language_placeholder: t("form.language_placeholder"),
                        direction: t("form.direction"),
                        status: t("form.status"),
                        slug: t("form.slug"),
                        slug_placeholder: t("form.slug_placeholder"),
                    },
                }}
            />
        </AdminPageWrapper>
    );
}
