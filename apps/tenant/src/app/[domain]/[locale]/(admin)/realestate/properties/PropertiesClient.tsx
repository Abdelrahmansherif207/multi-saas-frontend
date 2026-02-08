'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { DataTable, ColumnDef, Badge, ActionButton } from '@/components/admin/ui';
import { Plus, Search, Building2, Loader2, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { Property, Meta } from './types';

interface PropertiesClientProps {
    initialData: Property[];
    meta: Meta;
    locale: string;
    subdomain: string;
    authToken?: string | null;
    propertyTypes: any[];
    compounds: any[];
    initialFilters: {
        purpose: string;
        compound_id: string;
        property_type_id: string;
        search: string;
        page: number;
        per_page: number;
    };
}

export default function PropertiesClient({
    initialData,
    meta,
    locale,
    subdomain,
    authToken,
    propertyTypes,
    compounds,
    initialFilters
}: PropertiesClientProps) {
    const router = useRouter();
    const t = useTranslations('Admin.properties');
    const isRTL = locale === 'ar';

    // Debugging props
    console.log('[PropertiesClient] Props initialFilters:', JSON.stringify(initialFilters));
    console.log('[PropertiesClient] Props data length:', initialData.length);

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState(initialFilters.search);
    const [filterPurpose, setFilterPurpose] = useState(initialFilters.purpose);
    const [filterCompound, setFilterCompound] = useState(initialFilters.compound_id);
    const [filterType, setFilterType] = useState(initialFilters.property_type_id);

    // Sync state if props change (though key should handle this)
    useEffect(() => {
        console.log('[PropertiesClient] useEffect syncing initialFilters');
        setSearchQuery(initialFilters.search);
        setFilterPurpose(initialFilters.purpose);
        setFilterCompound(initialFilters.compound_id);
        setFilterType(initialFilters.property_type_id);
    }, [initialFilters]);

    const [deleting, setDeleting] = useState<number | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<Property | null>(null);

    console.log('[PropertiesClient] Rendered with filters:', initialFilters);
    console.log('[PropertiesClient] Data length:', initialData.length);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    // Update URL when filters change
    const updateFilters = (newFilters: Partial<typeof initialFilters>) => {
        const filters = {
            purpose: filterPurpose,
            compound_id: filterCompound,
            property_type_id: filterType,
            search: searchQuery,
            page: initialFilters.page,
            per_page: initialFilters.per_page,
            ...newFilters
        };

        const params = new URLSearchParams();
        if (filters.purpose) params.set('filter[purpose]', filters.purpose);
        if (filters.compound_id) params.set('filter[compound_id]', filters.compound_id);
        if (filters.property_type_id) params.set('filter[property_type_id]', filters.property_type_id);
        if (filters.search) params.set('search', filters.search);

        if (filters.page && filters.page > 1) params.set('page', String(filters.page));
        if (filters.per_page) params.set('per_page', String(filters.per_page));

        router.push(`?${params.toString()}`);
    };

    const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
        // ... existing statusVariant logic ...
        available: 'success',
        pending: 'warning',
        sold: 'danger',
    };

    const statusLabel: Record<string, string> = {
        available: isRTL ? 'متاح' : 'Available',
        pending: isRTL ? 'قيد الانتظار' : 'Pending',
        sold: isRTL ? 'مباع' : 'Sold',
    };

    const formatCurrency = (amount: number) => {
        // ... existing formatCurrency logic ...
        return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const columns: ColumnDef<Property>[] = [
        // ... existing columns logic ...
        {
            key: 'title',
            header: t('columns.name'),
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden">
                        {row.primary_image ? (
                            <img src={row.primary_image.urls.small} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <Building2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{row.title}</p>
                        <p className="text-xs text-slate-500">{row.compound?.name || row.compound?.slug || ''}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'property_type',
            header: t('columns.type'),
            sortable: true,
            render: (value) => (
                <Badge variant="secondary">{value?.name}</Badge>
            ),
        },
        {
            key: 'compound',
            header: t('columns.area'),
            sortable: true,
            render: (value) => (
                <span>{(value as any)?.area?.name || t('filters.allAreas')}</span>
            ),
        },
        {
            key: 'price',
            header: t('columns.price'),
            sortable: true,
            align: 'right',
            render: (value, row) => (
                <span className="font-medium text-slate-900 dark:text-white">
                    {row.price_formatted}
                </span>
            ),
        },
        {
            key: 'status',
            header: t('columns.status'),
            render: (value: string) => (
                <Badge variant={statusVariant[value] || 'secondary'}>
                    {statusLabel[value] || value}
                </Badge>
            ),
        },
    ];

    const handleRowAction = (action: 'view' | 'edit' | 'delete', row: Property) => {
        // ... existing handleRowAction logic ...
        switch (action) {
            case 'view':
                router.push(`/${locale}/realestate/properties/${row.id}`);
                break;
            case 'edit':
                router.push(`/${locale}/realestate/properties/${row.id}/edit`);
                break;
            case 'delete':
                setDeleteConfirm(row);
                break;
        }
    };

    const handleDelete = async () => {
        // ... existing handleDelete logic ...
        if (!deleteConfirm) return;
        setDeleting(deleteConfirm.id);

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        if (subdomain) {
            headers['X-Tenant-ID'] = subdomain;
        }

        try {
            await axios.delete(`${apiBase}/tenant/${subdomain}/admin/realestate/properties/${deleteConfirm.id}`, { headers });
            setDeleteConfirm(null);
            router.refresh();
        } catch (error) {
            console.error('Error deleting property:', error);
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('title')}
                description={isRTL ? `${meta?.total || 0} عقار في النظام` : `${meta?.total || 0} properties in the system`}
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
            <div className="flex flex-wrap items-center gap-3">
                <select
                    value={filterPurpose}
                    onChange={(e) => {
                        setFilterPurpose(e.target.value);
                        updateFilters({ purpose: e.target.value });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-w-[140px]"
                >
                    <option value="">{isRTL ? 'الغرض (الكل)' : 'Purpose (All)'}</option>
                    <option value="sale">{isRTL ? 'بيع' : 'Sale'}</option>
                    <option value="rent">{isRTL ? 'إيجار' : 'Rent'}</option>
                </select>

                <select
                    value={filterCompound}
                    onChange={(e) => {
                        setFilterCompound(e.target.value);
                        updateFilters({ compound_id: e.target.value });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-w-[160px]"
                >
                    <option value="">{isRTL ? 'الكمبوند (الكل)' : 'Compound (All)'}</option>
                    {compounds.map((c) => (
                        <option key={c.id} value={c.id}>{c.name || c.slug}</option>
                    ))}
                </select>

                <select
                    value={filterType}
                    onChange={(e) => {
                        setFilterType(e.target.value);
                        updateFilters({ property_type_id: e.target.value });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-w-[160px]"
                >
                    <option value="">{isRTL ? 'النوع (الكل)' : 'Type (All)'}</option>
                    {propertyTypes.map((pt) => (
                        <option key={pt.id} value={pt.id}>{pt.name}</option>
                    ))}
                </select>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={initialData}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                onRowAction={handleRowAction}
                pagination={{
                    currentPage: meta?.current_page || 1,
                    totalPages: meta?.last_page || 1,
                    pageSize: meta?.per_page || 15,
                    totalItems: meta?.total || 0,
                    onPageChange: (page) => updateFilters({ page }),
                    onPageSizeChange: (per_page) => updateFilters({ per_page, page: 1 }),
                }}
                emptyState={{
                    title: isRTL ? 'لا توجد عقارات' : 'No properties found',
                    description: isRTL ? 'لم يتم العثور على عقارات تطابق معايير البحث' : 'No properties match your search criteria',
                }}
                locale={locale}
            />

            {/* Delete Confirmation Modal */}
            {
                deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    {isRTL ? 'حذف العقار' : 'Delete Property'}
                                </h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                {isRTL
                                    ? `هل أنت متأكد من حذف "${deleteConfirm?.title || ''}"؟ هذا الإجراء لا يمكن التراجع عنه.`
                                    : `Are you sure you want to delete "${deleteConfirm?.title || ''}"? This action cannot be undone.`}
                            </p>
                            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting !== null}
                                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    {isRTL ? 'حذف' : 'Delete'}
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    disabled={deleting !== null}
                                    className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors disabled:opacity-50"
                                >
                                    {isRTL ? 'إلغاء' : 'Cancel'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}
