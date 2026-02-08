'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Trash2, Loader2 } from 'lucide-react';
import { ActionButton, Modal } from '../ui';
import { AreaDetailView } from './AreaDetailView';
import { Area } from '@/app/[domain]/[locale]/(admin)/dashboard/areas/types';

interface AreaDetailClientProps {
    area: Area;
    locale: string;
    subdomain: string;
    areaId: string;
    authToken?: string | null;
}

export function AreaDetailClient({
    area,
    locale,
    subdomain,
    areaId,
    authToken
}: AreaDetailClientProps) {
    const router = useRouter();
    const isRTL = locale === 'ar';
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    const handleDelete = async () => {
        setIsDeleting(true);

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
            await axios.delete(`${apiBase}/tenant/${subdomain}/admin/realestate/areas/${areaId}`, {
                headers
            });
            router.push(`/${locale}/dashboard/areas`);
            router.refresh();
        } catch (error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || 
                                (isRTL ? 'حدث خطأ أثناء الحذف' : 'Error deleting area');
            setDeleteError(errorMessage);
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div />
                <ActionButton
                    variant="danger"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                >
                    {isRTL ? 'حذف المنطقة' : 'Delete Area'}
                </ActionButton>
            </div>

            <AreaDetailView area={area} locale={locale} />

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
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
                            ? `هل أنت متأكد من حذف المنطقة "${area.name}"؟ لا يمكن التراجع عن هذا الإجراء.`
                            : `Are you sure you want to delete "${area.name}"? This action cannot be undone.`}
                    </p>
                    <div className="flex justify-end gap-3">
                        <ActionButton
                            variant="outline"
                            onClick={() => { setShowDeleteConfirm(false); setDeleteError(null); }}
                            disabled={isDeleting}
                        >
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
        </>
    );
}
