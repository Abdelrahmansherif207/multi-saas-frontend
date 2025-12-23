import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";

export default async function MenuManagePage() {
    const t = await getTranslations("Admin.AppearanceSettings");
    const tMenu = await getTranslations("Admin.AppearanceSettings.menu");

    return (
        <AdminPageWrapper
            title={tMenu("menu_manage")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("menu_manage"), href: "/admin/appearance/menu-manage" }
            ]}
        >
            <div className="flex items-center justify-center h-64 bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl">
                <p className="text-muted-foreground text-lg">{t("coming_soon")}</p>
            </div>
        </AdminPageWrapper>
    );
}
