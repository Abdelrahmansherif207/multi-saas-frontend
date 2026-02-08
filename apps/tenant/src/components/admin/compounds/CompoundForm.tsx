'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import {
    Save, X, Building2, Loader2, Tag, FileText, ToggleLeft, ToggleRight, MapPin
} from 'lucide-react';

interface Compound {
    id: number;
    name: string;
    slug: string;
    area_id?: number;
    developer_id?: number;
    area?: { id: number; name: string };
    developer?: { id: number; name: string };
    title: string;
    description?: string;
    address?: string;
    latitude?: number | string;
    longitude?: number | string;
    construction_status?: 'planning' | 'under_construction' | 'completed';
    is_featured?: boolean;
    is_published?: boolean;
    total_units?: number;
    min_price?: number | string;
    max_price?: number | string;
    status?: boolean;
    created_at?: string;
    updated_at?: string;
}

interface CompoundFormData {
    area_id: number | '';
    developer_id: number | '';
    title: string;
    slug: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    construction_status: string;
    is_featured: boolean;
    is_published: boolean;
}

interface CompoundFormProps {
    compound?: Compound;
    locale: string;
    mode: 'create' | 'edit';
    subdomain?: string;
    authToken?: string | null;
    areas: { id: number; name: string }[];
    developers: { id: number; name: string }[];
}

export function CompoundForm({
    compound,
    locale,
    mode,
    subdomain: propSubdomain,
    authToken,
    areas,
    developers,
}: CompoundFormProps) {
    const router = useRouter();
    const params = useParams();
    const isRTL = locale === 'ar';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<CompoundFormData>({
        area_id: '',
        developer_id: '',
        title: '',
        slug: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        construction_status: 'planning',
        is_featured: false,
        is_published: true,
    });

    const subdomain = propSubdomain || (params.domain as string)?.split('.')[0] || '';
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    useEffect(() => {
        if (mode === 'edit' && compound) {
            setFormData({
                area_id: compound.area_id || '',
                developer_id: compound.developer_id || '',
                title: compound.name || '',
                slug: compound.slug || '',
                description: compound.description || '',
                address: compound.address || '',
                latitude: compound.latitude?.toString() || '',
                longitude: compound.longitude?.toString() || '',
                construction_status: compound.construction_status || 'planning',
                is_featured: compound.is_featured || false,
                is_published: compound.is_published ?? true,
            });
        }
    }, [mode, compound]);

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleInputChange = (field: keyof CompoundFormData, value: string | number | boolean) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };

            if (field === 'title' && mode === 'create') {
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
            area_id: Number(formData.area_id),
            developer_id: formData.developer_id ? Number(formData.developer_id) : null,
            title: formData.title,
            slug: formData.slug,
            description: formData.description || null,
            address: formData.address || null,
            latitude: formData.latitude ? Number(formData.latitude) : null,
            longitude: formData.longitude ? Number(formData.longitude) : null,
            construction_status: formData.construction_status,
            is_featured: formData.is_featured,
            is_published: formData.is_published,
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
            const url = mode === 'edit' && compound
                ? `${apiBase}/tenant/${subdomain}/admin/realestate/compounds/${compound.id}`
                : `${apiBase}/tenant/${subdomain}/admin/realestate/compounds`;

            const method = mode === 'edit' ? 'put' : 'post';

            await axios({
                method,
                url,
                data: payload,
                headers,
            });

            router.push(`/${locale}/dashboard/compounds`);
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
                            {/* Area */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <MapPin className="w-4 h-4" />
                                    {isRTL ? 'المنطقة' : 'Area'} *
                                </label>
                                <select
                                    value={formData.area_id}
                                    onChange={(e) => handleInputChange('area_id', Number(e.target.value) || '')}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                >
                                    <option value="">Select Area</option>
                                    {areas.map(area => (
                                        <option key={area.id} value={area.id}>{area.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Developer */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Building2 className="w-4 h-4" />
                                    {isRTL ? 'المطور' : 'Developer'}
                                </label>
                                <select
                                    value={formData.developer_id}
                                    onChange={(e) => handleInputChange('developer_id', e.target.value ? Number(e.target.value) : '')}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                >
                                    <option value="">Select Developer (Optional)</option>
                                    {developers.map(dev => (
                                        <option key={dev.id} value={dev.id}>{dev.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Building2 className="w-4 h-4" />
                                    {isRTL ? 'الاسم' : 'Title'} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    placeholder={isRTL ? 'أدخل اسم المجمع' : 'Enter compound name'}
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Tag className="w-4 h-4" />
                                    {isRTL ? 'الرابط' : 'Slug'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-sm"
                                    placeholder="auto-generated-slug"
                                />
                            </div>

                            {/* Construction Status */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <Building2 className="w-4 h-4" />
                                    {isRTL ? 'حالة الإنشاء' : 'Construction Status'}
                                </label>
                                <select
                                    value={formData.construction_status}
                                    onChange={(e) => handleInputChange('construction_status', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                >
                                    <option value="planning">{isRTL ? 'في المراحل التخطيطية' : 'Planning'}</option>
                                    <option value="under_construction">{isRTL ? 'قيد الإنشاء' : 'Under Construction'}</option>
                                    <option value="completed">{isRTL ? 'مكتمل' : 'Completed'}</option>
                                </select>
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

                            {/* Address */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <MapPin className="w-4 h-4" />
                                    {isRTL ? 'العنوان' : 'Address'}
                                </label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
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
                                    {isRTL ? 'منشور' : 'Published'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('is_published', !formData.is_published)}
                                    className="focus:outline-none"
                                >
                                    {formData.is_published ? (
                                        <ToggleRight className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <ToggleLeft className="w-6 h-6 text-slate-400" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isRTL ? 'مميز' : 'Featured'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('is_featured', !formData.is_featured)}
                                    className="focus:outline-none"
                                >
                                    {formData.is_featured ? (
                                        <ToggleRight className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <ToggleLeft className="w-6 h-6 text-slate-400" />
                                    )}
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
