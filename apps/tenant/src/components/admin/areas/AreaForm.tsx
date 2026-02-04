'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import {
    Save, X, MapPin, Loader2, Tag, FileText, ToggleLeft, ToggleRight,
    Globe, Star, Search, Image as ImageIcon
} from 'lucide-react';
import { Area } from '@/app/[domain]/[locale]/(admin)/dashboard/areas/types';

interface AreaFormData {
    name: string;
    slug: string;
    description: string;
    type: string;
    latitude: string;
    longitude: string;
    image: string;
    is_featured: boolean;
    status: boolean;
    meta_title: string;
    meta_description: string;
    order: number;
}

interface AreaFormProps {
    area?: Area;
    locale: string;
    mode: 'create' | 'edit';
    subdomain?: string;
    authToken?: string | null;
}

export function AreaForm({
    area,
    locale,
    mode,
    subdomain: propSubdomain,
    authToken
}: AreaFormProps) {
    const router = useRouter();
    const params = useParams();
    const isRTL = locale === 'ar';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<AreaFormData>({
        name: '',
        slug: '',
        description: '',
        type: 'area',
        latitude: '',
        longitude: '',
        image: '',
        is_featured: false,
        status: true,
        meta_title: '',
        meta_description: '',
        order: 1,
    });

    const subdomain = propSubdomain || (params.domain as string)?.split('.')[0] || '';
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    useEffect(() => {
        if (mode === 'edit' && area) {
            setFormData({
                name: area.name || '',
                slug: area.slug || '',
                description: area.description || '',
                type: area.type || 'area',
                latitude: area.latitude || '',
                longitude: area.longitude || '',
                image: area.image || '',
                is_featured: area.is_featured || false,
                status: area.status ?? true,
                meta_title: area.meta_title || '',
                meta_description: area.meta_description || '',
                order: area.order || 1,
            });
        }
    }, [mode, area]);

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleInputChange = (field: keyof AreaFormData, value: any) => {
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
            const url = mode === 'edit' && area
                ? `${apiBase}/tenant/${subdomain}/admin/realestate/areas/${area.id}`
                : `${apiBase}/tenant/${subdomain}/admin/realestate/areas`;

            const method = mode === 'edit' ? 'put' : 'post';

            console.log('[AreaForm] Sending payload:', payload);

            await axios({
                method,
                url,
                data: payload,
                headers,
            });

            router.push(`/${locale}/dashboard/areas`);
            router.refresh();
        } catch (err: any) {
            console.error('Error saving area:', err);
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

    const typeOptions = [
        { value: 'area', label: isRTL ? 'منطقة' : 'Area' },
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
                    <Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <MapPin className="w-4 h-4" />
                                    {isRTL ? 'الاسم' : 'Name'} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    placeholder={isRTL ? 'أدخل اسم المنطقة' : 'Enter area name'}
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

                            {/* Type */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Globe className="w-4 h-4" />
                                    {isRTL ? 'النوع' : 'Type'}
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                >
                                    {typeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
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

                    {/* Location */}
                    <Card title={isRTL ? 'الموقع' : 'Location'}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isRTL ? 'خط العرض' : 'Latitude'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.latitude}
                                    onChange={(e) => handleInputChange('latitude', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isRTL ? 'خط الطول' : 'Longitude'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.longitude}
                                    onChange={(e) => handleInputChange('longitude', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                />
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
