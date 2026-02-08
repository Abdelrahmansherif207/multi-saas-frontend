'use client';

import { useState } from 'react';
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
}

export default function PropertiesClient({
    initialData,
    meta,
    locale,
    subdomain,
    authToken
}: PropertiesClientProps) {
    const router = useRouter();
    const t = useTranslations('Admin.properties');
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterArea, setFilterArea] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [deleting, setDeleting] = useState<number | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<Property | null>(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const columns: ColumnDef<Property>[] = [
        {
            key: 'title',
            header: t('columns.name'),
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden">
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
        switch (action) {
            case 'view':
                router.push(`/${locale}/dashboard/properties/${row.id}`);
                break;
            case 'edit':
                router.push(`/${locale}/dashboard/properties/${row.id}/edit`);
                break;
            case 'delete':
                setDeleteConfirm(row);
                break;
        }
    };

    const handleDelete = async () => {
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

    // Filter data 
    const filteredData = initialData ? initialData.filter(property => {
        const matchesSearch = property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.compound?.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.compound?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !filterType || property.property_type?.id === Number(filterType);
        // Area is nested in compound
        const matchesArea = !filterArea || (property.compound as any)?.area?.id === Number(filterArea);
        const matchesStatus = !filterStatus || property.status === filterStatus;
        return matchesSearch && matchesType && matchesArea && matchesStatus;
    }) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('title')}
                description={isRTL ? `${meta?.total || 0} عقار في النظام` : `${meta?.total || 0} properties in the system`}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: t('title') },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/properties/create`}>
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
                    currentPage: meta?.current_page || 1,
                    totalPages: meta?.last_page || 1,
                    pageSize: meta?.per_page || 10,
                    totalItems: meta?.total || 0,
                }}
                emptyState={{
                    title: isRTL ? 'لا توجد عقارات' : 'No properties found',
                    description: isRTL ? 'لم يتم العثور على عقارات تطابق معايير البحث' : 'No properties match your search criteria',
                }}
                locale={locale}
            />

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
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
                                ? `هل أنت متأكد من حذف "${deleteConfirm.title}"؟ هذا الإجراء لا يمكن التراجع عنه.`
                                : `Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
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
