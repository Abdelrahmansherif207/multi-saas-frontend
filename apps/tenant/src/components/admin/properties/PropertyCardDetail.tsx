'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ActionButton } from '../ui/ActionButton';
import { MockProperty, formatCurrency } from '../../../mocks/admin/properties';
import {
    Building2,
    MapPin,
    Bed,
    Bath,
    Square,
    Calendar,
    Pencil,
    Trash2,
    ArrowLeft,
    ArrowRight,
} from 'lucide-react';

interface PropertyCardDetailProps {
    property: MockProperty;
    locale: string;
}

export function PropertyCardDetail({ property, locale }: PropertyCardDetailProps) {
    const t = useTranslations('Admin.properties');
    const tCommon = useTranslations('Admin.common');
    const isRTL = locale === 'ar';
    const BackArrow = isRTL ? ArrowRight : ArrowLeft;

    const statusVariant = {
        available: 'success' as const,
        pending: 'warning' as const,
        sold: 'danger' as const,
    };

    const statusLabel = {
        available: isRTL ? 'متاح' : 'Available',
        pending: isRTL ? 'قيد الانتظار' : 'Pending',
        sold: isRTL ? 'مباع' : 'Sold',
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
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Badge variant={statusVariant[property.status]}>
                                {statusLabel[property.status]}
                            </Badge>
                            <Badge variant="secondary">{property.type}</Badge>
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {property.name}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <MapPin className="w-4 h-4" />
                            <span>{property.compound}, {property.area}</span>
                        </div>
                    </div>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Link href={`/${locale}/dashboard/properties/${property.id}/edit`}>
                            <ActionButton variant="primary" icon={<Pencil className="w-4 h-4" />}>
                                {tCommon('update')}
                            </ActionButton>
                        </Link>
                        <ActionButton variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                            {tCommon('delete')}
                        </ActionButton>
                    </div>
                </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <Card padding="md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                            <Square className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{property.areaSize}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {isRTL ? 'متر مربع' : 'sqm'}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card padding="md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{property.type}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {isRTL ? 'نوع العقار' : 'Type'}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pricing Card */}
                <Card title={isRTL ? 'التسعير' : 'Pricing'}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-slate-600 dark:text-slate-400">
                                {isRTL ? 'سعر المطور' : 'Developer Price'}
                            </span>
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                                {formatCurrency(property.developerPrice, locale)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-slate-600 dark:text-slate-400">
                                {isRTL ? 'سعر إعادة البيع' : 'Resale Price'}
                            </span>
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                                {formatCurrency(property.resalePrice, locale)}
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Location Card */}
                <Card title={isRTL ? 'الموقع' : 'Location'}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-slate-600 dark:text-slate-400">
                                {isRTL ? 'المنطقة' : 'Area'}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {property.area}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-slate-600 dark:text-slate-400">
                                {isRTL ? 'الكمبوند' : 'Compound'}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {property.compound}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-slate-600 dark:text-slate-400">
                                {isRTL ? 'العنوان' : 'Address'}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {property.address}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-slate-600 dark:text-slate-400">
                                {isRTL ? 'المدينة' : 'City'}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {property.city}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Description Card */}
            <Card title={isRTL ? 'الوصف' : 'Description'}>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {property.description}
                </p>
            </Card>

            {/* Features Card */}
            {property.features && property.features.length > 0 && (
                <Card title={isRTL ? 'المميزات' : 'Features'}>
                    <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, index) => (
                            <Badge key={index} variant="info">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                </Card>
            )}

            {/* Metadata */}
            <Card padding="md">
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{isRTL ? 'تاريخ الإنشاء:' : 'Created:'} {property.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{isRTL ? 'آخر تحديث:' : 'Updated:'} {property.updatedAt}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
