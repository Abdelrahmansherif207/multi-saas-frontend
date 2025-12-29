"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';

interface HeroSearchFiltersProps {
    translations: any;
}

export function HeroSearchFilters({ translations: t }: HeroSearchFiltersProps) {
    const [priceRange, setPriceRange] = useState([500000, 25000000]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
    const [beds, setBeds] = useState<number | null>(null);
    const [baths, setBaths] = useState<number | null>(null);

    // Mock data - in real app could come from props/api
    const propertyTypes = ['Apartment', 'Chalet', 'Townhouse', 'Villa', 'Office', 'Cabin'];

    const handlePropertyTypeChange = (type: string) => {
        setSelectedPropertyTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Property Types - Multi Scale */}
            <Popover>
                <PopoverTrigger asChild>
                    <button className="relative w-full text-left rounded-lg border border-gray-300 bg-white px-5 py-5 text-base text-gray-700 outline-none focus:ring-1 focus:ring-primary flex items-center justify-between">
                        <span className="truncate">
                            {selectedPropertyTypes.length > 0
                                ? `${selectedPropertyTypes.length} Selected`
                                : t.filters.propertyType}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                    <div className="p-4 space-y-3">
                        {propertyTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`type-${type}`}
                                    checked={selectedPropertyTypes.includes(type)}
                                    onCheckedChange={() => handlePropertyTypeChange(type)}
                                />
                                <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer font-normal">{type}</Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Beds & Baths */}
            <Popover>
                <PopoverTrigger asChild>
                    <button className="relative w-full text-left rounded-lg border border-gray-300 bg-white px-5 py-5 text-base text-gray-700 outline-none focus:ring-1 focus:ring-primary flex items-center justify-between">
                        <span className="truncate">
                            {beds || baths
                                ? `${beds ? `${beds} Beds` : ''} ${beds && baths ? '/' : ''} ${baths ? `${baths} Baths` : ''}`
                                : t.filters.bedsBaths}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-6" align="start">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm">Bedrooms</h4>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, '5+'].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setBeds(num === '5+' ? 5 : Number(num))}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border transition-colors ${(num === '5+' ? 5 : Number(num)) === beds
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'border-gray-200 hover:border-primary text-gray-600'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm">Bathrooms</h4>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, '5+'].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setBaths(num === '5+' ? 5 : Number(num))}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border transition-colors ${(num === '5+' ? 5 : Number(num)) === baths
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'border-gray-200 hover:border-primary text-gray-600'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Price Range */}
            <Popover>
                <PopoverTrigger asChild>
                    <button className="relative w-full text-left rounded-lg border border-gray-300 bg-white px-5 py-5 text-base text-gray-700 outline-none focus:ring-1 focus:ring-primary flex items-center justify-between">
                        <span className="truncate">{t.filters.priceRange}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[340px] p-6" align="start">
                    <div className="space-y-6">
                        <h4 className="font-bold text-base">Price Range</h4>
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                value={priceRange[0].toLocaleString()}
                                readOnly
                                className="text-center h-12"
                            />
                            <Input
                                type="text"
                                value={priceRange[1].toLocaleString()}
                                readOnly
                                className="text-center h-12"
                            />
                        </div>
                        <Slider
                            defaultValue={[500000, 25000000]}
                            max={50000000}
                            step={100000}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="py-4"
                        />
                        <button className="w-full rounded-md bg-primary py-3 text-white font-bold hover:bg-primary/90 transition-colors">
                            Apply
                        </button>
                    </div>
                </PopoverContent>
            </Popover>

            <button className="w-full rounded-lg bg-primary px-8 py-5 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]">
                {t.searchButton}
            </button>
        </div>
    );
}
