'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Amenity } from '@/app/[domain]/[locale]/(admin)/dashboard/amenities/types';
import { Tag, Layers, Calendar } from 'lucide-react';

interface AmenityDetailViewProps {
    amenity: Amenity;
    locale: string;
}

export function AmenityDetailView({ amenity, locale }: AmenityDetailViewProps) {
    const isRTL = locale === 'ar';

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                        {amenity.icon ? (
                            <img src={amenity.icon} alt={amenity.name} className="w-8 h-8 object-contain" />
                        ) : (
                            <Layers className="w-8 h-8 text-slate-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{amenity.name}</h2>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${amenity.status
                                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                                    : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                                }`}>
                                {amenity.status ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <Tag className="w-4 h-4" />
                                <span>{amenity.slug}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Layers className="w-4 h-4" />
                                <span className="capitalize">{amenity.category}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(amenity.created_at).toLocaleDateString(locale)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
