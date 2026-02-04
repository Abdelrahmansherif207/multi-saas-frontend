'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { DataTable, ColumnDef, ActionButton, Modal } from '@/components/admin/ui';
import { Search, Eye, Trash2, Mail, Phone, Home, Building2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import { Inquiry, Meta, InquiryStatistics } from './types';
import { InquiryStats } from '@/components/admin/inquiries/InquiryStats';
import { InquiryStatusBadge } from '@/components/admin/inquiries/InquiryStatusBadge';

interface InquiriesClientProps {
    initialData: Inquiry[];
    meta: Meta;
    stats: InquiryStatistics;
    locale: string;
    subdomain: string;
}

export default function InquiriesClient({ initialData, meta, stats, locale, subdomain }: InquiriesClientProps) {
    const router = useRouter();
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tenant/${subdomain}/admin/realestate/inquiries/${deleteId}`, {
                headers: {
                    'X-Tenant-ID': subdomain,
                }
            });
            router.refresh();
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting inquiry:', error);
            alert(isRTL ? 'حدث خطأ أثناء الحذف' : 'Error deleting inquiry');
        } finally {
            setIsDeleting(false);
        }
    };

    const columns: ColumnDef<Inquiry>[] = [
        {
            key: 'name',
            header: isRTL ? 'العميل' : 'Customer',
            sortable: true,
            render: (value, row) => (
                <div>
                    <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {row.email}
                        </span>
                        {row.phone && (
                            <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {row.phone}
                            </span>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            header: isRTL ? 'الحالة' : 'Status',
            render: (_value, row) => (
                <InquiryStatusBadge status={row.status} label={row.status_label || row.status} />
            ),
        },
        {
            key: 'id', // Using ID as key but rendering related info
            header: isRTL ? 'مهتم بـ' : 'Interested In',
            render: (_value, row) => {
                if (row.property) {
                    return (
                        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <Home className="w-4 h-4 text-slate-400" />
                            <span className="truncate max-w-[150px]">{row.property.title}</span>
                        </div>
                    );
                }
                if (row.compound) {
                    return (
                        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <Building2 className="w-4 h-4 text-slate-400" />
                            <span className="truncate max-w-[150px]">{row.compound.name}</span>
                        </div>
                    );
                }
                return <span className="text-slate-400">-</span>;
            },
        },
        {
            key: 'created_at',
            header: isRTL ? 'التاريخ' : 'Date',
            sortable: true,
            render: (value) => (
                <span className="text-sm text-slate-500">
                    {new Date(value as string).toLocaleDateString(locale)}
                </span>
            ),
        },
        {
            key: 'actions',
            header: '',
            render: (_, row) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/${locale}/dashboard/inquiries/${row.id}`}>
                        <ActionButton variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />} />
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

    const filteredData = initialData ? initialData.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'طلب الاستفسار' : 'Inquiries'}
                description={isRTL ? 'إدارة طلبات العملاء العقارية' : 'Manage real estate customer inquiries'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'الطلبات' : 'Inquiries' },
                ]}
                locale={locale}
            />

            <InquiryStats stats={stats} isRTL={isRTL} />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className={`absolute w-4 h-4 text-slate-400 top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <input
                        type="text"
                        placeholder={isRTL ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'}
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
                    title: isRTL ? 'لا توجد طلبات' : 'No inquiries found',
                    description: isRTL ? 'لم يتم العثور على طلبات مطابقة' : 'No inquiries match your criteria',
                }}
                locale={locale}
            />

            <Modal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                title={isRTL ? 'تأكيد الحذف' : 'Confirm Delete'}
            >
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                        {isRTL
                            ? 'هل أنت متأكد أنك تريد حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.'
                            : 'Are you sure you want to delete this inquiry? This action cannot be undone.'}
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
