'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { DataTable, ColumnDef, Badge, ActionButton } from '@/components/admin/ui';
import { Plus, Search, Building2, Tag, Loader2, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { PropertyType } from './types';

interface PropertyTypesClientProps {
    initialData: PropertyType[];
    locale: string;
    subdomain: string;
    authToken?: string | null;
}

export default function PropertyTypesClient({
    initialData,
    locale,
    subdomain,
    authToken
}: PropertyTypesClientProps) {
    const router = useRouter();
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleting, setDeleting] = useState<number | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<PropertyType | null>(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

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
            key: 'order',
            header: isRTL ? 'الترتيب' : 'Order',
            sortable: true,
            align: 'center',
            render: (value) => (
                <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>
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

    const handleRowAction = (action: 'view' | 'edit' | 'delete', row: PropertyType) => {
        switch (action) {
            case 'view':
                router.push(`/${locale}/dashboard/property-types/${row.id}`);
                break;
            case 'edit':
                router.push(`/${locale}/dashboard/property-types/${row.id}/edit`);
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
            await axios.delete(`${apiBase}/tenant/${subdomain}/admin/realestate/property-types/${deleteConfirm.id}`, { headers });
            setDeleteConfirm(null);
            router.refresh();
        } catch (error) {
            console.error('Error deleting property type:', error);
        } finally {
            setDeleting(null);
        }
    };

    // Filter data 
    const filteredData = initialData ? initialData.filter(type => {
        return type.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            type.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            type.description?.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'أنواع العقارات' : 'Property Types'}
                description={isRTL ? `${initialData.length || 0} أنواع عقارات في النظام` : `${initialData.length || 0} property types in the system`}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'أنواع العقارات' : 'Property Types' },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/property-types/create`}>
                        <ActionButton variant="primary" icon={<Plus className="w-4 h-4" />}>
                            {isRTL ? 'إضافة نوع عقار' : 'Add Property Type'}
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
                onRowAction={handleRowAction}
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

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {isRTL ? 'حذف نوع العقار' : 'Delete Property Type'}
                            </h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {isRTL
                                ? `هل أنت متأكد من حذف "${deleteConfirm.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`
                                : `Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
                        </p>
                        {deleteConfirm.properties_count > 0 && (
                            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-400 text-sm">
                                {isRTL
                                    ? `تحذير: هذا النوع يحتوي على ${deleteConfirm.properties_count} عقار.`
                                    : `Warning: This type has ${deleteConfirm.properties_count} properties associated.`}
                            </div>
                        )}
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
