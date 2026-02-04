'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { FormTextarea } from '../ui/FormTextarea';
import { Card } from '../ui/Card';
import { ActionButton } from '../ui/ActionButton';
import { Save, X, Building2, MapPin, DollarSign, Loader2, Plus, Check, Info } from 'lucide-react';

// Types for API data
interface PropertyType {
    id: number;
    name: string;
    slug: string;
}

interface Compound {
    id: number;
    name: string | null;
    slug: string;
}

interface Amenity {
    id: number;
    name: string;
    slug: string;
    icon: string;
    category: string;
}

interface PropertyFormData {
    compound_id: number | null;
    property_type_id: number | null;
    title: string;
    slug?: string;
    description?: string;
    price: number;
    currency?: string;
    listing_type?: 'sale' | 'rent';
    payment_option?: 'cash' | 'installment' | 'both';
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    area_unit?: 'sqm' | 'sqft';
    finishing?: 'finished' | 'semi_finished' | 'unfinished' | 'furnished';
    is_featured?: boolean;
    is_published?: boolean;
    amenity_ids?: number[];
}

interface PropertyFormProps {
    property?: any;
    locale: string;
    mode: 'create' | 'edit';
    subdomain?: string;
    authToken?: string | null;
}

export function PropertyForm({
    property,
    locale,
    mode,
    subdomain: propSubdomain,
    authToken
}: PropertyFormProps) {
    const t = useTranslations('Admin.properties.form');
    const tCommon = useTranslations('Admin.common');
    const router = useRouter();
    const params = useParams();
    const isRTL = locale === 'ar';

    // Get subdomain from URL or prop
    const subdomain = propSubdomain || (params?.domain as string)?.split('.')[0] || '';

    // State for form data
    const [formData, setFormData] = useState<PropertyFormData>({
        compound_id: property?.compound?.id || null,
        property_type_id: property?.property_type?.id || null,
        title: property?.title || '',
        description: property?.description || '',
        price: property?.price ? parseFloat(property.price) : 0,
        bedrooms: property?.bedrooms || undefined,
        bathrooms: property?.bathrooms || undefined,
        area: property?.area_formatted ? parseFloat(property.area_formatted) : undefined,
        is_featured: property?.is_featured || false,
        is_published: property?.is_published !== false,
        amenity_ids: property?.amenities?.map((a: any) => a.id) || [],
    });

    // State for dropdown options
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
    const [compounds, setCompounds] = useState<Compound[]>([]);
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAmenityModalOpen, setIsAmenityModalOpen] = useState(false);
    const [isCreatingAmenity, setIsCreatingAmenity] = useState(false);
    const [newAmenity, setNewAmenity] = useState({
        name: '',
        slug: '',
        icon: 'building',
        category: 'property',
        order: 0,
        status: true
    });

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

    // Fetch dropdown data on mount
    useEffect(() => {
        const init = async () => {
            if (!subdomain) {
                console.warn('[PropertyForm] No subdomain provided, skipping fetch');
                return;
            }
            await fetchDropdownData(subdomain, authToken);
        };

        init();
    }, [subdomain, apiBase, authToken]);

    const fetchDropdownData = async (sd: string, token?: string | null) => {
        setLoading(true);
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        if (sd) {
            headers['X-Tenant-ID'] = sd;
        }

        try {
            const [typesRes, compoundsRes, amenitiesRes] = await Promise.all([
                axios.get(`${apiBase}/tenant/${sd}/admin/realestate/property-types`, { headers }),
                axios.get(`${apiBase}/tenant/${sd}/admin/realestate/compounds`, { headers }),
                axios.get(`${apiBase}/tenant/${sd}/admin/realestate/amenities`, { headers }),
            ]);

            if (typesRes.data?.data) {
                setPropertyTypes(typesRes.data.data);
            }
            if (compoundsRes.data?.data) {
                setCompounds(compoundsRes.data.data);
            }
            if (amenitiesRes.data?.data) {
                setAmenities(amenitiesRes.data.data);
            }
        } catch (err: any) {
            console.error('[PropertyForm] Error fetching dropdown data:', err?.response?.status);
        } finally {
            setLoading(false);
        }
    };

    const propertyTypeOptions = propertyTypes.map(type => ({
        value: String(type.id),
        label: type.name,
    }));

    const compoundOptions = compounds.map(compound => ({
        value: String(compound.id),
        label: compound.name || compound.slug,
    }));

    const bedroomOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5+' },
    ];

    const bathroomOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4+' },
    ];

    const handleInputChange = (field: keyof PropertyFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAmenityToggle = (id: number) => {
        setFormData(prev => {
            const currentIds = prev.amenity_ids || [];
            const newIds = currentIds.includes(id)
                ? currentIds.filter(i => i !== id)
                : [...currentIds, id];
            return { ...prev, amenity_ids: newIds };
        });
    };

    const handleCreateAmenity = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreatingAmenity(true);

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
        if (subdomain) headers['X-Tenant-ID'] = subdomain;

        try {
            const res = await axios.post(
                `${apiBase}/tenant/${subdomain}/admin/realestate/amenities`,
                newAmenity,
                { headers }
            );

            if (res.data?.data) {
                const createdAmenity = res.data.data;
                // Refetch to ensure all data is consistent
                await fetchDropdownData(subdomain, authToken);

                // Select the newly created amenity
                setFormData(prev => ({
                    ...prev,
                    amenity_ids: [...(prev.amenity_ids || []), createdAmenity.id]
                }));

                // Reset modal
                setIsAmenityModalOpen(false);
                setNewAmenity({
                    name: '',
                    slug: '',
                    icon: 'building',
                    category: 'property',
                    order: 0,
                    status: true
                });
            }
        } catch (err: any) {
            console.error('Error creating amenity:', err);
            alert(err?.response?.data?.message || 'Failed to create amenity');
        } finally {
            setIsCreatingAmenity(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

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
            if (mode === 'create') {
                await axios.post(
                    `${apiBase}/tenant/${subdomain}/admin/realestate/properties`,
                    formData,
                    { headers }
                );
            } else {
                await axios.put(
                    `${apiBase}/tenant/${subdomain}/admin/realestate/properties/${property.id}`,
                    formData,
                    { headers }
                );
            }
            router.push(`/${locale}/realestate/properties`);
            router.refresh();
        } catch (err: any) {
            console.error('Error saving property:', err);
            setError(err?.response?.data?.message || 'Failed to save property');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Basic Information */}
            <Card
                title={t('basicInfo')}
                description={isRTL ? 'أدخل المعلومات الأساسية للعقار' : 'Enter the basic property information'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <FormInput
                            label={t('propertyName')}
                            placeholder={isRTL ? 'أدخل اسم العقار' : 'Enter property name'}
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            required
                            locale={locale}
                            icon={<Building2 className="w-4 h-4" />}
                        />
                    </div>
                    <FormSelect
                        label={t('propertyType')}
                        options={propertyTypeOptions}
                        placeholder={isRTL ? 'اختر نوع العقار' : 'Select property type'}
                        value={formData.property_type_id ? String(formData.property_type_id) : ''}
                        onChange={(e) => handleInputChange('property_type_id', e.target.value ? parseInt(e.target.value) : null)}
                        required
                        locale={locale}
                    />
                    <FormSelect
                        label={t('bedrooms')}
                        options={bedroomOptions}
                        placeholder={isRTL ? 'اختر عدد الغرف' : 'Select bedrooms'}
                        value={formData.bedrooms ? String(formData.bedrooms) : ''}
                        onChange={(e) => handleInputChange('bedrooms', e.target.value ? parseInt(e.target.value) : undefined)}
                        locale={locale}
                    />
                    <FormSelect
                        label={t('bathrooms')}
                        options={bathroomOptions}
                        placeholder={isRTL ? 'اختر عدد الحمامات' : 'Select bathrooms'}
                        value={formData.bathrooms ? String(formData.bathrooms) : ''}
                        onChange={(e) => handleInputChange('bathrooms', e.target.value ? parseInt(e.target.value) : undefined)}
                        locale={locale}
                    />
                    <FormInput
                        label={t('areaSize')}
                        type="number"
                        placeholder={isRTL ? 'أدخل المساحة' : 'Enter area size'}
                        value={formData.area || ''}
                        onChange={(e) => handleInputChange('area', e.target.value ? parseFloat(e.target.value) : undefined)}
                        locale={locale}
                    />
                    <div className="md:col-span-2">
                        <FormTextarea
                            label={t('description')}
                            placeholder={isRTL ? 'أدخل وصف العقار' : 'Enter property description'}
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={4}
                            locale={locale}
                        />
                    </div>
                </div>
            </Card>

            {/* Location */}
            <Card
                title={t('location')}
                description={isRTL ? 'حدد موقع العقار' : 'Specify the property location'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect
                        label={t('compound')}
                        options={compoundOptions}
                        placeholder={isRTL ? 'اختر الكمبوند' : 'Select compound'}
                        value={formData.compound_id ? String(formData.compound_id) : ''}
                        onChange={(e) => handleInputChange('compound_id', e.target.value ? parseInt(e.target.value) : null)}
                        required
                        locale={locale}
                    />
                </div>
            </Card>

            {/* Amenities */}
            <Card
                title={isRTL ? 'المميزات' : 'Amenities'}
                description={isRTL ? 'اختر المميزات المتاحة في العقار' : 'Select the amenities available in the property'}
                actions={
                    <button
                        type="button"
                        onClick={() => setIsAmenityModalOpen(true)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title={isRTL ? 'إضافة ميزة جديدة' : 'Add New Amenity'}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                }
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {amenities.map((amenity) => (
                        <label
                            key={amenity.id}
                            className={`
                                flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200
                                ${formData.amenity_ids?.includes(amenity.id)
                                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-700 dark:text-blue-400'
                                    : 'bg-white border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-blue-800'
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 hidden"
                                checked={formData.amenity_ids?.includes(amenity.id)}
                                onChange={() => handleAmenityToggle(amenity.id)}
                            />
                            <span className="text-sm font-medium">{amenity.name}</span>
                        </label>
                    ))}
                    {amenities.length === 0 && (
                        <p className="col-span-full text-sm text-slate-500 py-4 text-center">
                            {isRTL ? 'لا توجد مميزات متاحة' : 'No amenities available'}
                        </p>
                    )}
                </div>
            </Card>

            {/* Pricing */}
            <Card
                title={t('pricing')}
                description={isRTL ? 'حدد أسعار العقار' : 'Set property pricing'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                        label={t('developerPrice')}
                        type="number"
                        placeholder={isRTL ? 'أدخل السعر' : 'Enter price'}
                        value={formData.price || ''}
                        onChange={(e) => handleInputChange('price', e.target.value ? parseFloat(e.target.value) : 0)}
                        required
                        locale={locale}
                        icon={<DollarSign className="w-4 h-4" />}
                    />
                </div>
            </Card>

            {/* Actions */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ActionButton
                    type="submit"
                    variant="primary"
                    icon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    disabled={saving}
                >
                    {mode === 'create' ? t('submit') : t('save')}
                </ActionButton>
                <ActionButton
                    type="button"
                    variant="outline"
                    icon={<X className="w-4 h-4" />}
                    onClick={() => router.back()}
                    disabled={saving}
                >
                    {t('cancel')}
                </ActionButton>
            </div>

            {/* Create Amenity Modal */}
            {isAmenityModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {isRTL ? 'إضافة ميزة جديدة' : 'Add New Amenity'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsAmenityModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateAmenity} className="p-6 space-y-4">
                            <FormInput
                                label={isRTL ? 'الاسم' : 'Name'}
                                value={newAmenity.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setNewAmenity(prev => ({
                                        ...prev,
                                        name,
                                        slug: name.toLowerCase().replace(/\s+/g, '-')
                                    }));
                                }}
                                required
                                locale={locale}
                            />

                            <FormInput
                                label={isRTL ? 'المعرف الفريد (Slug)' : 'Slug'}
                                value={newAmenity.slug}
                                onChange={(e) => setNewAmenity(prev => ({ ...prev, slug: e.target.value }))}
                                required
                                locale={locale}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormSelect
                                    label={isRTL ? 'الفئة' : 'Category'}
                                    options={[
                                        { value: 'property', label: isRTL ? 'عقار' : 'Property' },
                                        { value: 'compound', label: isRTL ? 'كمبوند' : 'Compound' },
                                    ]}
                                    value={newAmenity.category}
                                    onChange={(e) => setNewAmenity(prev => ({ ...prev, category: e.target.value }))}
                                    locale={locale}
                                />
                                <FormInput
                                    label={isRTL ? 'الترتيب' : 'Order'}
                                    type="number"
                                    value={newAmenity.order}
                                    onChange={(e) => setNewAmenity(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                    locale={locale}
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={isCreatingAmenity}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {isCreatingAmenity ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    {isRTL ? 'حفظ' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAmenityModalOpen(false)}
                                    className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                                >
                                    {isRTL ? 'إلغاء' : 'Cancel'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </form>
    );
}
