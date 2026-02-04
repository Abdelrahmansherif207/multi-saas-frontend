'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { AreaStatistics } from '@/app/[domain]/[locale]/(admin)/dashboard/areas/types';
import { MapPin, CheckCircle, Star, Globe, Building2, Home } from 'lucide-react';

interface AreaStatsProps {
    stats: AreaStatistics;
    isRTL: boolean;
}

export function AreaStats({ stats, isRTL }: AreaStatsProps) {
    const statItems = [
        {
            label: isRTL ? 'إجمالي المناطق' : 'Total Areas',
            value: stats.total,
            icon: MapPin,
            color: 'text-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
        },
        {
            label: isRTL ? 'المناطق النشطة' : 'Active Areas',
            value: stats.active,
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-50 dark:bg-green-900/20',
        },
        {
            label: isRTL ? 'المناطق المميزة' : 'Featured Areas',
            value: stats.featured,
            icon: Star,
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
        },
        {
            label: isRTL ? 'المناطق الرئيسية' : 'Root Areas',
            value: stats.root_areas,
            icon: Globe,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        },
        {
            label: isRTL ? 'مع كمبوندات' : 'With Compounds',
            value: stats.with_compounds,
            icon: Building2,
            color: 'text-purple-500',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
        },
        {
            label: isRTL ? 'مع عقارات' : 'With Properties',
            value: stats.with_properties,
            icon: Home,
            color: 'text-rose-500',
            bg: 'bg-rose-50 dark:bg-rose-900/20',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statItems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg}`}>
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="text-sm text-slate-500 font-medium truncate">{item.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    );
}
