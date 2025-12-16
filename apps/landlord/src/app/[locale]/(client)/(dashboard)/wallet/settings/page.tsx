
import WalletSettingsForm from "@/components/dashboard/WalletSettingsForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard.WalletSettings' });

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    };
}

export default function WalletSettingsPage() {
    return <WalletSettingsForm />;
}
