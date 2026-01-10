import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { CancelSettingsForm } from "./CancelSettingsForm";

export default async function CancelSettingsPage() {
    const t = await getTranslations("Admin.PackageOrderManage.CancelSettings");
    const tMenu = await getTranslations("Admin.PackageOrderManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("cancel_order"), href: "/admin/package-orders/cancel-settings" }
            ]}
        >
            <CancelSettingsForm
                translations={{
                    main_title: t("main_title"),
                    subtitle: t("subtitle"),
                    subtitle_hint: t("subtitle_hint", { pname: "{pname}" }),
                    description: t("description"),
                    update: t("update")
                }}
            />
        </AdminPageWrapper>
    );
}
