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
            color: 'blue',
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
            color: 'purple',
        },
        {
            title: isRTL ? 'الاستفسارات' : 'Inquiries',
            value: '342',
            change: '+24%',
            icon: TrendingUp,
            color: 'amber',
        },
    ];

    const colorClasses: Record<string, { bg: string; text: string; iconBg: string }> = {
        blue: {
            bg: 'from-blue-500/10 to-blue-500/5',
            text: 'text-blue-600 dark:text-blue-400',
            iconBg: 'bg-blue-100 dark:bg-blue-500/20',
        },
        emerald: {
            bg: 'from-emerald-500/10 to-emerald-500/5',
            text: 'text-emerald-600 dark:text-emerald-400',
            iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
        },
        purple: {
            bg: 'from-purple-500/10 to-purple-500/5',
            text: 'text-purple-600 dark:text-purple-400',
            iconBg: 'bg-purple-100 dark:bg-purple-500/20',
        },
        amber: {
            bg: 'from-amber-500/10 to-amber-500/5',
            text: 'text-amber-600 dark:text-amber-400',
            iconBg: 'bg-amber-100 dark:bg-amber-500/20',
        },
    };

    const quickActions = [
        {
            title: isRTL ? 'إضافة عقار' : 'Add Property',
            href: `/${locale}/realestate/properties/create`,
            icon: Building2,
        },
        {
            title: isRTL ? 'إضافة منطقة' : 'Add Area',
            href: `/${locale}/realestate/areas/create`,
            icon: MapPin,
        },
        {
            title: isRTL ? 'إضافة مطور' : 'Add Developer',
            href: `/${locale}/realestate/developers/create`,
            icon: Users,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t('sidebar.dashboard')}
                </h1>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
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
                            className={`
                                relative overflow-hidden rounded-2xl p-6
                                bg-white dark:bg-slate-800 
                                border border-slate-200 dark:border-slate-700
                                shadow-sm hover:shadow-md transition-shadow
                            `}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} pointer-events-none`} />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${colors.text}`} />
                                    </div>
                                    <span className={`text-sm font-medium ${colors.text} bg-white/50 dark:bg-slate-900/50 px-2 py-1 rounded-full`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {stat.title}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    {isRTL ? 'الإجراءات السريعة' : 'Quick Actions'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={index}
                                href={action.href}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                    <Plus className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        {action.title}
                                    </p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        {isRTL ? 'أحدث العقارات' : 'Recent Properties'}
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" />
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={`/${locale}/realestate/properties`}
                        className="inline-flex items-center gap-2 mt-4 text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                        {isRTL ? 'عرض كل العقارات' : 'View all properties'}
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        {isRTL ? 'أحدث الاستفسارات' : 'Recent Inquiries'}
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                                    U{i}
                                </div>
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-2" />
                                    <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-1/3" />
                                </div>
                                <span className="text-xs text-slate-400">
                                    {isRTL ? 'منذ ساعة' : '1h ago'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={`/${locale}/realestate/inquiries`}
                        className="inline-flex items-center gap-2 mt-4 text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                        {isRTL ? 'عرض كل الاستفسارات' : 'View all inquiries'}
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
