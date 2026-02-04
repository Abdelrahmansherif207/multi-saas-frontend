'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { DataTable, ColumnDef, Badge, ActionButton, Modal } from '@/components/admin/ui';
import { Search, Layers, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { Amenity, Meta } from './types';

interface AmenitiesClientProps {
    initialData: Amenity[];
    meta: Meta;
    locale: string;
    subdomain: string;
}

export default function AmenitiesClient({ initialData, meta, locale, subdomain }: AmenitiesClientProps) {
    const router = useRouter();
    const t = useTranslations('Admin.amenities'); // Assuming translation exists or will fallback
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
            const apiBase = process.env.NEXT_PUBLIC_API_URL;
            await axios.delete(`${apiBase}/tenant/${subdomain}/admin/realestate/amenities/${deleteId}`, {
                headers: {
                    'X-Tenant-ID': subdomain,
                }
            });
            router.refresh();
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting amenity:', error);
            alert(isRTL ? 'حدث خطأ أثناء الحذف' : 'Error deleting amenity');
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: ColumnDef<Amenity>[] = [
        {
            key: 'name',
            header: isRTL ? 'الاسم' : 'Name',
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                        {row.icon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={row.icon} alt={value as string} className="w-6 h-6 object-contain" />
                        ) : (
                            <Layers className="w-5 h-5 text-slate-400" />
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                        <p className="text-xs text-slate-500">{row.slug}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'category',
            header: isRTL ? 'القسم' : 'Category',
            render: (value: string) => (
                <span className="capitalize text-slate-600 dark:text-slate-400">
                    {value || '-'}
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
                    <Link href={`/${locale}/dashboard/amenities/${row.id}`}>
                        <ActionButton variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />} />
                    </Link>
                    <Link href={`/${locale}/dashboard/amenities/${row.id}/edit`}>
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
    const filteredData = initialData ? initialData.filter(item => {
        return item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'المرافق' : 'Amenities'}
                description={isRTL ? 'إدارة المرافق والخدمات' : 'Manage amenities and services'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المرافق' : 'Amenities' },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/amenities/create`}>
                        <ActionButton variant="primary" icon={<Plus className="w-4 h-4" />}>
                            {isRTL ? 'إضافة مرفق' : 'Add Amenity'}
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
                    title: isRTL ? 'لا يوجد مرافق' : 'No amenities found',
                    description: isRTL ? 'لم يتم العثور على مرافق' : 'No amenities match your search criteria',
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
                            ? 'هل أنت متأكد أنك تريد حذف هذا المرفق؟ لا يمكن التراجع عن هذا الإجراء.'
                            : 'Are you sure you want to delete this amenity? This action cannot be undone.'}
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
