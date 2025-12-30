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

// Compound Types
export interface Compound {
    id: string;
    slug: string;
    title: string;
    image: string;
    propertyCount: number;
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

export interface TopCompoundsProps {
    compounds: Compound[];
    title?: string;
    subtitle?: string;
}

export interface SellPropertyBannerProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

export interface ExpertAdviceFormProps {
    title?: string;
    subtitle?: string;
}

// Area Types
export interface Area {
    id: string;
    name: string;
    image: string;
    count?: number;
}

export interface TopAreasProps {
    title?: string;
    subtitle?: string;
    areas: Area[];
    layout?: 'grid' | 'slider' | 'carousel';
}

// Launch Types
export interface Launch {
    id: string;
    title: string;
    image: string;
    developer?: string;
    link?: string;
}

export interface NewLaunchesProps {
    title?: string;
    launches: Launch[];
    showAllLink?: string;
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
            searchButton: string;
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

// Property Detail Page Types
export interface PropertyDetailTranslations {
    breadcrumb: {
        home: string;
    };
    infoBar: {
        developerPrice: string;
        resalePrice: string;
        callUs: string;
        whatsapp: string;
    };
    actions: {
        title: string;
        gallery: string;
        map: string;
        masterPlan: string;
    };
    relatedProperties: {
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

export interface PropertyDetailPageProps {
    tenant: TenantConfig;
    slug: string;
    property?: Property;
    translations?: PropertyDetailTranslations;
}
