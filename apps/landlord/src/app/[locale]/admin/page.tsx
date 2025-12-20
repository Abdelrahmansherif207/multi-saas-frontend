import { getTranslations } from "next-intl/server";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { DashboardCharts } from "@/components/admin/dashboard/DashboardCharts";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { DashboardRecentOrders } from "@/components/admin/dashboard/DashboardRecentOrders";

export default async function AdminDashboardPage() {
    const t = await getTranslations("Admin.Dashboard");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin" }]}
        >
            <div className="space-y-8 w-full">
                <section className="space-y-4">
                    <p className="font-semibold text-lg text-foreground/80">{t("overview")}</p>
                    <DashboardStats />
                </section>

                <section className="space-y-4">
                    <p className="font-semibold text-lg text-foreground/80">{t("analytics")}</p>
                    <DashboardCharts />
                </section>

                <section className="space-y-4">
                    <DashboardRecentOrders />
                </section>
            </div>
        </AdminPageWrapper>
    );
}
