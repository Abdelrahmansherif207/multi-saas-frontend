'use client';

import { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    ChevronDown,
} from './ui/dropdown-menu';
import { PropertyCard } from '../widgets/PropertyCard';
import { PropertyFilterSidebar, FilterState } from './PropertyFilterSidebar';
import { Property } from '../types';

interface RelatedPropertiesProps {
    properties: Property[];
    areaName: string;
    translations: {
        title: string;
        filterButton: string;
        sortButton: string;
        sortOptions: {
            newest: string;
            priceHighToLow: string;
            priceLowToHigh: string;
            mostPopular: string;
        };
        filterSidebar: {
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
    };
}

type SortOption = 'newest' | 'priceHighToLow' | 'priceLowToHigh' | 'mostPopular';

export function RelatedProperties({
    properties,
    areaName,
    translations,
}: RelatedPropertiesProps) {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [filteredProperties, setFilteredProperties] = useState(properties);

    const handleApplyFilters = (filters: FilterState) => {
        // In a real app, this would filter the properties
        console.log('Applied filters:', filters);
        // For now, just use the original properties
        setFilteredProperties(properties);
    };

    const handleSort = (option: SortOption) => {
        setSortBy(option);
        // In a real app, this would sort the properties
        const sorted = [...filteredProperties];
        switch (option) {
            case 'priceHighToLow':
                sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case 'priceLowToHigh':
                sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            // newest and mostPopular would need different data
            default:
                break;
        }
        setFilteredProperties(sorted);
    };

    const getSortLabel = () => {
        switch (sortBy) {
            case 'newest':
                return translations.sortOptions.newest;
            case 'priceHighToLow':
                return translations.sortOptions.priceHighToLow;
            case 'priceLowToHigh':
                return translations.sortOptions.priceLowToHigh;
            case 'mostPopular':
                return translations.sortOptions.mostPopular;
        }
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* Header with title and actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {translations.title.replace('{area}', areaName)}
                    </h2>

                    <div className="flex items-center gap-3">
                        {/* Filter Button */}
                        <Button
                            onClick={() => setFilterOpen(true)}
                            className="gap-2 bg-primary text-white hover:bg-primary/90 rounded-full px-5"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            {translations.filterButton}
                        </Button>

                        {/* Sort By Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="gap-2 rounded-full px-5 border-border/60"
                                >
                                    <ArrowUpDown className="w-4 h-4" />
                                    {translations.sortButton}
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                    onClick={() => handleSort('newest')}
                                    className="justify-between"
                                >
                                    {translations.sortOptions.newest}
                                    {sortBy === 'newest' && <Check className="w-4 h-4 text-primary" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSort('priceHighToLow')}
                                    className="justify-between"
                                >
                                    {translations.sortOptions.priceHighToLow}
                                    {sortBy === 'priceHighToLow' && <Check className="w-4 h-4 text-primary" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSort('priceLowToHigh')}
                                    className="justify-between"
                                >
                                    {translations.sortOptions.priceLowToHigh}
                                    {sortBy === 'priceLowToHigh' && <Check className="w-4 h-4 text-primary" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSort('mostPopular')}
                                    className="justify-between"
                                >
                                    {translations.sortOptions.mostPopular}
                                    {sortBy === 'mostPopular' && <Check className="w-4 h-4 text-primary" />}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                {filteredProperties.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        No properties found matching your criteria.
                    </div>
                )}
            </div>

            {/* Filter Sidebar */}
            <PropertyFilterSidebar
                isOpen={filterOpen}
                onOpenChange={setFilterOpen}
                onApplyFilters={handleApplyFilters}
                translations={translations.filterSidebar}
                resultCount={filteredProperties.length}
            />
        </section>
    );
}
