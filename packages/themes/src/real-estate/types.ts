// Property Types
export interface Property {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    priceType: 'sale' | 'rent';
    propertyType: string;
    status: 'available' | 'sold' | 'pending';
    bedrooms: number;
    bathrooms: number;
    areaSqft: number;
    address: string;
    city: string;
    image: string;
    images?: string[];
    features?: string[];
    agentId?: string;
}

// Agent Types
export interface Agent {
    id: string;
    name: string;
    title: string;
    avatar: string;
    phone: string;
    email: string;
    bio?: string;
}

// Tenant Configuration
export interface TenantConfig {
    id: string;
    theme: string;
    name: string;
    logo?: string;
    primaryColor?: string;
    contactEmail?: string;
    contactPhone?: string;
    address?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
}

// Menu Types
export interface MenuItem {
    label: string;
    href: string;
    children?: MenuItem[];
}

// Widget Props
export interface HeroSectionProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    images?: string[];
    ctaText?: string;
    ctaLink?: string;
    translations?: ThemeTranslations['Hero'];
}

export interface PropertyCardProps {
    property: Property;
}

export interface PropertyGridProps {
    properties: Property[];
    columns?: 2 | 3 | 4;
}

// Localization Types
export interface LocalizationProps {
    currentLocale: string;
    availableLocales: {
        code: string;
        label: string;
        flag?: string;
        href: string;
    }[];
}

// Translation Types
export interface ThemeTranslations {
    Header: {
        contact: string;
        phone: string;
        email: string;
        language: string;
    };
    Hero: {
        title: string;
        subtitle: string;
        tabs: {
            compounds: string;
            properties: string;
        };
        searchPlaceholder: string;
        filters: {
            propertyType: string;
            bedsBaths: string;
            priceRange: string;
        };
        searchButton: string;
    };
}

export interface TenantLayoutProps {
    children: React.ReactNode;
    config: TenantConfig;
    menu?: MenuItem[];
    localization?: LocalizationProps;
    translations?: ThemeTranslations;
}
