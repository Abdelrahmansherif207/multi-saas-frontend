'use client';

import { PropertyType } from '@/app/[domain]/[locale]/(admin)/dashboard/property-types/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Building2, Tag, FileText, ListOrdered, Calendar, Hash } from 'lucide-react';

interface PropertyTypeDetailViewProps {
    propertyType: PropertyType;
    locale: string;
}

export function PropertyTypeDetailView({ propertyType, locale }: PropertyTypeDetailViewProps) {
    const isRTL = locale === 'ar';

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info Card */}
            <Card className="lg:col-span-2 p-6">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {propertyType.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                            <Tag className="w-4 h-4 text-slate-400" />
                            <span className="font-mono text-sm text-slate-500">{propertyType.slug}</span>
                        </div>
                    </div>
                    <Badge variant={propertyType.status ? 'success' : 'danger'}>
                        {propertyType.status ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                    </Badge>
                </div>

                {propertyType.description && (
                    <div className="mb-6">
                        <h3 className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                            <FileText className="w-4 h-4" />
                            {isRTL ? 'الوصف' : 'Description'}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300">
                            {propertyType.description}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                            <Building2 className="w-4 h-4" />
                            {isRTL ? 'الأيقونة' : 'Icon'}
                        </div>
                        <p className="font-medium text-slate-900 dark:text-white">
                            {propertyType.icon || '-'}
                        </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                            <ListOrdered className="w-4 h-4" />
                            {isRTL ? 'الترتيب' : 'Order'}
                        </div>
                        <p className="font-medium text-slate-900 dark:text-white">
                            {propertyType.order}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Stats & Meta Card */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    {isRTL ? 'الإحصائيات' : 'Statistics'}
                </h3>

                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-1">
                            <Hash className="w-4 h-4" />
                            {isRTL ? 'عدد العقارات' : 'Properties Count'}
                        </div>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                            {propertyType.properties_count}
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                            <Calendar className="w-4 h-4" />
                            {isRTL ? 'تاريخ الإنشاء' : 'Created At'}
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {formatDate(propertyType.created_at)}
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                            <Calendar className="w-4 h-4" />
                            {isRTL ? 'آخر تحديث' : 'Updated At'}
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {formatDate(propertyType.updated_at)}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
