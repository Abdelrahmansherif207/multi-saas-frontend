'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import { FormInput } from '../ui/FormInput';
import { Save, X, Building2, Loader2, Tag, ListOrdered, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import { PropertyType } from '@/app/[domain]/[locale]/(admin)/dashboard/property-types/types';

interface PropertyTypeFormData {
    name: string;
    slug: string;
    description: string;
    icon: string;
    order: number;
    status: boolean;
}

interface PropertyTypeFormProps {
    propertyType?: PropertyType;
    locale: string;
    mode: 'create' | 'edit';
    subdomain?: string;
    authToken?: string | null;
}

export function PropertyTypeForm({
    propertyType,
    locale,
    mode,
    subdomain: propSubdomain,
    authToken
}: PropertyTypeFormProps) {
    const router = useRouter();
    const params = useParams();
    const isRTL = locale === 'ar';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<PropertyTypeFormData>({
        name: '',
        slug: '',
        description: '',
        icon: '',
        order: 1,
        status: true,
    });

    // Get subdomain
    const subdomain = propSubdomain || (params.domain as string)?.split('.')[0] || '';
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    // Initialize form data from propertyType in edit mode
    useEffect(() => {
        if (mode === 'edit' && propertyType) {
            setFormData({
                name: propertyType.name || '',
                slug: propertyType.slug || '',
                description: propertyType.description || '',
                icon: propertyType.icon || '',
                order: propertyType.order || 1,
                status: propertyType.status ?? true,
            });
        }
    }, [mode, propertyType]);

    // Auto-generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleInputChange = (field: keyof PropertyTypeFormData, value: any) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            // Auto-generate slug when name changes
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

        // Sanitize data before sending (e.g., ensure numbers are numbers)
        const payload = {
            ...formData,
            order: Number(formData.order) || 1,
            // Ensure strings are not empty/undefined if required, though native 'required' handles some
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
            const url = mode === 'edit' && propertyType
                ? `${apiBase}/tenant/${subdomain}/admin/realestate/property-types/${propertyType.id}`
                : `${apiBase}/tenant/${subdomain}/admin/realestate/property-types`;

            const method = mode === 'edit' ? 'put' : 'post';

            await axios({
                method,
                url,
                data: payload,
                headers,
            });

            router.push(`/${locale}/dashboard/property-types`);
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

    const iconOptions = [
        'apartment', 'villa', 'townhouse', 'twin-house', 'duplex',
        'penthouse', 'studio', 'chalet', 'office', 'shop', 'land', 'warehouse'
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Card className="p-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <Building2 className="w-4 h-4" />
                            {isRTL ? 'الاسم' : 'Name'} *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            placeholder={isRTL ? 'أدخل الاسم' : 'Enter name'}
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
                            name="slug"
                            value={formData.slug}
                            onChange={(e) => handleInputChange('slug', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono text-sm"
                            placeholder={isRTL ? 'الرابط المختصر' : 'auto-generated-slug'}
                        />
                    </div>

                    {/* Icon */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <Building2 className="w-4 h-4" />
                            {isRTL ? 'الأيقونة' : 'Icon'}
                        </label>
                        <select
                            name="icon"
                            value={formData.icon}
                            onChange={(e) => handleInputChange('icon', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            <option value="">{isRTL ? 'اختر أيقونة' : 'Select icon'}</option>
                            {iconOptions.map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                            ))}
                        </select>
                    </div>

                    {/* Order */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <ListOrdered className="w-4 h-4" />
                            {isRTL ? 'الترتيب' : 'Order'}
                        </label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 1)}
                            min={1}
                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>

                    {/* Description - Full width */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <FileText className="w-4 h-4" />
                            {isRTL ? 'الوصف' : 'Description'}
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                            placeholder={isRTL ? 'أدخل الوصف' : 'Enter description'}
                        />
                    </div>

                    {/* Status Toggle */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {formData.status ? <ToggleRight className="w-4 h-4 text-green-500" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                            {isRTL ? 'الحالة' : 'Status'}
                        </label>
                        <button
                            type="button"
                            onClick={() => handleInputChange('status', !formData.status)}
                            className={`
                                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${formData.status ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}
                            `}
                        >
                            <span
                                className={`
                                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                    ${formData.status ? 'translate-x-6' : 'translate-x-1'}
                                `}
                            />
                        </button>
                        <span className={`ml-3 text-sm ${formData.status ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                            {formData.status ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className={`flex gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <ActionButton
                        type="submit"
                        variant="primary"
                        icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        disabled={loading}
                    >
                        {loading
                            ? (isRTL ? 'جاري الحفظ...' : 'Saving...')
                            : mode === 'edit'
                                ? (isRTL ? 'حفظ التغييرات' : 'Save Changes')
                                : (isRTL ? 'إنشاء' : 'Create')
                        }
                    </ActionButton>
                    <ActionButton
                        type="button"
                        variant="secondary"
                        icon={<X className="w-4 h-4" />}
                        onClick={() => router.push(`/${locale}/dashboard/property-types`)}
                        disabled={loading}
                    >
                        {isRTL ? 'إلغاء' : 'Cancel'}
                    </ActionButton>
                </div>
            </Card>
        </form>
    );
}
