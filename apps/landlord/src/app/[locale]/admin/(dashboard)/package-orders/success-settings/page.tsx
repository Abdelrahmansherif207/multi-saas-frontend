import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { SuccessSettingsForm } from "./SuccessSettingsForm";

export default async function SuccessSettingsPage() {
    const t = await getTranslations("Admin.PackageOrderManage.SuccessSettings");
    const tMenu = await getTranslations("Admin.PackageOrderManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("success_order"), href: "/admin/package-orders/success-settings" }
            ]}
        >
            <SuccessSettingsForm
                translations={{
                    main_title: t("main_title"),
                    description: t("description"),
                    update: t("update")
                }}
            />
        </AdminPageWrapper>
    );
}
