import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { CountryManageList } from "./CountryManageList";

export default async function CountryManagePage() {
    const t = await getTranslations("Admin.AppearanceSettings.CountryManage");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("country_manage"), href: "/admin/appearance/country-manage" }
            ]}
        >
            <CountryManageList
                translations={{
                    title: t("title"),
                    all_countries: t("all_countries"),
                    add_country: t("add_country"),
                    add_new_country: t("add_new_country"),
                    insert_all: t("insert_all"),
                    add_new: t("add_new"),
                    bulk_action: t("bulk_action"),
                    apply: t("apply"),
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
                        code: t("table.code"),
                        status: t("table.status"),
                        action: t("table.action"),
                    },
                    status: {
                        publish: t("status.publish"),
                        draft: t("status.draft"),
                    },
                    form: {
                        name: t("form.name"),
                        name_placeholder: t("form.name_placeholder"),
                        code: t("form.code"),
                        code_placeholder: t("form.code_placeholder"),
                        status: t("form.status"),
                    },
                }}
            />
        </AdminPageWrapper>
    );
}
