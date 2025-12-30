'use client';

import { Property, TenantConfig, PropertyDetailTranslations } from '../types';
import { ImageGallery } from '../components/ImageGallery';
import { PropertyInfoBar } from '../components/PropertyInfoBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { PropertyDetailsActions } from '../components/PropertyDetailsActions';
import { RelatedProperties } from '../components/RelatedProperties';

interface PropertyDetailPageProps {
    tenant: TenantConfig;
    slug: string;
    property?: Property;
    translations?: PropertyDetailTranslations;
}

// Default translations
const defaultTranslations: PropertyDetailTranslations = {
    breadcrumb: {
        home: 'Home',
    },
    infoBar: {
        developerPrice: 'Developer Start Price',
        resalePrice: 'Resale Start Price',
        callUs: 'Call Us',
        whatsapp: 'WhatsApp',
    },
    actions: {
        title: 'Details',
        gallery: 'Gallery',
        map: 'View on Map',
        masterPlan: 'Master Plan',
    },
    relatedProperties: {
        title: 'More Properties in {area}',
        filterButton: 'Filter',
        sortButton: 'Sort By',
        sortOptions: {
            newest: 'Newest',
            priceHighToLow: 'Price: High to Low',
            priceLowToHigh: 'Price: Low to High',
            mostPopular: 'Most Popular',
        },
        filterSidebar: {
            title: 'Filter Properties',
            propertyTypes: 'Property Types',
            propertyFeatures: 'Property Features',
            bedrooms: 'Bedrooms',
            bathrooms: 'Bathrooms',
            payments: 'Payments',
            downPayment: 'Down Payment',
            monthlyInstallments: 'Monthly Installments',
            yearsOfInstallments: 'Years Of Installments',
            priceRange: 'Price Range',
            deliveryDate: 'Delivery Date',
            showResults: 'Show All {count} Results',
            resetAll: 'Reset All',
            maxAmount: 'Max Amount',
            min: 'Min',
            max: 'Max',
            delivered: 'Delivered',
            garden: 'Garden',
            roof: 'Roof',
        },
    },
};

// Mock property data for testing
const mockProperty: Property = {
    id: '1',
    slug: 'jirian-nations-of-sky',
    title: 'Jirian - Nations Of Sky in New Zayed by Nations Of Sky',
    description: 'Luxurious compound in New Zayed with premium amenities.',
    price: 23000000,
    priceType: 'sale',
    propertyType: 'Compound',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 3500,
    address: 'New Zayed',
    city: 'Giza',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
        'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    ],
};

const mockLocation = { lat: 30.0444, lng: 31.2357, address: 'New Zayed, Giza' };
const mockMasterPlan = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=800';

// Mock related properties
const mockRelatedProperties: Property[] = [
    {
        id: '2',
        slug: 'palm-hills-villa',
        title: 'Palm Hills Premium Villa',
        description: 'Modern villa in Palm Hills compound.',
        price: 18500000,
        priceType: 'sale',
        propertyType: 'Villa',
        status: 'available',
        bedrooms: 5,
        bathrooms: 4,
        areaSqft: 4200,
        address: 'Palm Hills',
        city: 'Giza',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    },
    {
        id: '3',
        slug: 'allegria-apartment',
        title: 'Allegria Luxury Apartment',
        description: 'Spacious apartment with garden view.',
        price: 8200000,
        priceType: 'sale',
        propertyType: 'Apartment',
        status: 'available',
        bedrooms: 3,
        bathrooms: 2,
        areaSqft: 1800,
        address: 'Sheikh Zayed',
        city: 'Giza',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    },
    {
        id: '4',
        slug: 'zed-towers',
        title: 'Zed Towers Penthouse',
        description: 'Exclusive penthouse with panoramic views.',
        price: 32000000,
        priceType: 'sale',
        propertyType: 'Penthouse',
        status: 'available',
        bedrooms: 4,
        bathrooms: 3,
        areaSqft: 3800,
        address: 'Sheikh Zayed',
        city: 'Giza',
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    },
    {
        id: '5',
        slug: 'compound-gate',
        title: 'The Gate Compound Unit',
        description: 'Contemporary living in The Gate.',
        price: 12500000,
        priceType: 'sale',
        propertyType: 'Townhouse',
        status: 'available',
        bedrooms: 4,
        bathrooms: 3,
        areaSqft: 2500,
        address: 'New Zayed',
        city: 'Giza',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    },
];

export function PropertyDetailPage({
    tenant,
    slug,
    property = mockProperty,
    translations = defaultTranslations,
}: PropertyDetailPageProps) {
    const t = translations;

    // Breadcrumb items
    const breadcrumbItems = [
        { label: property.city, href: `/properties?city=${property.city}` },
        { label: property.title },
    ];

    return (
        <div>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={breadcrumbItems}
                    homeLabel={t.breadcrumb.home}
                />

                {/* Image Gallery */}
                <ImageGallery images={property.images || [property.image]} />

                {/* Property Info Bar */}
                <PropertyInfoBar
                    title={property.title}
                    location={property.address}
                    propertyType={property.propertyType}
                    developerPrice={property.price}
                    currency="EGP"
                    translations={t.infoBar}
                    phoneNumber={tenant.contactPhone}
                    whatsappNumber={tenant.contactPhone?.replace(/\D/g, '')}
                />

                {/* Property Details Actions */}
                <PropertyDetailsActions
                    images={property.images || [property.image]}
                    location={mockLocation}
                    masterPlan={mockMasterPlan}
                    translations={t.actions}
                />
            </div>

            {/* Related Properties Section */}
            <RelatedProperties
                properties={mockRelatedProperties}
                areaName={property.city}
                translations={t.relatedProperties}
            />
        </div>
    );
}
