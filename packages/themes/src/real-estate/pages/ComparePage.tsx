"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useComparisonStore } from '../stores/useComparisonStore';
import { Button } from '../components/ui/button';
import { TenantConfig, Property } from '../types';
import { Plus, X, Home, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ComparePageProps {
    tenant: TenantConfig;
}

export function ComparePage({ tenant }: ComparePageProps) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Comparison');
    const { items, removeItem, clearAll } = useComparisonStore();
    const [activeTab, setActiveTab] = useState<'compounds' | 'units'>('compounds');

    // Extract base path (domain/locale) from current path
    const getBasePath = () => {
        const pathParts = pathname.split('/').filter(Boolean);
        return pathParts.length >= 2 ? `/${pathParts[0]}/${pathParts[1]}` : '';
    };
    const basePath = getBasePath();

    const handleStopComparison = () => {
        clearAll();
        router.push(`${basePath}/properties`);
    };

    const handleRemoveProperty = (propertyId: string) => {
        removeItem(propertyId);
        if (items.length <= 1) {
            router.push(`${basePath}/properties`);
        }
    };

    // Sample amenities for demo
    const sampleAmenities = [
        'نادي اجتماعي',
        'مسارات للركض',
        'مركز تجاري',
        'منطقة تجارة',
        'جراج للسيارات تحت الأرض',
    ];

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href={basePath} className="hover:text-primary flex items-center gap-1">
                        <Home size={14} />
                        Home
                    </Link>
                    <ChevronRight size={14} />
                    <Link href={`${basePath}/properties`} className="hover:text-primary">
                        Properties
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">{t('comparePlans')}</span>
                </nav>
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-4 mb-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        {/* Tabs */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setActiveTab('compounds')}
                                className={`text-lg font-bold transition-colors ${activeTab === 'compounds'
                                    ? 'text-primary border-b-2 border-primary pb-1'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {items.length} {t('compounds')}
                            </button>
                            <button
                                onClick={() => setActiveTab('units')}
                                className={`text-lg font-bold transition-colors ${activeTab === 'units'
                                    ? 'text-primary border-b-2 border-primary pb-1'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {t('units')}
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={handleStopComparison}
                                className="px-6 font-bold"
                            >
                                {t('stopComparison')}
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6 font-bold">
                                {t('comparePlans')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Content */}
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Properties Header Row */}
                    <div className="border-b border-gray-100">
                        <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(items.length + 1, 5)}, 1fr)` }}>
                            {/* Empty cell for labels column */}
                            <div className="p-6 border-r border-gray-100"></div>

                            {/* Property Cards */}
                            {items.map((property, index) => (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 border-r border-gray-100 last:border-r-0"
                                >
                                    <div className="relative">
                                        {/* Property Image */}
                                        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                                            <img
                                                src={property.image}
                                                alt={property.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Property Info */}
                                        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                                            {property.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">{property.city}</p>

                                        {/* Developer Badge */}
                                        <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                            من المطور
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Add More Card */}
                            {items.length < 4 && (
                                <div className="p-6 flex items-center justify-center">
                                    <Link
                                        href={`${basePath}/properties`}
                                        className="flex flex-col items-center gap-3 text-gray-400 hover:text-primary transition-colors group"
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 group-hover:border-primary flex items-center justify-center transition-colors">
                                            <Plus size={24} />
                                        </div>
                                        <span className="text-sm font-medium">{t('addMore')}</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comparison Rows */}
                    <div className="divide-y divide-gray-100">
                        {/* Starting Price Row */}
                        <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(items.length + 1, 5)}, 1fr)` }}>
                            <div className="p-4 border-r border-gray-100 bg-gray-50">
                                <span className="text-sm font-bold text-gray-600">{t('startingPrice')}</span>
                            </div>
                            {items.map((property) => (
                                <div key={property.id} className="p-4 border-r border-gray-100 last:border-r-0">
                                    <span className="font-bold text-gray-900">
                                        {property.price?.toLocaleString() || '-'} جنيه مصري
                                    </span>
                                </div>
                            ))}
                            {items.length < 4 && <div className="p-4"></div>}
                        </div>

                        {/* Down Payment Row */}
                        <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(items.length + 1, 5)}, 1fr)` }}>
                            <div className="p-4 border-r border-gray-100 bg-gray-50">
                                <span className="text-sm font-bold text-gray-600">{t('downPayment')}</span>
                            </div>
                            {items.map((property) => (
                                <div key={property.id} className="p-4 border-r border-gray-100 last:border-r-0">
                                    <span className="text-gray-700">-</span>
                                </div>
                            ))}
                            {items.length < 4 && <div className="p-4"></div>}
                        </div>

                        {/* Years of Installments Row */}
                        <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(items.length + 1, 5)}, 1fr)` }}>
                            <div className="p-4 border-r border-gray-100 bg-gray-50">
                                <span className="text-sm font-bold text-gray-600">{t('yearsInstallment')}</span>
                            </div>
                            {items.map((property) => (
                                <div key={property.id} className="p-4 border-r border-gray-100 last:border-r-0">
                                    <span className="text-gray-700">6 {t('yearsInstallment')}</span>
                                </div>
                            ))}
                            {items.length < 4 && <div className="p-4"></div>}
                        </div>

                        {/* Amenities Row */}
                        <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(items.length + 1, 5)}, 1fr)` }}>
                            <div className="p-4 border-r border-gray-100 bg-gray-50">
                                <span className="text-sm font-bold text-gray-600">{t('amenities')}</span>
                            </div>
                            {items.map((property) => (
                                <div key={property.id} className="p-4 border-r border-gray-100 last:border-r-0">
                                    <ul className="space-y-1">
                                        {sampleAmenities.map((amenity, idx) => (
                                            <li key={idx} className="text-sm text-gray-600">
                                                {amenity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {items.length < 4 && <div className="p-4"></div>}
                        </div>

                        {/* Actions Row */}
                        <div className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(items.length + 1, 5)}, 1fr)` }}>
                            <div className="p-4 border-r border-gray-100 bg-gray-50"></div>
                            {items.map((property) => (
                                <div key={property.id} className="p-4 border-r border-gray-100 last:border-r-0 flex flex-col gap-3">
                                    <Link
                                        href={`${basePath}/properties/${property.slug}`}
                                        className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                                    >
                                        {t('goToCompound')}
                                        <ExternalLink size={14} />
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveProperty(property.id)}
                                        className="text-red-500 font-bold text-sm hover:underline flex items-center gap-1"
                                    >
                                        {t('remove')}
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {items.length < 4 && <div className="p-4"></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
