'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import { Save, X, Loader2, User, Mail, Phone, FileText, Tag } from 'lucide-react';
import { Inquiry } from '@/app/[domain]/[locale]/(admin)/dashboard/inquiries/types';

interface InquiryFormData {
    status: string;
    admin_notes: string;
    agent_id: string;
}

interface InquiryFormProps {
    inquiry?: Inquiry;
    locale: string;
    mode: 'edit';
    subdomain: string;
    authToken?: string | null;
}

export function InquiryForm({
    inquiry,
    locale,
    mode,
    subdomain,
    authToken
}: InquiryFormProps) {
    const router = useRouter();
    const isRTL = locale === 'ar';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<InquiryFormData>({
        status: 'new',
        admin_notes: '',
        agent_id: '',
    });

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    useEffect(() => {
        if (inquiry) {
            setFormData({
                status: inquiry.status || 'new',
                admin_notes: inquiry.admin_notes || '',
                agent_id: inquiry.agent?.id.toString() || '',
            });
        }
    }, [inquiry]);

    const handleInputChange = (field: keyof InquiryFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload: any = {
            status: formData.status,
            admin_notes: formData.admin_notes,
        };

        if (formData.agent_id) {
            payload.agent_id = Number(formData.agent_id);
        }

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
            const url = `${apiBase}/tenant/${subdomain}/admin/realestate/inquiries/${inquiry?.id}`;

            await axios.put(url, payload, { headers });

            router.push(`/${locale}/dashboard/inquiries`);
            router.refresh();
        } catch (err) {
            const axiosError = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string } } };
            if (axiosError.response?.data?.errors) {
                const errorMessages = Object.values(axiosError.response.data.errors).flat().join(', ');
                setError(errorMessages);
            } else {
                setError(axiosError.response?.data?.message || (isRTL ? 'حدث خطأ أثناء الحفظ' : 'An error occurred while saving'));
            }
        } finally {
            setLoading(false);
        }
    };

    const statusOptions = [
        { value: 'new', label: isRTL ? 'جديد' : 'New' },
        { value: 'contacted', label: isRTL ? 'تم التواصل' : 'Contacted' },
        { value: 'qualified', label: isRTL ? 'مؤهل' : 'Qualified' },
        { value: 'converted', label: isRTL ? 'تم التحويل' : 'Converted' },
        { value: 'closed', label: isRTL ? 'مغلق' : 'Closed' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Info (Read-only) */}
                    <Card title={isRTL ? 'معلومات العميل' : 'Customer Information'}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <User className="w-4 h-4" />
                                    {isRTL ? 'الاسم' : 'Name'}
                                </label>
                                <div className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                                    {inquiry?.name || '-'}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Mail className="w-4 h-4" />
                                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                                </label>
                                <div className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                                    {inquiry?.email || '-'}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Phone className="w-4 h-4" />
                                    {isRTL ? 'الهاتف' : 'Phone'}
                                </label>
                                <div className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                                    {inquiry?.phone || '-'}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <FileText className="w-4 h-4" />
                                    {isRTL ? 'الرسالة' : 'Message'}
                                </label>
                                <div className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                                    {inquiry?.message || '-'}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Editable Fields */}
                    <Card title={isRTL ? 'تفاصيل الإدارة' : 'Management Details'}>
                        <div className="space-y-4">
                            {/* Admin Notes */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <FileText className="w-4 h-4" />
                                    {isRTL ? 'ملاحظات الإدارة' : 'Admin Notes'}
                                </label>
                                <textarea
                                    value={formData.admin_notes}
                                    onChange={(e) => handleInputChange('admin_notes', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                    placeholder={isRTL ? 'أدخل ملاحظات الإدارة' : 'Enter admin notes'}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <Card title={isRTL ? 'الحالة' : 'Status'}>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <Tag className="w-4 h-4" />
                                {isRTL ? 'حالة الاستفسار' : 'Inquiry Status'}
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            >
                                {statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </Card>

                    {/* Agent Assignment */}
                    <Card title={isRTL ? 'تعيين الوكيل' : 'Agent Assignment'}>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <User className="w-4 h-4" />
                                {isRTL ? 'معرف الوكيل' : 'Agent ID'}
                            </label>
                            <input
                                type="text"
                                value={formData.agent_id}
                                onChange={(e) => handleInputChange('agent_id', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                placeholder={isRTL ? 'أدخل معرف الوكيل' : 'Enter agent ID'}
                            />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Actions */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ActionButton
                    type="submit"
                    variant="primary"
                    icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    disabled={loading}
                >
                    {isRTL ? 'حفظ' : 'Save'}
                </ActionButton>
                <ActionButton
                    type="button"
                    variant="outline"
                    icon={<X className="w-4 h-4" />}
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    {isRTL ? 'إلغاء' : 'Cancel'}
                </ActionButton>
            </div>
        </form>
    );
}
