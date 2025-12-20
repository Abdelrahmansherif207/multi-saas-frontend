import { paymentLogs } from "../data";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard.Payments' });
    const log = paymentLogs.find((p) => p.slug === slug);

    if (!log) {
        return {
            title: t('card.details_not_found'),
        };
    }

    return {
        title: `${t('card.details_title')} - ${log.orderId}`,
    };
}

export default async function PaymentDetailsPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard.Payments' });

    const log = paymentLogs.find((p) => p.slug === slug);

    if (!log) {
        notFound();
    }

    return (
        <div className="space-y-6 p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link
                    href="/payments"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('card.back_to_payments')}
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">{t('card.details_title')}</h1>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${log.status === "Completed"
                        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900"
                        }`}>
                        {log.status === "Completed" ? (
                            <CheckCircle className="h-4 w-4" />
                        ) : (
                            <Clock className="h-4 w-4" />
                        )}
                        {log.status === "Pending" ? t('card.status') : log.status}
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">

                    {/* Section 1: Transaction Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">{t('card.paid_amount')}</p>
                            <p className="text-2xl font-bold text-foreground">{log.paidAmount}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">{t('card.package_price')}</p>
                            <p className="text-2xl font-bold text-foreground">{log.packagePrice}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">{t('card.gateway')}</p>
                            <p className="text-lg font-semibold text-foreground">{log.gateway}</p>
                        </div>
                    </div>

                    {/* Section 2: Detailed Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                {t('table.order_info')}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">{t('card.order_id')}</span>
                                    <span className="font-medium">{log.orderId}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">{t('card.transaction_id')}</span>
                                    <span className="font-medium font-mono text-sm">{log.transactionId || "-"}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">{t('card.domain')}</span>
                                    <span className="font-medium text-blue-600 dark:text-blue-400">{log.domain}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">{t('card.package_name')}</span>
                                    {/* Assuming there might be a translation for package name key, but using logs content mostly */}
                                    <span className="font-medium">{log.packageName}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                {t('card.date_info')}
                                {/* Assuming we can add this key or reuse something similar if it doesn't exist, looking at usage below */}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">{t('card.start_date')}</span>
                                    <span className="font-medium">
                                        {log.startDate === "website not yet created" ? t('card.website_not_created') : log.startDate}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border/50">
                                    <span className="text-muted-foreground">{t('card.end_date')}</span>
                                    <span className="font-medium">{log.endDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-muted/30 px-6 py-4 flex justify-end gap-3 border-t">
                    {log.status === "Pending" && (
                        <Button className="bg-green-700 hover:bg-green-800 text-white">
                            {t('card.pay_now')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
