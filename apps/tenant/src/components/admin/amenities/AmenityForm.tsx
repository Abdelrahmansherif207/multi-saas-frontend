'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import {
    Save, X, Type, Loader2, Tag, Layers, ToggleLeft, ToggleRight,
    Image as ImageIcon
} from 'lucide-react';
import { Amenity } from '@/app/[domain]/[locale]/(admin)/dashboard/amenities/types';

interface AmenityFormData {
    name: string;
    slug: string;
    icon: string;
    category: string;
    order: number;
    status: boolean;
}

interface AmenityFormProps {
    amenity?: Amenity;
    locale: string;
    mode: 'create' | 'edit';
    subdomain?: string;
    authToken?: string | null;
}

export function AmenityForm({
    amenity,
    locale,
    mode,
    subdomain: propSubdomain,
    authToken
}: AmenityFormProps) {
    const router = useRouter();
    const params = useParams();
    const isRTL = locale === 'ar';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<AmenityFormData>({
        name: '',
        slug: '',
        icon: '',
        category: 'compound',
        order: 1,
        status: true,
    });

    const subdomain = propSubdomain || (params.domain as string)?.split('.')[0] || '';
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (mode === 'edit' && amenity) {
            setFormData({
                name: amenity.name || '',
                slug: amenity.slug || '',
                icon: amenity.icon || '',
                category: amenity.category || 'compound',
                order: amenity.order || 1,
                status: amenity.status ?? true,
            });
        }
    }, [mode, amenity]);

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleInputChange = (field: keyof AmenityFormData, value: any) => {
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
            const url = mode === 'edit' && amenity
                ? `${apiBase}/tenant/${subdomain}/admin/realestate/amenities/${amenity.id}`
                : `${apiBase}/tenant/${subdomain}/admin/realestate/amenities`;

            const method = mode === 'edit' ? 'put' : 'post';

            console.log('[AmenityForm] Sending payload:', payload);

            await axios({
                method,
                url,
                data: payload,
                headers,
            });

            router.push(`/${locale}/dashboard/amenities`);
            router.refresh();
        } catch (err: any) {
            console.error('Error saving amenity:', err);
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

    const categoryOptions = [
        { value: 'compound', label: isRTL ? 'كمبوند' : 'Compound' },
        { value: 'property', label: isRTL ? 'عقار' : 'Property' },
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
                                    <Type className="w-4 h-4" />
                                    {isRTL ? 'الاسم' : 'Name'} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    placeholder={isRTL ? 'أدخل اسم المرفق' : 'Enter amenity name'}
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

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Layers className="w-4 h-4" />
                                    {isRTL ? 'القسم' : 'Category'}
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                >
                                    {categoryOptions.map(opt => (
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

                            {/* Icon URL (Text Input for now) */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <ImageIcon className="w-4 h-4" />
                                    {isRTL ? 'رابط الأيقونة' : 'Icon URL'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => handleInputChange('icon', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                />
                                {formData.icon && (
                                    <div className="mt-2 w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.icon} alt="Preview" className="w-8 h-8 object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
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
