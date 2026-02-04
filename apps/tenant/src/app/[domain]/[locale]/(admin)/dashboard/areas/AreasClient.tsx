'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { DataTable, ColumnDef, Badge, ActionButton, Modal } from '@/components/admin/ui';
import { Search, MapPin, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { AreaStats } from '@/components/admin/areas';
import { Area, Meta, AreaStatistics } from './types';

interface AreasClientProps {
    initialData: Area[];
    stats: AreaStatistics;
    meta: Meta;
    locale: string;
    subdomain: string;
}

export default function AreasClient({ initialData, stats, meta, locale, subdomain }: AreasClientProps) {
    const router = useRouter();
    const t = useTranslations('Admin.areas');
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
        true: 'success',
        false: 'danger',
    };

    const statusLabel: Record<string, string> = {
        true: isRTL ? 'نشط' : 'Active',
        false: isRTL ? 'غير نشط' : 'Inactive',
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1'}/tenant/${subdomain}/admin/realestate/areas/${deleteId}`, {
                headers: {
                    'X-Tenant-ID': subdomain,
                }
            });
            router.refresh();
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting area:', error);
            alert(isRTL ? 'حدث خطأ أثناء الحذف' : 'Error deleting area');
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: ColumnDef<Area>[] = [
        {
            key: 'name',
            header: isRTL ? 'الاسم' : 'Name',
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                        <p className="text-xs text-slate-500">{row.slug}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'type',
            header: isRTL ? 'النوع' : 'Type',
            sortable: true,
            render: (value) => (
                <Badge variant="secondary" className="capitalize">{value}</Badge>
            ),
        },
        {
            key: 'parent_id',
            header: isRTL ? 'تابع لـ' : 'Parent',
            render: (value, row) => (
                <span className="text-sm text-slate-600 dark:text-slate-400">
                    {row.parent?.name || '-'}
                </span>
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
        {
            key: 'actions',
            header: '',
            render: (_, row) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/${locale}/dashboard/areas/${row.id}`}>
                        <ActionButton variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />} />
                    </Link>
                    <Link href={`/${locale}/dashboard/areas/${row.id}/edit`}>
                        <ActionButton variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />} />
                    </Link>
                    <ActionButton
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 className="w-4 h-4 text-red-500" />}
                        onClick={() => setDeleteId(row.id)}
                    />
                </div>
            ),
        },
    ];

    // Client-side filtering
    const filteredData = initialData ? initialData.filter(area => {
        return area.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            area.type?.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'المناطق' : 'Areas'}
                description={isRTL ? 'إدارة المناطق والمحافظات والمدن' : 'Manage areas, governorates, and cities'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المناطق' : 'Areas' },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/areas/create`}>
                        <ActionButton variant="primary" icon={<Plus className="w-4 h-4" />}>
                            {isRTL ? 'إضافة منطقة' : 'Add Area'}
                        </ActionButton>
                    </Link>
                }
                locale={locale}
            />

            {/* Statistics */}
            {stats && <AreaStats stats={stats} isRTL={isRTL} />}

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
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
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
                    title: isRTL ? 'لا توجد مناطق' : 'No areas found',
                    description: isRTL ? 'لم يتم العثور على مناطق تتطابق مع معايير البحث' : 'No areas match your search criteria',
                }}
                locale={locale}
            />

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                title={isRTL ? 'تأكيد الحذف' : 'Confirm Delete'}
            >
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                        {isRTL
                            ? 'هل أنت متأكد أنك تريد حذف هذه المنطقة؟ لا يمكن التراجع عن هذا الإجراء.'
                            : 'Are you sure you want to delete this area? This action cannot be undone.'}
                    </p>
                    <div className="flex justify-end gap-3">
                        <ActionButton variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
                            {isRTL ? 'إلغاء' : 'Cancel'}
                        </ActionButton>
                        <ActionButton variant="danger" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? (isRTL ? 'جاري الحذف...' : 'Deleting...') : (isRTL ? 'حذف' : 'Delete')}
                        </ActionButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
