'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ActionButton } from '../ui/ActionButton';
import {
    Building2,
    MapPin,
    Bed,
    Bath,
    Square,
    Calendar,
    Pencil,
    ArrowLeft,
    ArrowRight,
    DollarSign,
    Home,
    Star,
} from 'lucide-react';

interface Property {
    id: number;
    title: string;
    slug: string;
    description?: string;
    purpose?: 'sale' | 'rent';
    price?: number;
    price_formatted?: string;
    area?: number;
    area_formatted?: string;
    bedrooms?: number;
    bathrooms?: number;
    finishing?: string;
    delivery_year?: number;
    is_featured?: boolean;
    is_published?: boolean;
    views_count?: number;
    compound?: {
        id: number;
        name: string | null;
        slug: string;
        area?: {
            id: number;
            name: string;
        };
    };
    property_type?: {
        id: number;
        name: string;
        slug: string;
    };
    developer?: {
        id: number;
        name: string;
    };
    amenities?: Array<{
        id: number;
        name: string;
        icon?: string;
    }>;
    images?: Array<{
        id: number;
        url: string;
        is_primary?: boolean;
    }>;
    created_at?: string;
}

interface PropertyDetailViewProps {
    property: Property;
    locale: string;
}

export function PropertyDetailView({ property, locale }: PropertyDetailViewProps) {
    const t = useTranslations('Admin.properties');
    const tCommon = useTranslations('Admin.common');
    const isRTL = locale === 'ar';
    const BackArrow = isRTL ? ArrowRight : ArrowLeft;

    const purposeLabel = {
        sale: isRTL ? 'للبيع' : 'For Sale',
        rent: isRTL ? 'للإيجار' : 'For Rent',
    };

    const finishingLabel: Record<string, string> = {
        finished: isRTL ? 'تشطيب كامل' : 'Finished',
        semi_finished: isRTL ? 'نصف تشطيب' : 'Semi-Finished',
        unfinished: isRTL ? 'بدون تشطيب' : 'Unfinished',
        furnished: isRTL ? 'مفروش' : 'Furnished',
    };

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link
                href={`/${locale}/dashboard/properties`}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
                <BackArrow className="w-4 h-4" />
                <span>{tCommon('back')}</span>
            </Link>

            {/* Header Card */}
            <Card padding="lg">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Gallery */}
                    <div className="w-full lg:w-1/2 space-y-4">
                        <div className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative group">
                            {property.images && property.images.length > 0 ? (
                                <img
                                    src={property.images.find(img => img.is_primary)?.url || property.images[0].url}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <Building2 className="w-16 h-16 opacity-20" />
                                </div>
                            )}
                        </div>
                        {property.images && property.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {property.images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="w-20 h-20 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all"
                                    >
                                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            {property.purpose && (
                                <Badge variant={property.purpose === 'sale' ? 'success' : 'info'}>
                                    {purposeLabel[property.purpose]}
                                </Badge>
                            )}
                            {property.property_type && (
                                <Badge variant="secondary">{property.property_type.name}</Badge>
                            )}
                            {property.is_featured && (
                                <Badge variant="warning">
                                    <Star className="w-3 h-3 mr-1" />
                                    {isRTL ? 'مميز' : 'Featured'}
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {property.title}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-6">
                            <MapPin className="w-4 h-4" />
                            <span>
                                {property.compound?.name || property.compound?.slug}
                                {property.compound?.area && `, ${property.compound.area.name}`}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-400 uppercase tracking-wider">{isRTL ? 'السعر' : 'Price'}</p>
                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                    {property.price_formatted || `${property.price || 0} EGP`}
                                </p>
                            </div>
                            {property.area_formatted && (
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">{isRTL ? 'المساحة' : 'Area'}</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                                        {property.area_formatted}
                                    </p>
                                </div>
                            )}
                            {property.bedrooms !== undefined && (
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">{isRTL ? 'غرف النوم' : 'Bedrooms'}</p>
                                    <div className="flex items-center gap-2">
                                        <Bed className="w-4 h-4 text-slate-400" />
                                        <p className="text-lg font-semibold text-slate-900 dark:text-white">{property.bedrooms}</p>
                                    </div>
                                </div>
                            )}
                            {property.bathrooms !== undefined && (
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">{isRTL ? 'الحمامات' : 'Bathrooms'}</p>
                                    <div className="flex items-center gap-2">
                                        <Bath className="w-4 h-4 text-slate-400" />
                                        <p className="text-lg font-semibold text-slate-900 dark:text-white">{property.bathrooms}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Link href={`/${locale}/realestate/properties/${property.id}/edit`} className="w-full lg:w-auto">
                                <ActionButton variant="primary" icon={<Pencil className="w-4 h-4" />} className="w-full">
                                    {tCommon('update')}
                                </ActionButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms !== undefined && (
                    <Card padding="md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                <Bed className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{property.bedrooms}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {isRTL ? 'غرف نوم' : 'Bedrooms'}
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
                {property.bathrooms !== undefined && (
                    <Card padding="md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                                <Bath className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{property.bathrooms}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {isRTL ? 'حمامات' : 'Bathrooms'}
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
                {property.area_formatted && (
                    <Card padding="md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                                <Square className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{property.area_formatted}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {isRTL ? 'المساحة' : 'Area'}
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
                {property.property_type && (
                    <Card padding="md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{property.property_type.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {isRTL ? 'نوع العقار' : 'Type'}
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pricing Card */}
                <Card title={isRTL ? 'التسعير' : 'Pricing'}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-slate-600 dark:text-slate-400">
                                {isRTL ? 'السعر' : 'Price'}
                            </span>
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                                {property.price_formatted || `${property.price || 0} EGP`}
                            </span>
                        </div>
                        {property.finishing && (
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                <span className="text-slate-600 dark:text-slate-400">
                                    {isRTL ? 'التشطيب' : 'Finishing'}
                                </span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {finishingLabel[property.finishing] || property.finishing}
                                </span>
                            </div>
                        )}
                        {property.delivery_year && (
                            <div className="flex items-center justify-between py-3">
                                <span className="text-slate-600 dark:text-slate-400">
                                    {isRTL ? 'سنة التسليم' : 'Delivery Year'}
                                </span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {property.delivery_year}
                                </span>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Location Card */}
                <Card title={isRTL ? 'الموقع' : 'Location'}>
                    <div className="space-y-4">
                        {property.compound?.area && (
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                <span className="text-slate-600 dark:text-slate-400">
                                    {isRTL ? 'المنطقة' : 'Area'}
                                </span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {property.compound.area.name}
                                </span>
                            </div>
                        )}
                        {property.compound && (
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                <span className="text-slate-600 dark:text-slate-400">
                                    {isRTL ? 'الكمبوند' : 'Compound'}
                                </span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {property.compound.name || property.compound.slug}
                                </span>
                            </div>
                        )}
                        {property.developer && (
                            <div className="flex items-center justify-between py-3">
                                <span className="text-slate-600 dark:text-slate-400">
                                    {isRTL ? 'المطور' : 'Developer'}
                                </span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {property.developer.name}
                                </span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Description Card */}
            {property.description && (
                <Card title={isRTL ? 'الوصف' : 'Description'}>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {property.description}
                    </p>
                </Card>
            )}

            {/* Amenities Card */}
            {property.amenities && property.amenities.length > 0 && (
                <Card title={isRTL ? 'المرافق' : 'Amenities'}>
                    <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                            <Badge key={amenity.id} variant="info">
                                {amenity.name}
                            </Badge>
                        ))}
                    </div>
                </Card>
            )}

            {/* Metadata */}
            <Card padding="md">
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    {property.created_at && (
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{isRTL ? 'تاريخ الإنشاء:' : 'Created:'} {new Date(property.created_at).toLocaleDateString(locale)}</span>
                        </div>
                    )}
                    {property.views_count !== undefined && (
                        <div className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            <span>{isRTL ? 'المشاهدات:' : 'Views:'} {property.views_count}</span>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
