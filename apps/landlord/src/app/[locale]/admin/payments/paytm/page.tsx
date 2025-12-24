import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { PaytmSettingsForm } from "@/components/admin/payments/PaytmSettingsForm";

export default async function PaytmSettingsPage() {
    const t = await getTranslations("Admin.PaymentManage.form");
    const tp = await getTranslations("Admin.PaymentManage.form.paytm");

    return (
        <AdminPageWrapper
            title="Paytm"
            breadcrumbs={[
                { label: t("currencies.default_payment_gateway"), href: "/admin/payments" },
                { label: "Paytm", href: "/admin/payments/paytm" },
            ]}
        >
            <PaytmSettingsForm />
        </AdminPageWrapper>
    );
}
