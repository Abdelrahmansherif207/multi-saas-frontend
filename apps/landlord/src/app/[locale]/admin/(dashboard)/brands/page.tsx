import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { BrandsForm } from "./BrandsForm";

export default async function BrandsPage() {
    const t = await getTranslations("Admin.Brands");
    const tMenu = await getTranslations("Admin.Brands.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "/admin/brands" },
                { label: t("title"), href: "/admin/brands" }
            ]}
        >
            <BrandsForm
                translations={{
                    title: t("title"),
                    add_new: t("add_new"),
                    bulk_action: t("bulk_action"),
                    apply: t("apply"),
                    search: t("search"),
                    table: {
                        id: t("table.id"),
                        image: t("table.image"),
                        url: t("table.url"),
                        status: t("table.status"),
                        action: t("table.action"),
                    }
                }}
            />
        </AdminPageWrapper>
    );
}
