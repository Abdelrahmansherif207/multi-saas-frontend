'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { DataTable, ColumnDef, Badge, ActionButton } from '@/components/admin/ui';
import { mockProperties, MockProperty, formatCurrency, mockPropertyTypes, mockAreas } from '@/mocks/admin/properties';
import { Plus, Search, Filter, Building2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';

export default function PropertiesListPage() {
    const params = useParams();
    const locale = params.locale as string;
    const router = useRouter();
    const t = useTranslations('Admin.properties');              
    const tTable = useTranslations('Admin.table');
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterArea, setFilterArea] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
        available: 'success',
        pending: 'warning',
        sold: 'danger',
    };

    const statusLabel: Record<string, string> = {
        available: isRTL ? 'متاح' : 'Available',
        pending: isRTL ? 'قيد الانتظار' : 'Pending',
        sold: isRTL ? 'مباع' : 'Sold',
    };

    const columns: ColumnDef<MockProperty>[] = [
        {
            key: 'name',
            header: t('columns.name'),
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                        <p className="text-xs text-slate-500">{row.compound}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'type',
            header: t('columns.type'),
            sortable: true,
            render: (value) => (
                <Badge variant="secondary">{value}</Badge>
            ),
        },
        {
            key: 'area',
            header: t('columns.area'),
            sortable: true,
        },
        {
            key: 'developerPrice',
            header: t('columns.price'),
            sortable: true,
            align: 'right',
            render: (value) => (
                <span className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(value, locale)}
                </span>
            ),
        },
        {
            key: 'status',
            header: t('columns.status'),
            render: (value: string) => (
                <Badge variant={statusVariant[value]}>
                    {statusLabel[value]}
                </Badge>
            ),
        },
    ];

    const handleRowAction = (action: 'view' | 'edit' | 'delete', row: MockProperty) => {
        switch (action) {
            case 'view':
                router.push(`/${locale}/realestate/properties/${row.id}`);
                break;
            case 'edit':
                router.push(`/${locale}/realestate/properties/${row.id}/edit`);
                break;
            case 'delete':
                // Static UI - no actual delete
                console.log('Delete property:', row.id);
                break;
        }
    };

    // Filter data (static UI logic)
    const filteredData = mockProperties.filter(property => {
        const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.compound.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !filterType || property.typeId === filterType;
        const matchesArea = !filterArea || property.areaId === filterArea;
        const matchesStatus = !filterStatus || property.status === filterStatus;
        return matchesSearch && matchesType && matchesArea && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('title')}
                description={isRTL ? `${mockProperties.length} عقار في النظام` : `${mockProperties.length} properties in the system`}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: t('title') },
                ]}
                actions={
                    <Link href={`/${locale}/realestate/properties/create`}>
                        <ActionButton variant="primary" icon={<Plus className="w-4 h-4" />}>
                            {t('createProperty')}
                        </ActionButton>
                    </Link>
                }
                locale={locale}
            />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className={`absolute w-4 h-4 text-slate-400 top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <input
                        type="text"
                        placeholder={t('filters.search')}
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

                {/* Filter Dropdowns */}
                <div className="flex items-center gap-3">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                        <option value="">{t('filters.allTypes')}</option>
                        {mockPropertyTypes.map(type => (
                            <option key={type.id} value={type.id}>
                                {isRTL ? type.nameAr : type.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterArea}
                        onChange={(e) => setFilterArea(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                        <option value="">{t('filters.allAreas')}</option>
                        {mockAreas.map(area => (
                            <option key={area.id} value={area.id}>
                                {isRTL ? area.nameAr : area.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                        <option value="">{t('filters.allStatuses')}</option>
                        <option value="available">{statusLabel.available}</option>
                        <option value="pending">{statusLabel.pending}</option>
                        <option value="sold">{statusLabel.sold}</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                onRowAction={handleRowAction}
                pagination={{
                    currentPage: 1,
                    totalPages: 2,
                    pageSize: 10,
                    totalItems: filteredData.length,
                }}
                emptyState={{
                    title: isRTL ? 'لا توجد عقارات' : 'No properties found',
                    description: isRTL ? 'لم يتم العثور على عقارات تطابق معايير البحث' : 'No properties match your search criteria',
                }}
                locale={locale}
            />
        </div>
    );
}
