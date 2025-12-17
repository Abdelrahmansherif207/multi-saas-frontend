import { CreateWebsiteModal } from "@/components/dashboard/CreateWebsiteModal";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Ticket } from "lucide-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { getTranslations } from 'next-intl/server';



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'dashboardTab' });

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    };
}

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'dashboardTab' });
    console.log("DashboardPage rendered on server");

    // Mock Data (Localized)
    const stats = [
        {
            label: t('stats.total_orders'),
            value: "1",
            icon: CheckCircle2,
            color: "bg-brand-orange",
            className: "bg-gradient-to-br from-[#FF8C66] to-[#E05238] text-white",
        },
        {
            label: t('stats.support_tickets'),
            value: "0",
            icon: Ticket,
            className: "bg-primary text-primary-foreground",
        },
    ];

    const recentOrders = [
        {
            id: "1",
            package: "Premium Monthly",
            amount: "$0",
            domain: "test.localhost",
            startDate: t('table.status_placeholder'),
            expireDate: t('table.status_placeholder'),
            status: t('table.pending'),
            paymentHistory: t('table.no_payment_history'),
        },
    ];

    const websites = [
        {
            id: "1",
            url: "http://test.localhost",
        },
    ];

    return (
        <div className="pb-20">
            <div className="space-y-8">
                {/* Action Button Section */}
                <div className="flex justify-end">
                    <CreateWebsiteModal
                        btnText={t('create_website')}
                        btnClassName="bg-brand-orange hover:bg-brand-orange/90 text-white border-0 shadow-lg transition-all hover:-translate-y-0.5"
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className={`border-0 shadow-md overflow-hidden ${stat.className}`}>
                            <CardContent className="p-6 flex items-center gap-6">
                                <div className="h-16 w-16 rounded-full bg-card/20 flex items-center justify-center backdrop-blur-sm">
                                    <stat.icon className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary-foreground">{stat.value}</p>
                                    <p className="text-primary-foreground font-medium">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Your Website Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-muted-foreground uppercase tracking-wider text-center md:text-left">
                        {t('sections.your_website')}
                    </h3>
                    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">{t('table.id')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.site')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.browse')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {websites.length > 0 ? (
                                        websites.map((site) => (
                                            <tr key={site.id}>
                                                <td className="px-6 py-4 font-medium">{site.id}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 tracking-wide">
                                                        {site.url}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0 shadow-sm rounded-full px-6 transition-all hover:scale-105">
                                                            Visit Website
                                                        </Button>
                                                        <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white border-0 shadow-sm rounded-full px-6 transition-all hover:scale-105">
                                                            Login as super admin
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="px-6 py-4" colSpan={3}>
                                                <div className="text-center py-4 text-muted-foreground">
                                                    {t('table.no_websites')}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-muted-foreground uppercase tracking-wider text-center md:text-left">
                        {t('sections.recent_orders')}
                    </h3>
                    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">{t('table.id')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.package_name')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.amount')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.domain')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.start_date')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.expire_date')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.order_status')}</th>
                                        <th className="px-6 py-3 font-medium">{t('table.payment_history')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="bg-card hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 font-medium">{order.id}</td>
                                            <td className="px-6 py-4 text-primary font-medium">{order.package}</td>
                                            <td className="px-6 py-4 font-bold">{order.amount}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.domain}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.startDate}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.expireDate}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.paymentHistory}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
