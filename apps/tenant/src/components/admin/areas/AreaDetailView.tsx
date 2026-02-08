'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Area } from '@/app/[domain]/[locale]/(admin)/dashboard/areas/types';
import { MapPin, Globe, CheckCircle, XCircle, Calendar, Star, Tag, Link as LinkIcon, Building2 } from 'lucide-react';

interface AreaDetailViewProps {
    area: Area;
    locale: string;
}

export function AreaDetailView({ area, locale }: AreaDetailViewProps) {
    const isRTL = locale === 'ar';

    return (
        <div className="space-y-6">
            {/* Main Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center shrink-0">
                                <MapPin className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{area.name}</h2>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${area.status
                                        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                                        : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                                        }`}>
                                        {area.status ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                                    </span>
                                    {area.is_featured && (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current" />
                                            {isRTL ? 'مميز' : 'Featured'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Tag className="w-4 h-4" />
                                        <span>{area.slug}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Globe className="w-4 h-4" />
                                        <span>{area.type}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(area.created_at).toLocaleDateString(locale)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {area.description && (
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                                    {isRTL ? 'الوصف' : 'Description'}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {area.description}
                                </p>
                            </div>
                        )}
                    </Card>

                    {/* SEO Info */}
                    <Card title={isRTL ? 'تحسين محركات البحث' : 'SEO Information'}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    {isRTL ? 'عنوان الميتا' : 'Meta Title'}
                                </label>
                                <p className="text-slate-900 dark:text-white">{area.meta_title || '-'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    {isRTL ? 'وصف الميتا' : 'Meta Description'}
                                </label>
                                <p className="text-slate-900 dark:text-white">{area.meta_description || '-'}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card title={isRTL ? 'إحصائيات' : 'Statistics'}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Building2 className="w-4 h-4" />
                                    <span>{isRTL ? 'الكمبوندات' : 'Compounds'}</span>
                                </div>
                                <span className="font-semibold text-slate-900 dark:text-white">{area.compounds_count}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Home className="w-4 h-4" />
                                    <span>{isRTL ? 'العقارات' : 'Properties'}</span>
                                </div>
                                <span className="font-semibold text-slate-900 dark:text-white">{area.properties_count}</span>
                            </div>
                        </div>
                    </Card>

                    <Card title={isRTL ? 'الموقع الجغرافي' : 'Location'}>
                        <div className="space-y-3">
                            <div>
                                <span className="text-xs text-slate-500 block mb-1">{isRTL ? 'خط العرض' : 'Latitude'}</span>
                                <code className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-sm font-mono block">
                                    {area.latitude || '-'}
                                </code>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 block mb-1">{isRTL ? 'خط الطول' : 'Longitude'}</span>
                                <code className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-sm font-mono block">
                                    {area.longitude || '-'}
                                </code>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Icon helper
function Home(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}
