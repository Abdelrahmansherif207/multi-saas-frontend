'use client';

import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RotateCcw } from 'lucide-react';

interface FilterState {
    propertyTypes: string[];
    features: string[];
    bedrooms: number | null;
    bathrooms: number | null;
    downPayment: string;
    monthlyInstallments: string;
    installmentYears: number | null;
    priceMin: string;
    priceMax: string;
    deliveryDate: string | null;
}

interface PropertyFilterSidebarProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onApplyFilters: (filters: FilterState) => void;
    translations: {
        title: string;
        propertyTypes: string;
        propertyFeatures: string;
        bedrooms: string;
        bathrooms: string;
        payments: string;
        downPayment: string;
        monthlyInstallments: string;
        yearsOfInstallments: string;
        priceRange: string;
        deliveryDate: string;
        showResults: string;
        resetAll: string;
        maxAmount: string;
        min: string;
        max: string;
        delivered: string;
        garden: string;
        roof: string;
    };
    resultCount?: number;
}

const bedroomOptions = ['1', '2', '3', '4', '5+'];
const bathroomOptions = ['1', '2', '3', '4', '5+'];
const installmentYears = ['1', '2', '3', '4', '5', '6+'];
const deliveryYears = ['Delivered', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034+'];

export function PropertyFilterSidebar({
    isOpen,
    onOpenChange,
    onApplyFilters,
    translations,
    resultCount = 0,
}: PropertyFilterSidebarProps) {
    const [filters, setFilters] = useState<FilterState>({
        propertyTypes: [],
        features: [],
        bedrooms: null,
        bathrooms: null,
        downPayment: '',
        monthlyInstallments: '',
        installmentYears: null,
        priceMin: '',
        priceMax: '',
        deliveryDate: null,
    });

    const handleFeatureToggle = (feature: string) => {
        setFilters(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature],
        }));
    };

    const handleReset = () => {
        setFilters({
            propertyTypes: [],
            features: [],
            bedrooms: null,
            bathrooms: null,
            downPayment: '',
            monthlyInstallments: '',
            installmentYears: null,
            priceMin: '',
            priceMax: '',
            deliveryDate: null,
        });
    };

    const handleApply = () => {
        onApplyFilters(filters);
        onOpenChange(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0 flex flex-col">
                <SheetHeader className="p-6 pb-4 border-b border-border/40">
                    <SheetTitle className="text-xl font-bold text-foreground">
                        {translations.title}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Property Types */}
                    <div className="space-y-3">
                        <h3 className="text-base font-bold text-foreground">{translations.propertyTypes}</h3>
                        {/* Property types would be dynamic - placeholder for now */}
                    </div>

                    {/* Property Features */}
                    <div className="space-y-3 pt-4 border-t border-border/40">
                        <h3 className="text-base font-bold text-foreground">{translations.propertyFeatures}</h3>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="garden"
                                    checked={filters.features.includes('garden')}
                                    onCheckedChange={() => handleFeatureToggle('garden')}
                                />
                                <Label htmlFor="garden" className="text-sm font-medium cursor-pointer">
                                    {translations.garden}
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="roof"
                                    checked={filters.features.includes('roof')}
                                    onCheckedChange={() => handleFeatureToggle('roof')}
                                />
                                <Label htmlFor="roof" className="text-sm font-medium cursor-pointer">
                                    {translations.roof}
                                </Label>
                            </div>
                        </div>
                    </div>

                    {/* Bedrooms */}
                    <div className="space-y-3 pt-4 border-t border-border/40">
                        <h3 className="text-base font-bold text-foreground">{translations.bedrooms}</h3>
                        <div className="flex flex-wrap gap-2">
                            {bedroomOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setFilters(prev => ({ ...prev, bedrooms: prev.bedrooms === parseInt(option) ? null : parseInt(option) }))}
                                    className={`min-w-[44px] h-10 px-4 rounded-lg border text-sm font-medium transition-all ${filters.bedrooms === parseInt(option)
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white border-border/60 text-foreground hover:border-primary/50'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="space-y-3 pt-4 border-t border-border/40">
                        <h3 className="text-base font-bold text-foreground">{translations.bathrooms}</h3>
                        <div className="flex flex-wrap gap-2">
                            {bathroomOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setFilters(prev => ({ ...prev, bathrooms: prev.bathrooms === parseInt(option) ? null : parseInt(option) }))}
                                    className={`min-w-[44px] h-10 px-4 rounded-lg border text-sm font-medium transition-all ${filters.bathrooms === parseInt(option)
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white border-border/60 text-foreground hover:border-primary/50'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Payments */}
                    <div className="space-y-4 pt-4 border-t border-border/40">
                        <h3 className="text-base font-bold text-foreground">{translations.payments}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm text-muted-foreground">{translations.downPayment}</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder={translations.maxAmount}
                                        value={filters.downPayment}
                                        onChange={(e) => setFilters(prev => ({ ...prev, downPayment: e.target.value }))}
                                        className="pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">EGP</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-muted-foreground">{translations.monthlyInstallments}</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder={translations.maxAmount}
                                        value={filters.monthlyInstallments}
                                        onChange={(e) => setFilters(prev => ({ ...prev, monthlyInstallments: e.target.value }))}
                                        className="pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">EGP</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">{translations.yearsOfInstallments}</Label>
                            <div className="flex flex-wrap gap-2">
                                {installmentYears.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setFilters(prev => ({ ...prev, installmentYears: prev.installmentYears === parseInt(year) ? null : parseInt(year) }))}
                                        className={`min-w-[44px] h-10 px-4 rounded-lg border text-sm font-medium transition-all ${filters.installmentYears === parseInt(year)
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white border-border/60 text-foreground hover:border-primary/50'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3 pt-4 border-t border-border/40">
                        <h3 className="text-base font-bold text-foreground">
                            {translations.priceRange} <span className="text-muted-foreground font-normal text-sm">(EGP)</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="text"
                                placeholder={translations.min}
                                value={filters.priceMin}
                                onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                            />
                            <Input
                                type="text"
                                placeholder={translations.max}
                                value={filters.priceMax}
                                onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Delivery Date */}
                    <div className="space-y-3 pt-4 border-t border-border/40">
                        <h3 className="text-base font-bold text-foreground">{translations.deliveryDate}</h3>
                        <div className="flex flex-wrap gap-2">
                            {deliveryYears.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setFilters(prev => ({ ...prev, deliveryDate: prev.deliveryDate === year ? null : year }))}
                                    className={`h-9 px-3 rounded-lg border text-sm font-medium transition-all ${filters.deliveryDate === year
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white border-border/60 text-foreground hover:border-primary/50'
                                        }`}
                                >
                                    {year === 'Delivered' ? translations.delivered : year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <SheetFooter className="p-6 pt-4 border-t border-border/40 gap-3">
                    <Button
                        onClick={handleApply}
                        className="flex-1 bg-primary text-white hover:bg-primary/90"
                    >
                        {translations.showResults.replace('{count}', String(resultCount))}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="flex-1 gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        {translations.resetAll}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export type { FilterState };
