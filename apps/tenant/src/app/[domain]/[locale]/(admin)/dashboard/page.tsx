import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Building2, TrendingUp, Users, MapPin, Plus, ArrowUpRight } from 'lucide-react';

export default async function RealEstateDashboard({
    params,
}: {
    params: Promise<{ domain: string; locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations('Admin');
    const isRTL = locale === 'ar';

    const stats = [
        {
            title: isRTL ? 'العقارات' : 'Total Properties',
            value: '1,248',
            change: '+12%',
            icon: Building2,
            color: 'slate',
        },
        {
            title: isRTL ? 'المناطق' : 'Areas',
            value: '24',
            change: '+3',
            icon: MapPin,
            color: 'emerald',
        },
        {
            title: isRTL ? 'المطورين' : 'Developers',
            value: '56',
            change: '+8',
            icon: Users,
            color: 'violet',
        },
        {
            title: isRTL ? 'الاستفسارات' : 'Inquiries',
            value: '342',
            change: '+24%',
            icon: TrendingUp,
            color: 'amber',
        },
    ];

    const colorClasses: Record<string, { bg: string; text: string; iconBg: string; badge: string }> = {
        slate: {
            bg: 'bg-slate-50',
            text: 'text-slate-600',
            iconBg: 'bg-slate-100',
            badge: 'bg-slate-100 text-slate-600',
        },
        emerald: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            iconBg: 'bg-emerald-100',
            badge: 'bg-emerald-100 text-emerald-600',
        },
        violet: {
            bg: 'bg-violet-50',
            text: 'text-violet-600',
            iconBg: 'bg-violet-100',
            badge: 'bg-violet-100 text-violet-600',
        },
        amber: {
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            iconBg: 'bg-amber-100',
            badge: 'bg-amber-100 text-amber-600',
        },
    };

    const quickActions = [
        {
            title: isRTL ? 'إضافة عقار' : 'Add Property',
            href: `/${locale}/dashboard/properties/create`,
            icon: Building2,
        },
        {
            title: isRTL ? 'إضافة منطقة' : 'Add Area',
            href: `/${locale}/dashboard/areas/create`,
            icon: MapPin,
        },
        {
            title: isRTL ? 'إضافة مطور' : 'Add Developer',
            href: `/${locale}/dashboard/developers/create`,
            icon: Users,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {t('sidebar.dashboard')}
                </h1>
                <p className="mt-1 text-slate-500">
                    {isRTL ? 'نظرة عامة على نشاط منصة العقارات' : 'Overview of your real estate platform activity'}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const colors = colorClasses[stat.color];

                    return (
                        <div
                            key={index}
                            className="rounded-2xl p-6 bg-white border border-slate-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${colors.text}`} />
                                </div>
                                <span className={`text-sm font-medium ${colors.badge} px-2.5 py-1 rounded-lg`}>
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 mb-1">
                                {stat.value}
                            </p>
                            <p className="text-sm text-slate-500">
                                {stat.title}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    {isRTL ? 'الإجراءات السريعة' : 'Quick Actions'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={index}
                                href={action.href}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                                    <Plus className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">
                                        {action.title}
                                    </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                        {isRTL ? 'أحدث العقارات' : 'Recent Properties'}
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                                <div className="w-12 h-12 rounded-lg bg-slate-200" />
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={`/${locale}/dashboard/properties`}
                        className="inline-flex items-center gap-2 mt-4 text-sm text-slate-700 hover:text-slate-900 font-medium"
                    >
                        {isRTL ? 'عرض كل العقارات' : 'View all properties'}
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                        {isRTL ? 'أحدث الاستفسارات' : 'Recent Inquiries'}
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm">
                                    U{i}
                                </div>
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                                </div>
                                <span className="text-xs text-slate-400">
                                    {isRTL ? 'منذ ساعة' : '1h ago'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={`/${locale}/dashboard/inquiries`}
                        className="inline-flex items-center gap-2 mt-4 text-sm text-slate-700 hover:text-slate-900 font-medium"
                    >
                        {isRTL ? 'عرض كل الاستفسارات' : 'View all inquiries'}
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
