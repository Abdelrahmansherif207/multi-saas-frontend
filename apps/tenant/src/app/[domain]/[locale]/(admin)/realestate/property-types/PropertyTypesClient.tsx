'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef, Badge } from '@/components/admin/ui';
import { Search, Building2, Tag } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { PropertyType } from './types';

interface PropertyTypesClientProps {
    initialData: PropertyType[];
    locale: string;
    subdomain: string;
}

export default function PropertyTypesClient({ initialData, locale, subdomain }: PropertyTypesClientProps) {
    const router = useRouter();
    const t = useTranslations('Admin.propertyTypes'); // You might need to add translations for this
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

    const columns: ColumnDef<PropertyType>[] = [
        {
            key: 'name',
            header: isRTL ? 'الاسم' : 'Name',
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                        <p className="text-xs text-slate-500">{row.description}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'slug',
            header: isRTL ? 'الرابط المختصر' : 'Slug',
            sortable: true,
            render: (value) => (
                <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span className="font-mono text-xs">{value}</span>
                </div>
            ),
        },
        {
            key: 'properties_count',
            header: isRTL ? 'عدد العقارات' : 'Properties',
            sortable: true,
            align: 'center',
            render: (value) => (
                <Badge variant="secondary">{value}</Badge>
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

    // Filter data 
    const filteredData = initialData ? initialData.filter(type => {
        return type.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            type.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? '-أنواع العقارات' : 'Property Types'}
                description={isRTL ? `${initialData.length || 0} أنواع عقارات في النظام` : `${initialData.length || 0} property types in the system`}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: isRTL ? 'أنواع العقارات' : 'Property Types' },
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
                    currentPage: 1,
                    totalPages: 1,
                    pageSize: filteredData.length,
                    totalItems: filteredData.length,
                }}
                emptyState={{
                    title: isRTL ? 'لا توجد أنواع عقارات' : 'No property types found',
                    description: isRTL ? 'لم يتم العثور على أنواع تتطابق مع معايير البحث' : 'No types match your search criteria',
                }}
                locale={locale}
            />
        </div>
    );
}
