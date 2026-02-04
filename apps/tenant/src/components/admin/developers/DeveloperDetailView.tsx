'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Developer } from '@/app/[domain]/[locale]/(admin)/dashboard/developers/types';
import { Building2, Globe, Calendar, Star, Tag, Link as LinkIcon, BadgeCheck, FileText } from 'lucide-react';

interface DeveloperDetailViewProps {
    developer: Developer;
    locale: string;
}

export function DeveloperDetailView({ developer, locale }: DeveloperDetailViewProps) {
    const isRTL = locale === 'ar';

    return (
        <div className="space-y-6">
            {/* Main Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {developer.logo ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={developer.logo} alt={developer.name} className="w-full h-full object-contain p-2" />
                                ) : (
                                    <Building2 className="w-8 h-8 text-slate-400" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{developer.name}</h2>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${developer.status
                                        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                                        : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                                        }`}>
                                        {developer.status ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                                    </span>
                                    {developer.is_featured && (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current" />
                                            {isRTL ? 'مميز' : 'Featured'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Tag className="w-4 h-4" />
                                        <span>{developer.slug}</span>
                                    </div>
                                    {developer.website && (
                                        <a href={developer.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">
                                            <Globe className="w-4 h-4" />
                                            <span className="truncate max-w-[200px]">{developer.website}</span>
                                        </a>
                                    )}
                                    {developer.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <Tag className="w-4 h-4" />
                                            <span>{developer.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(developer.created_at).toLocaleDateString(locale)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {developer.description && (
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-slate-500" />
                                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                                        {isRTL ? 'الوصف' : 'Description'}
                                    </h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {developer.description}
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
                                <p className="text-slate-900 dark:text-white">{developer.meta_title || '-'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">
                                    {isRTL ? 'وصف الميتا' : 'Meta Description'}
                                </label>
                                <p className="text-slate-900 dark:text-white">{developer.meta_description || '-'}</p>
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
                                <span className="font-semibold text-slate-900 dark:text-white">{developer.compounds_count || 0}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <BadgeCheck className="w-4 h-4" />
                                    <span>{isRTL ? 'العقارات' : 'Properties'}</span>
                                </div>
                                <span className="font-semibold text-slate-900 dark:text-white">{developer.properties_count || 0}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
