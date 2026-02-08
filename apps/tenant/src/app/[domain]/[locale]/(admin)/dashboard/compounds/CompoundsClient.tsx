'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DataTable, ColumnDef, Badge, ActionButton, Modal } from '@/components/admin/ui';
import { Search, Building2, Eye, Edit, Trash2, Loader2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin';
import Link from 'next/link';
import { Compound, Meta } from './types';

interface CompoundsClientProps {
    initialData: Compound[];
    meta: Meta;
    locale: string;
    subdomain: string;
    authToken?: string | null;
}

export default function CompoundsClient({ initialData, meta, locale, subdomain, authToken }: CompoundsClientProps) {
    const router = useRouter();
    useTranslations('Admin.compounds');
    const isRTL = locale === 'ar';

    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        setDeleteError(null);

        // Extract subdomain from full domain if needed
        let subdomainToUse = subdomain;
        if (subdomainToUse.includes(':')) {
            // Remove port: mystore.localhost:3001 -> mystore.localhost
            subdomainToUse = subdomainToUse.split(':')[0];
        }
        if (subdomainToUse.includes('.')) {
            // Remove domain extension: mystore.localhost -> mystore
            subdomainToUse = subdomainToUse.split('.')[0];
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        headers['X-Tenant-ID'] = subdomainToUse;

        try {
            const url = `${apiBase}/tenant/${subdomainToUse}/admin/realestate/compounds/${deleteId}`;
            console.log('[CompoundsClient Delete]', { url, headers: { ...headers, Authorization: headers.Authorization ? '***' : 'undefined' } });
            
            await axios.delete(url, { headers });
            router.refresh();
            setDeleteId(null);
            setDeleteError(null);
        } catch (error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || 
                                (isRTL ? 'حدث خطأ أثناء الحذف' : 'Error deleting compound');
            setDeleteError(errorMessage);
            console.error('[CompoundsClient Delete Error]', { error, errorMessage });
        } finally {
            setIsDeleting(false);
        }
    };

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
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
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
        {
            key: 'actions',
            header: '',
            render: (_, row) => (
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/${locale}/dashboard/compounds/${row.id}`}>
                        <ActionButton variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />} />
                    </Link>
                    <Link href={`/${locale}/dashboard/compounds/${row.id}/edit`}>
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
    const filteredData = initialData ? initialData.filter(compound => {
        const name = compound.name || '';
        const slug = compound.slug || '';
        const search = searchQuery.toLowerCase();

        return name.toLowerCase().includes(search) ||
            slug.toLowerCase().includes(search);
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

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                title={isRTL ? 'تأكيد الحذف' : 'Confirm Delete'}
            >
                <div className="space-y-4">
                    {deleteError && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                            {deleteError}
                        </div>
                    )}
                    <p className="text-slate-600 dark:text-slate-400">
                        {isRTL
                            ? 'هل أنت متأكد أنك تريد حذف هذا المجمع؟ لا يمكن التراجع عن هذا الإجراء.'
                            : 'Are you sure you want to delete this compound? This action cannot be undone.'}
                    </p>
                    <div className="flex justify-end gap-3">
                        <ActionButton variant="outline" onClick={() => { setDeleteId(null); setDeleteError(null); }} disabled={isDeleting}>
                            {isRTL ? 'إلغاء' : 'Cancel'}
                        </ActionButton>
                        <ActionButton 
                            variant="danger" 
                            onClick={handleDelete} 
                            disabled={isDeleting}
                            icon={isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        >
                            {isDeleting ? (isRTL ? 'جاري الحذف...' : 'Deleting...') : (isRTL ? 'حذف' : 'Delete')}
                        </ActionButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
