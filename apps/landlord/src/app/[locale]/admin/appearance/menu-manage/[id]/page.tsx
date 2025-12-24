import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations, getLocale } from "next-intl/server";
import { MenuEditor } from "./MenuEditor";

interface EditMenuPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
    const { id } = await params;
    const t = await getTranslations("Admin.AppearanceSettings.MenuManage.edit");
    const tPages = await getTranslations("Admin.AppearanceSettings.MenuManage.pages_list");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");
    const locale = await getLocale();

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("menu_manage"), href: "/admin/appearance/menu-manage" },
                { label: t("title"), href: `/admin/appearance/menu-manage/${id}` }
            ]}
        >
            <MenuEditor
                locale={locale}
                menuId={id}
                translations={{
                    title: t("title"),
                    all_menus: t("all_menus"),
                    add_menu_items: t("add_menu_items"),
                    pages: t("pages"),
                    add_to_menu: t("add_to_menu"),
                    custom_links: t("custom_links"),
                    url: t("url"),
                    link_text: t("link_text"),
                    mega_menus: t("mega_menus"),
                    menu_structure: t("menu_structure"),
                    update_changes: t("update_changes"),
                    pages_list: {
                        home: tPages("home"),
                        about_us: tPages("about_us"),
                        pricing_plan: tPages("pricing_plan"),
                        contact: tPages("contact"),
                        terms_condition: tPages("terms_condition"),
                        privacy_policy: tPages("privacy_policy"),
                        all_templates: tPages("all_templates"),
                        blogs: tPages("blogs"),
                    },
                }}
            />
        </AdminPageWrapper>
    );
}
