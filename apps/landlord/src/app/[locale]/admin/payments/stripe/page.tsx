import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { StripeSettingsForm } from "@/components/admin/payments/StripeSettingsForm";

export default async function StripeSettingsPage() {
    const t = await getTranslations("Admin.PaymentManage.form");
    const ts = await getTranslations("Admin.PaymentManage.form.stripe");

    return (
        <AdminPageWrapper
            title="Stripe"
            breadcrumbs={[
                { label: t("currencies.default_payment_gateway"), href: "/admin/payments" },
                { label: "Stripe", href: "/admin/payments/stripe" },
            ]}
        >
            <StripeSettingsForm />
        </AdminPageWrapper>
    );
}
