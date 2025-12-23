import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { MenuManageList } from "./MenuManageList";

export default async function MenuManagePage() {
    const t = await getTranslations("Admin.AppearanceSettings.MenuManage");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");
    const locale = await getLocale();

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("menu_manage"), href: "/admin/appearance/menu-manage" }
            ]}
        >
            <MenuManageList
                locale={locale}
                translations={{
                    title: t("title"),
                    all_menus: t("all_menus"),
                    add_new_menu: t("add_new_menu"),
                    create_menu: t("create_menu"),
                    table: {
                        id: t("table.id"),
                        title: t("table.title"),
                        status: t("table.status"),
                        created_at: t("table.created_at"),
                        action: t("table.action"),
                    },
                    status: {
                        default: t("status.default"),
                        active: t("status.active"),
                        inactive: t("status.inactive"),
                    },
                }}
            />
        </AdminPageWrapper>
    );
}
