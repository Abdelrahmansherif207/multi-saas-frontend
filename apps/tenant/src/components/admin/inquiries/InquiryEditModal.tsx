'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Modal, ActionButton } from '../ui';
import { Inquiry } from '@/app/[domain]/[locale]/(admin)/dashboard/inquiries/types';
import { Loader2 } from 'lucide-react';

interface InquiryEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    inquiry: Inquiry | null;
    subdomain: string;
    authToken?: string | null;
    locale: string;
}

export function InquiryEditModal({ isOpen, onClose, inquiry, subdomain, authToken, locale }: InquiryEditModalProps) {
    const router = useRouter();
    const isRTL = locale === 'ar';
    const [loading, setLoading] = useState(false);

    // Form state
    const [status, setStatus] = useState<string>('');
    const [adminNotes, setAdminNotes] = useState<string>('');
    const [agentId, setAgentId] = useState<string>('');

    // Initialize form when inquiry changes
    useEffect(() => {
        if (inquiry) {
            setStatus(inquiry.status);
            setAdminNotes(inquiry.admin_notes || '');
            setAgentId(inquiry.agent?.id.toString() || '');
        }
    }, [inquiry]);

    const handleSubmit = async () => {
        if (!inquiry) return;

        setLoading(true);
        try {
            const apiBase = process.env.NEXT_PUBLIC_API_URL;

            // Build payload with only changed or non-empty values
            const payload: any = {
                status,
                admin_notes: adminNotes,
            };

            if (agentId) {
                payload.agent_id = Number(agentId);
            }

            await axios.put(
                `${apiBase}/tenant/${subdomain}/admin/realestate/inquiries/${inquiry.id}`,
                payload,
                {
                    headers: {
                        'X-Tenant-ID': subdomain,
                        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
                    }
                }
            );

            router.refresh();
            onClose();
        } catch (error) {
            console.error('Error updating inquiry:', error);
            alert(isRTL ? 'حدث خطأ أثناء التحديث' : 'Error updating inquiry');
        } finally {
            setLoading(false);
        }
    };

    if (!inquiry) return null;

    const statusOptions = [
        { value: 'new', label: isRTL ? 'جديد' : 'New' },
        { value: 'contacted', label: isRTL ? 'تم التواصل' : 'Contacted' },
        { value: 'qualified', label: isRTL ? 'مؤهل' : 'Qualified' },
        { value: 'converted', label: isRTL ? 'تم التحويل' : 'Converted' },
        { value: 'closed', label: isRTL ? 'مغلق' : 'Closed' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isRTL ? 'تعديل الطلب' : 'Edit Inquiry'}
        >
            <div className="space-y-4">
                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {isRTL ? 'الحالة' : 'Status'}
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Admin Notes */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {isRTL ? 'ملاحظات المشرف' : 'Admin Notes'}
                    </label>
                    <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                        placeholder={isRTL ? 'أضف ملاحظات...' : 'Add notes...'}
                    />
                </div>

                {/* Agent ID */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {isRTL ? 'معرف الوكيل' : 'Agent ID'}
                    </label>
                    <input
                        type="number"
                        value={agentId}
                        onChange={(e) => setAgentId(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        placeholder={isRTL ? 'أدخل معرف الوكيل' : 'Enter agent ID'}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-6">
                    <ActionButton variant="ghost" onClick={onClose} disabled={loading}>
                        {isRTL ? 'إلغاء' : 'Cancel'}
                    </ActionButton>
                    <ActionButton
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
                    >
                        {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                    </ActionButton>
                </div>
            </div>
        </Modal>
    );
}
