'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef, Badge } from '@/components/admin/ui';
import { Search, MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { Inquiry, Meta } from './types';

interface InquiriesClientProps {
    initialData: Inquiry[];
    meta: Meta;
    locale: string;
    subdomain: string;
}

export default function InquiriesClient({ initialData, meta, locale, subdomain }: InquiriesClientProps) {
    const router = useRouter();
    const t = useTranslations('Admin.inquiries');
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
        new: 'danger',
        read: 'warning',
        contacted: 'success',
        archived: 'default'
    };

    const columns: ColumnDef<Inquiry>[] = [
        {
            key: 'name',
            header: isRTL ? 'بيانات العميل' : 'Customer Details',
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Mail className="w-3 h-3" />
                            <span>{row.email}</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'phone',
            header: isRTL ? 'الهاتف' : 'Phone',
            render: (value) => (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium" dir="ltr">{value}</span>
                </div>
            ),
        },
        {
            key: 'created_at',
            header: isRTL ? 'التاريخ' : 'Date',
            sortable: true,
            render: (value) => (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-sm">{new Date(value).toLocaleDateString(locale)}</span>
                </div>
            ),
        },
        {
            key: 'status',
            header: isRTL ? 'الحالة' : 'Status',
            render: (value: string) => (
                <Badge variant={statusVariant[value] || 'secondary'} className="capitalize">
                    {value}
                </Badge>
            ),
        },
    ];

    // Client-side filtering
    const filteredData = initialData ? initialData.filter(inquiry => {
        return inquiry.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inquiry.email?.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'الاستفسارات' : 'Inquiries'}
                description={isRTL ? `${meta?.total || 0} استفسار جديد` : `${meta?.total || 0} new inquiries`}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: isRTL ? 'الاستفسارات' : 'Inquiries' },
                ]}
                locale={locale}
            />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className={`absolute w-4 h-4 text-slate-400 top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <input
                        type="text"
                        placeholder={isRTL ? 'بحث بالاسم او البريد...' : 'Search by name or email...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`
                            w-full py-2.5 px-4 rounded-xl
                            bg-white dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            text-slate-900 dark:text-white
                            placeholder-slate-400
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                            ${isRTL ? 'pr-10' : 'pl-10'}
                        `}
                    />
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                pagination={{
                    currentPage: meta?.current_page || 1,
                    totalPages: meta?.last_page || 1,
                    pageSize: meta?.per_page || 15,
                    totalItems: meta?.total || 0,
                }}
                emptyState={{
                    title: isRTL ? 'لا توجد استفسارات' : 'No inquiries found',
                    description: isRTL ? 'لم يتم العثور على استفسارات تتطابق مع معايير البحث' : 'No inquiries match your search criteria',
                }}
                locale={locale}
            />
        </div>
    );
}
