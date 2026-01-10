import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { PaypalSettingsForm } from "@/components/admin/payments/PaypalSettingsForm";

export default async function PaypalSettingsPage() {
    const t = await getTranslations("Admin.PaymentManage.form");
    const tp = await getTranslations("Admin.PaymentManage.form.paypal");

    return (
        <AdminPageWrapper
            title="PayPal"
            breadcrumbs={[
                { label: t("currencies.default_payment_gateway"), href: "/admin/payments" },
                { label: "PayPal", href: "/admin/payments/paypal" },
            ]}
        >
            <PaypalSettingsForm />
        </AdminPageWrapper>
    );
}
