"use client";

import { useState } from 'react';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

import { useTranslations } from 'next-intl';

interface FilterSidebarProps { }

export function FilterSidebar({ }: FilterSidebarProps) {
    const t = useTranslations('Filters');
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    const areas = ['New Cairo', '6th of October City', 'New Capital City'];
    const developers = ['The Waterway Developments', 'Inertia Egypt', 'ERC [ Egyptian Resorts Company ]'];
    const propertyTypes = ['Apartment', 'Chalet', 'Townhouse', 'Villa', 'Office', 'Cabin', 'Duplex', 'Twinhouse'];

    return (
        <div className="space-y-8 sticky top-24">
            {/* Areas */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900">{t('areas')}</h4>
                    <button className="text-xs text-primary font-bold hover:underline">{t('reset')}</button>
                </div>
                <div className="space-y-3">
                    {areas.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                            <Checkbox id={`area-${area}`} />
                            <Label htmlFor={`area-${area}`} className="text-sm text-gray-600 font-medium cursor-pointer">{area}</Label>
                        </div>
                    ))}
                    <button className="text-xs text-primary font-bold hover:underline">{t('seeMore')}</button>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Developers */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900">{t('developers')}</h4>
                    <button className="text-xs text-primary font-bold hover:underline">{t('reset')}</button>
                </div>
                <div className="space-y-3">
                    {developers.map((dev) => (
                        <div key={dev} className="flex items-center space-x-2">
                            <Checkbox id={`dev-${dev}`} />
                            <Label htmlFor={`dev-${dev}`} className="text-sm text-gray-600 font-medium cursor-pointer">{dev}</Label>
                        </div>
                    ))}
                    <button className="text-xs text-primary font-bold hover:underline">{t('seeMore')}</button>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Bedrooms */}
            <div className="space-y-4">
                <h4 className="font-bold text-gray-900">{t('bedrooms')}</h4>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, '5+'].map((num) => (
                        <button
                            key={num}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Bathrooms */}
            <div className="space-y-4">
                <h4 className="font-bold text-gray-900">{t('bathrooms')}</h4>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, '5+'].map((num) => (
                        <button
                            key={num}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Property Types */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900">{t('propertyTypes')}</h4>
                    <button className="text-xs text-primary font-bold hover:underline">{t('reset')}</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox id={`type-${type}`} />
                            <Label htmlFor={`type-${type}`} className="text-sm text-gray-600 font-medium cursor-pointer">{type}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-[#00354d] transition-colors">
                {t('resetAll')}
            </button>
        </div>
    );
}
