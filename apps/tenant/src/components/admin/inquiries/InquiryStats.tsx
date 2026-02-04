import { InquiryStatistics } from '@/app/[domain]/[locale]/(admin)/dashboard/inquiries/types';
import { Users, PhoneIncoming, MessageSquare, CheckCircle, UserCheck } from 'lucide-react';

interface InquiryStatsProps {
    stats: InquiryStatistics;
    isRTL: boolean;
}

export function InquiryStats({ stats, isRTL }: InquiryStatsProps) {
    const statItems = [
        {
            label: isRTL ? 'إجمالي الطلبات' : 'Total Inquiries',
            value: stats.total,
            icon: MessageSquare,
            color: 'text-slate-500',
            bg: 'bg-slate-50 dark:bg-slate-900',
        },
        {
            label: isRTL ? 'جديد' : 'New',
            value: stats.new,
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
        },
        {
            label: isRTL ? 'تم التواصل' : 'Contacted',
            value: stats.contacted,
            icon: PhoneIncoming,
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
        },
        {
            label: isRTL ? 'مؤهل' : 'Qualified',
            value: stats.qualified,
            icon: UserCheck,
            color: 'text-green-500',
            bg: 'bg-green-50 dark:bg-green-900/20',
        },
        {
            label: isRTL ? 'تم التحويل' : 'Converted',
            value: stats.converted,
            icon: CheckCircle,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        },
        {
            label: isRTL ? 'مغلق' : 'Closed',
            value: stats.closed,
            icon: CheckCircle, // Or XCircle depending on semantic
            color: 'text-slate-400',
            bg: 'bg-slate-100 dark:bg-slate-800',
        },
        {
            label: isRTL ? 'معدل التحويل' : 'Conversion Rate',
            value: `${stats.conversion_rate}%`,
            icon: CheckCircle,
            color: 'text-teal-500',
            bg: 'bg-teal-50 dark:bg-teal-900/20',
        },
        {
            label: isRTL ? 'اليوم' : 'Today',
            value: stats.today,
            icon: MessageSquare,
            color: 'text-purple-500',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
        },
        {
            label: isRTL ? 'هذا الأسبوع' : 'This Week',
            value: stats.this_week,
            icon: MessageSquare,
            color: 'text-purple-500',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
        },
        {
            label: isRTL ? 'هذا الشهر' : 'This Month',
            value: stats.this_month,
            icon: MessageSquare,
            color: 'text-purple-500',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {statItems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg}`}>
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="text-sm text-slate-500 font-medium truncate">{item.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    );
}
