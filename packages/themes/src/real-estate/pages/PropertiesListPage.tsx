"use client";

import { useState } from 'react';
import { TenantConfig, Property } from '../types';
import { PropertyListCard } from '../widgets/PropertyListCard';
import { FilterSidebar } from '../widgets/FilterSidebar';
import { ComparisonBanner } from '../components/ComparisonBanner';
import { Search, ListFilter, Map as MapIcon, ArrowLeftRight, ChevronRight, Home, Circle } from 'lucide-react';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';

import { useTranslations } from 'next-intl';

interface PropertiesListPageProps {
    tenant: TenantConfig;
    properties: Property[];
}

export function PropertiesListPage({ tenant, properties }: PropertiesListPageProps) {
    const t = useTranslations('PropertiesList');
    const tf = useTranslations('Filters');
    const [sortBy, setSortBy] = useState('newest');

    const sortOptions = [
        { id: 'minDeveloperPrice', label: t('sortOptions.minDeveloperPrice') },
        { id: 'maxDeveloperPrice', label: t('sortOptions.maxDeveloperPrice') },
        { id: 'minResalePrice', label: t('sortOptions.minResalePrice') },
        { id: 'maxResalePrice', label: t('sortOptions.maxResalePrice') },
        { id: 'minInstallment', label: t('sortOptions.minInstallment') },
        { id: 'maxInstallment', label: t('sortOptions.maxInstallment') },
        { id: 'newest', label: t('sortOptions.newest') },
        { id: 'readyBy', label: t('sortOptions.readyBy') },
    ];

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-primary flex items-center gap-1">
                        <Home size={14} />
                        Home
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">{t('title')}</span>
                </nav>
            </div>

            {/* Search & Header Section */}
            <div className="container mx-auto px-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
                                    {t('sortBy')}
                                    <ListFilter size={18} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-2 rounded-xl" align="end">
                                <div className="flex flex-col gap-1">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSortBy(option.id)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-start group"
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${sortBy === option.id ? 'border-primary' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                                {sortBy === option.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                            </div>
                                            <span className={`text-sm font-medium transition-colors ${sortBy === option.id ? 'text-primary' : 'text-gray-700'}`}>
                                                {option.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm relative">
                            {t('mapView')}
                            <MapIcon size={18} />
                            <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{t('new')}</span>
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">
                            {t('switchToProperties')}
                            <ArrowLeftRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex items-baseline gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
                    <span className="text-gray-400 font-medium">{t('count', { count: properties.length })}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-[280px] shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Property List */}
                    <div className="flex-1 space-y-6">
                        {properties.map((property) => (
                            <PropertyListCard key={property.id} property={property} />
                        ))}

                        {properties.length === 0 && (
                            <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-gray-300">
                                <p className="text-gray-500 font-medium">{t('noResults')}</p>
                                <button className="mt-4 text-primary font-bold hover:underline">{t('clearFilters')}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Comparison Banner */}
            <ComparisonBanner />
        </div>
    );
}
