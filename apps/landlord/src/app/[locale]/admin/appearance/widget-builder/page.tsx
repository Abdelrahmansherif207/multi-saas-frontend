import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { WidgetBuilder } from "./WidgetBuilder";

export default async function WidgetBuilderPage() {
    const t = await getTranslations("Admin.AppearanceSettings.WidgetBuilder");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("widget_builder"), href: "/admin/appearance/widget-builder" }
            ]}
        >
            <WidgetBuilder
                translations={{
                    title: t("title"),
                    all_widgets: t("all_widgets"),
                    footer_area: t("footer_area"),
                    sidebar_area: t("sidebar_area"),
                    save_changes: t("save_changes"),
                    widgets: {
                        raw_html: t("widgets.raw_html"),
                        text_editor: t("widgets.text_editor"),
                        about_us: t("widgets.about_us"),
                        custom_page_link: t("widgets.custom_page_link"),
                        contact_info: t("widgets.contact_info"),
                        popular_blogs: t("widgets.popular_blogs"),
                        blog_category_search: t("widgets.blog_category_search"),
                        popular_appointments: t("widgets.popular_appointments"),
                        popular_sub_appointments: t("widgets.popular_sub_appointments"),
                        google_map: t("widgets.google_map"),
                    },
                    widget_config: {
                        description: t("widget_config.description"),
                        logo: t("widget_config.logo"),
                        upload_image: t("widget_config.upload_image"),
                        icon: t("widget_config.icon"),
                        icon_url: t("widget_config.icon_url"),
                        title: t("widget_config.title"),
                        title_url: t("widget_config.title_url"),
                        add: t("widget_config.add"),
                        remove: t("widget_config.remove"),
                        save_changes: t("widget_config.save_changes"),
                        english: t("widget_config.english"),
                        arabic: t("widget_config.arabic"),
                        info: t("widget_config.info"),
                        heading_text: t("widget_config.heading_text"),
                        blog_items: t("widget_config.blog_items"),
                        category_title: t("widget_config.category_title"),
                        category_items: t("widget_config.category_items"),
                        latitude: t("widget_config.latitude"),
                        longitude: t("widget_config.longitude"),
                    },
                }}
            />
        </AdminPageWrapper>
    );
}
