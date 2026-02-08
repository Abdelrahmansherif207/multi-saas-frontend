'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import {
    Save, X, Type, Loader2, Tag, FileText, Globe, Star, Image as ImageIcon
} from 'lucide-react';
import { Developer } from '@/app/[domain]/[locale]/(admin)/dashboard/developers/types';

interface DeveloperFormData {
    name: string;
    slug: string;
    description: string;
    logo: string;
    website: string;
    phone: string;
    email: string;
    status: boolean;
    order: number;
    is_featured: boolean;
    meta_title: string;
    meta_description: string;
}

interface DeveloperFormProps {
    developer?: Developer;
    locale: string;
    mode: 'create' | 'edit';
    subdomain?: string;
    authToken?: string | null;
}

export function DeveloperForm({
    developer,
    locale,
    mode,
    subdomain: propSubdomain,
    authToken
}: DeveloperFormProps) {
    const router = useRouter();
    const params = useParams();
    const isRTL = locale === 'ar';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<DeveloperFormData>({
        name: '',
        slug: '',
        description: '',
        logo: '',
        website: '',
        phone: '',
        email: '',
        status: true,
        order: 1,
        is_featured: false,
        meta_title: '',
        meta_description: '',
    });

    const subdomain = propSubdomain || (params.domain as string)?.split('.')[0] || '';
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    useEffect(() => {
        if (mode === 'edit' && developer) {
            setFormData({
                name: developer.name || '',
                slug: developer.slug || '',
                description: developer.description || '',
                logo: developer.logo || '',
                website: developer.website || '',
                phone: developer.phone || '',
                email: developer.email || '',
                status: developer.status ?? true,
                order: developer.order || 1,
                is_featured: developer.is_featured || false,
                meta_title: developer.meta_title || '',
                meta_description: developer.meta_description || '',
            });
        }
    }, [mode, developer]);

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleInputChange = (field: keyof DeveloperFormData, value: any) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            if (field === 'name' && mode === 'create') {
                updated.slug = generateSlug(value as string);
            }

            return updated;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            ...formData,
            order: Number(formData.order) || 1,
            website: formData.website || null,
            phone: formData.phone || null,
            email: formData.email || null,
        };

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
            const url = mode === 'edit' && developer
                ? `${apiBase}/tenant/${subdomain}/admin/realestate/developers/${developer.id}`
                : `${apiBase}/tenant/${subdomain}/admin/realestate/developers`;

            const method = mode === 'edit' ? 'put' : 'post';

            await axios({
                method,
                url,
                data: payload,
                headers,
            });

            router.push(`/${locale}/dashboard/developers`);
            router.refresh();
        } catch (err: any) {
            if (err.response?.data?.errors) {
                const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
                setError(errorMessages);
            } else {
                setError(err.response?.data?.message || (isRTL ? 'حدث خطأ أثناء الحفظ' : 'An error occurred while saving'));
            }
        } finally {
            setLoading(false);
        }
    };

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
                    <Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Type className="w-4 h-4" />
                                    {isRTL ? 'الاسم' : 'Name'} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    placeholder={isRTL ? 'أدخل اسم المطور' : 'Enter developer name'}
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Tag className="w-4 h-4" />
                                    {isRTL ? 'الرابط المختصر' : 'Slug'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-sm"
                                    placeholder="auto-generated-slug"
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Globe className="w-4 h-4" />
                                    {isRTL ? 'الموقع الإلكتروني' : 'Website'}
                                </label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    placeholder="https://"
                                />
                            </div>

                            {/* Order */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Tag className="w-4 h-4" />
                                    {isRTL ? 'الترتيب' : 'Order'}
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <FileText className="w-4 h-4" />
                                    {isRTL ? 'الوصف' : 'Description'}
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                />
                            </div>

                            {/* Logo URL (Temporary Text Input) */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <ImageIcon className="w-4 h-4" />
                                    {isRTL ? 'رابط الشعار' : 'Logo URL'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.logo}
                                    onChange={(e) => handleInputChange('logo', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                                {formData.logo && (
                                    <div className="mt-2 w-20 h-20 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.logo} alt="Preview" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* SEO */}
                    <Card title="SEO">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isRTL ? 'عنوان الميتا' : 'Meta Title'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.meta_title}
                                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isRTL ? 'وصف الميتا' : 'Meta Description'}
                                </label>
                                <textarea
                                    value={formData.meta_description}
                                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status & Featured */}
                    <Card>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isRTL ? 'الحالة' : 'Status'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('status', !formData.status)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${formData.status ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.status ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" />
                                    {isRTL ? 'مميز' : 'Featured'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('is_featured', !formData.is_featured)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${formData.is_featured ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_featured ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
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
                    {mode === 'create' ? (isRTL ? 'إضافة' : 'Create') : (isRTL ? 'حفظ' : 'Save')}
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
