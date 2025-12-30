import { TenantConfig, Property, MenuItem, Compound, Area, Launch } from '@repo/themes/real-estate';

// Mock tenant configurations for different "tenants"
export const mockTenants: Record<string, TenantConfig> = {
    'real-estate': {
        id: 'real-estate',
        theme: 'real-estate',
        name: 'Real Estate',
        logo: undefined,
        primaryColor: '#94a4cfff',
        contactEmail: 'info@realestate.com',
        contactPhone: '+1 (555) 123-4567',
        address: '123 Demo Street, New York, NY 10001',
        socialLinks: {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
    },
    demo: {
        id: 'demo',
        theme: 'real-estate',
        name: 'Demo Real Estate',
        logo: undefined,
        primaryColor: '#94a4cfff',
        contactEmail: 'info@realestate.com',
        contactPhone: '+1 (555) 123-4567',
        address: '123 Demo Street, New York, NY 10001',
        socialLinks: {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
    },
    luxuryrealty: {
        id: 'luxuryrealty',
        theme: 'real-estate',
        name: 'Luxury Realty',
        logo: undefined,
        primaryColor: '#1e40af',
        contactEmail: 'sales@luxuryrealty.com',
        contactPhone: '+1 (555) 999-8888',
        address: '500 Park Avenue, New York, NY 10022',
        socialLinks: {
            facebook: 'https://facebook.com/luxuryrealty',
            instagram: 'https://instagram.com/luxuryrealty',
            linkedin: 'https://linkedin.com/company/luxuryrealty',
        },
    },
    oceanview: {
        id: 'oceanview',
        theme: 'minimal',
        name: 'Ocean View Homes',
        logo: undefined,
        primaryColor: '#0891b2',
        contactEmail: 'hello@oceanviewhomes.com',
        contactPhone: '+1 (555) 456-7890',
        address: '789 Beach Blvd, Miami, FL 33139',
        socialLinks: {
            facebook: 'https://facebook.com/oceanview',
            twitter: 'https://twitter.com/oceanview',
        },
    },
};

// Default menu for all tenants
export const mockMenu: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'Agents', href: '/agents' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

// Mock properties for each tenant
export const mockProperties: Record<string, Property[]> = {
    'real-estate': [
        {
            id: '1',
            slug: 'modern-downtown-apartment',
            title: 'Modern Downtown Apartment',
            description: 'Beautiful modern apartment in the heart of downtown.',
            price: 450000,
            priceType: 'sale',
            propertyType: 'apartment',
            status: 'available',
            bedrooms: 2,
            bathrooms: 2,
            areaSqft: 1200,
            address: '123 Main St',
            city: 'New York',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        },
        {
            id: '2',
            slug: 'luxury-beach-villa',
            title: 'Luxury Beach Villa',
            description: 'Stunning beachfront villa with panoramic ocean views.',
            price: 2500000,
            priceType: 'sale',
            propertyType: 'villa',
            status: 'available',
            bedrooms: 5,
            bathrooms: 4,
            areaSqft: 4500,
            address: '456 Ocean Drive',
            city: 'Miami',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        },
        {
            id: '3',
            slug: 'cozy-suburban-house',
            title: 'Cozy Suburban House',
            description: 'Perfect family home in a quiet neighborhood.',
            price: 3500,
            priceType: 'rent',
            propertyType: 'house',
            status: 'available',
            bedrooms: 3,
            bathrooms: 2,
            areaSqft: 2000,
            address: '789 Oak Lane',
            city: 'Chicago',
            image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
        },
        {
            id: '4',
            slug: 'commercial-office-space',
            title: 'Commercial Office Space',
            description: 'Prime office location with modern amenities.',
            price: 8000,
            priceType: 'rent',
            propertyType: 'commercial',
            status: 'available',
            bedrooms: 0,
            bathrooms: 2,
            areaSqft: 3000,
            address: '100 Business Park',
            city: 'San Francisco',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        },
        {
            id: '5',
            slug: 'penthouse-suite',
            title: 'Penthouse Suite',
            description: 'Exclusive penthouse with city skyline views.',
            price: 1800000,
            priceType: 'sale',
            propertyType: 'apartment',
            status: 'pending',
            bedrooms: 3,
            bathrooms: 3,
            areaSqft: 2800,
            address: '1 Luxury Tower',
            city: 'New York',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        },
        {
            id: '6',
            slug: 'garden-townhouse',
            title: 'Garden Townhouse',
            description: 'Charming townhouse with private garden.',
            price: 675000,
            priceType: 'sale',
            propertyType: 'house',
            status: 'available',
            bedrooms: 4,
            bathrooms: 3,
            areaSqft: 2200,
            address: '55 Garden Row',
            city: 'Boston',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        },
    ],
    luxuryrealty: [
        {
            id: '1',
            slug: 'beverly-hills-mansion',
            title: 'Beverly Hills Mansion',
            description: 'Iconic mansion with celebrity neighbors.',
            price: 15000000,
            priceType: 'sale',
            propertyType: 'villa',
            status: 'available',
            bedrooms: 8,
            bathrooms: 10,
            areaSqft: 12000,
            address: '1 Celebrity Lane',
            city: 'Beverly Hills',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        },
        {
            id: '2',
            slug: 'manhattan-penthouse',
            title: 'Manhattan Penthouse',
            description: 'Ultra-luxury penthouse on 5th Avenue.',
            price: 25000000,
            priceType: 'sale',
            propertyType: 'apartment',
            status: 'available',
            bedrooms: 5,
            bathrooms: 6,
            areaSqft: 8000,
            address: '800 5th Avenue',
            city: 'New York',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        },
    ],
    oceanview: [
        {
            id: '1',
            slug: 'miami-beach-condo',
            title: 'Miami Beach Condo',
            description: 'Oceanfront condo with stunning sunrise views.',
            price: 950000,
            priceType: 'sale',
            propertyType: 'apartment',
            status: 'available',
            bedrooms: 2,
            bathrooms: 2,
            areaSqft: 1500,
            address: '100 Ocean Blvd',
            city: 'Miami Beach',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        },
        {
            id: '2',
            slug: 'key-west-retreat',
            title: 'Key West Retreat',
            description: 'Tropical paradise with private dock.',
            price: 1200000,
            priceType: 'sale',
            propertyType: 'house',
            status: 'available',
            bedrooms: 3,
            bathrooms: 2,
            areaSqft: 1800,
            address: '25 Palm Island',
            city: 'Key West',
            image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
        },
    ],
};

// Mock compounds for main tenant
export const mockCompounds: Compound[] = [
    {
        id: '1',
        slug: 'jirian-nations-of-sky',
        title: 'Jirian - Nations of Sky',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600',
        propertyCount: 9
    },
    {
        id: '2',
        slug: 'tierra',
        title: 'Tierra',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
        propertyCount: 8
    },
    {
        id: '3',
        slug: 'solana-east-strip',
        title: 'Solana East Strip',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
        propertyCount: 1
    },
    {
        id: '4',
        slug: 'east-vale',
        title: 'East Vale',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
        propertyCount: 15
    },
    {
        id: '5',
        slug: 'hyde-park-signature',
        title: 'Hyde Park Signature',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
        propertyCount: 5
    },
    {
        id: '6',
        slug: 'crescent-walk',
        title: 'Crescent Walk',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
        propertyCount: 25
    }
];

// Hero section data per tenant
export const mockHeroData: Record<string, { title: string; subtitle: string; backgroundImage: string; images?: string[] }> = {
    'real-estate': {
        title: 'Find Your Dream Home',
        subtitle: 'Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces.',
        backgroundImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920'
        ]
    },
    luxuryrealty: {
        title: 'Luxury Living Redefined',
        subtitle: 'Exclusive properties for the most discerning buyers. Where prestige meets perfection.',
        backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
    },
    oceanview: {
        title: 'Your Oceanfront Paradise Awaits',
        subtitle: 'Premium beachfront properties in the most desirable coastal locations.',
        backgroundImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920',
    },
};

// Mock areas for each tenant
export const mockAreas: Record<string, Area[]> = {
    demo: [
        { id: '1', name: 'New Cairo', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', count: 12 },
        { id: '2', name: '6th of October City', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400', count: 8 },
        { id: '3', name: 'New Capital City', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400', count: 15 },
        { id: '4', name: 'Mostakbal City', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', count: 5 },
        { id: '5', name: 'Ain Sokhna', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', count: 7 },
        { id: '6', name: 'North Coast-Sahel', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', count: 10 },
        { id: '7', name: 'El Gouna', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', count: 4 },
        { id: '8', name: 'New Heliopolis', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', count: 6 },
    ],
    luxuryrealty: [
        { id: '1', name: 'Beverly Hills', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', count: 20 },
        { id: '2', name: 'Manhattan', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', count: 15 },
    ],
    oceanview: [
        { id: '1', name: 'Miami Beach', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', count: 12 },
        { id: '2', name: 'Key West', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400', count: 8 },
    ],
};

// Mock launches for each tenant
export const mockLaunches: Record<string, Launch[]> = {
    demo: [
        { id: '1', title: 'The Waterway North', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', developer: 'The Waterway' },
        { id: '2', title: 'Mountain View iCity', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', developer: 'Mountain View' },
        { id: '3', title: 'Palm Hills New Cairo', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', developer: 'Palm Hills' },
        { id: '4', title: 'Sodic East', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', developer: 'SODIC' },
    ],
    luxuryrealty: [
        { id: '1', title: 'Beverly Hills Residences', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', developer: 'Luxury Dev' },
    ],
    oceanview: [
        { id: '1', title: 'Oceanfront Towers', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', developer: 'Coastal Group' },
    ],
};

// Helper function to get tenant data
export function getTenantData(domain: string) {
    const tenant = mockTenants[domain] || mockTenants['real-estate'];
    const properties = mockProperties[domain] || mockProperties['real-estate'];
    const hero = mockHeroData[domain] || mockHeroData['real-estate'];
    const areas = mockAreas[domain] || mockAreas.demo;
    const launches = mockLaunches[domain] || mockLaunches.demo;
    const compounds = domain === 'real-estate' ? mockCompounds : [];

    return { tenant, properties, hero, areas, launches, menu: mockMenu, compounds };
}
