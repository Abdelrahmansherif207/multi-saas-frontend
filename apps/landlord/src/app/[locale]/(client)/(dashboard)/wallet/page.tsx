
import { WalletBalanceCard } from "@/components/dashboard/WalletBalanceCard";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { DepositModal } from "@/components/dashboard/DepositModal";
import { getTranslations } from "next-intl/server";

// Mock Data for Wallet History
const walletHistory = [
    {
        id: "TXN-12345",
        gateway: "Stripe",
        status: "Completed",
        amount: "$500.00",
        date: "2024-12-15",
        image: null,
    },
    {
        id: "TXN-12346",
        gateway: "PayPal",
        status: "Pending",
        amount: "$150.00",
        date: "2024-12-14",
        image: null,
    },
    {
        id: "TXN-12347",
        gateway: "Bank Transfer",
        status: "Failed",
        amount: "$1000.00",
        date: "2024-12-10",
        image: null,
    },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Wallet' });

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    };
}

export default async function WalletPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Wallet' });

    return (
        <div className="space-y-8 p-6">
            {/* Balance Card */}
            <WalletBalanceCard />

            {/* Wallet History Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground">{t('history.title')}</h3>
                        <p className="text-muted-foreground text-sm">
                            {t('history.description')}
                        </p>
                    </div>
                    <DepositModal>
                        <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium px-6 py-2 shadow-sm transition-all flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            {t('history.deposit_button')}
                        </Button>
                    </DepositModal>
                </div>

                {/* Table */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-4">{t('table.id')}</th>
                                    <th className="px-6 py-4">{t('table.gateway')}</th>
                                    <th className="px-6 py-4">{t('table.status')}</th>
                                    <th className="px-6 py-4">{t('table.amount')}</th>
                                    <th className="px-6 py-4">{t('table.date')}</th>
                                    <th className="px-6 py-4">{t('table.image')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {walletHistory.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/5 transition-colors">
                                        <td className="px-6 py-4 font-medium">{item.id}</td>
                                        <td className="px-6 py-4">{item.gateway}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "Completed"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : item.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                    }`}
                                            >
                                                {item.status === "Completed" ? t('table.status_completed') :
                                                    item.status === "Pending" ? t('table.status_pending') :
                                                        item.status === "Failed" ? t('table.status_failed') : item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{item.amount}</td>
                                        <td className="px-6 py-4">{item.date}</td>
                                        <td className="px-6 py-4 text-muted-foreground">-</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}