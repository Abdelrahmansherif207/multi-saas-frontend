import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { TestimonialsForm } from "./TestimonialsForm";

export default async function TestimonialsPage() {
    const t = await getTranslations("Admin.Testimonials");
    const tMenu = await getTranslations("Admin.Testimonials.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "/admin/testimonials" },
                { label: t("title"), href: "/admin/testimonials" }
            ]}
        >
            <TestimonialsForm
                translations={{
                    title: t("title"),
                    add_new: t("add_new"),
                    bulk_action: t("bulk_action"),
                    apply: t("apply"),
                    search: t("search"),
                    table: {
                        id: t("table.id"),
                        image: t("table.image"),
                        name: t("table.name"),
                        designation: t("table.designation"),
                        company: t("table.company"),
                        status: t("table.status"),
                        action: t("table.action"),
                    }
                }}
            />
        </AdminPageWrapper>
    );
}
