'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef, Badge } from '@/components/admin/ui';
import { Search, Building } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { Compound, Meta } from './types';

interface CompoundsClientProps {
    initialData: Compound[];
    meta: Meta;
    locale: string;
    subdomain: string;
}

export default function CompoundsClient({ initialData, meta, locale, subdomain }: CompoundsClientProps) {
    const router = useRouter();
    const t = useTranslations('Admin.compounds');
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
        true: 'success',
        false: 'danger',
    };

    const statusLabel: Record<string, string> = {
        true: isRTL ? 'نشط' : 'Active',
        false: isRTL ? 'غير نشط' : 'Inactive',
    };

    const columns: ColumnDef<Compound>[] = [
        {
            key: 'name',
            header: isRTL ? 'الاسم' : 'Name',
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center">
                        <Building className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                        <p className="text-xs text-slate-500">{row.slug}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            header: isRTL ? 'الحالة' : 'Status',
            render: (value: boolean) => (
                <Badge variant={statusVariant[String(value)] || 'secondary'}>
                    {statusLabel[String(value)]}
                </Badge>
            ),
        },
    ];

    // Client-side filtering
    const filteredData = initialData ? initialData.filter(compound => {
        return compound.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            compound.slug.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'الكمبوندات' : 'Compounds'}
                description={isRTL ? `${meta?.total || 0} كمبوند في النظام` : `${meta?.total || 0} compounds in the system`}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'الكمبوندات' : 'Compounds' },
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
                        placeholder={isRTL ? 'بحث بالاسم...' : 'Search by name...'}
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
                    title: isRTL ? 'لا توجد كمبوندات' : 'No compounds found',
                    description: isRTL ? 'لم يتم العثور على كمبوندات تتطابق مع معايير البحث' : 'No compounds match your search criteria',
                }}
                locale={locale}
            />
        </div>
    );
}
