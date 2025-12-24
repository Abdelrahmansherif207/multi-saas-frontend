import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { ManualPaymentForm } from "@/components/admin/payments/ManualPaymentForm";

export default async function ManualPaymentSettingsPage() {
    const t = await getTranslations("Admin.PaymentManage.form");
    const tm = await getTranslations("Admin.PaymentManage.form.manual");

    return (
        <AdminPageWrapper
            title="Manual Payment"
            breadcrumbs={[
                { label: t("currencies.default_payment_gateway"), href: "/admin/payments" },
                { label: "Manual Payment", href: "/admin/payments/manual" },
            ]}
        >
            <ManualPaymentForm />
        </AdminPageWrapper>
    );
}
