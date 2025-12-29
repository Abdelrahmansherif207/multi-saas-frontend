import * as RealEstateTheme from '@repo/themes/real-estate';
import * as MinimalTheme from '@repo/themes/minimal';

export const ThemeRegistry = {
    'real-estate': {
        Layout: RealEstateTheme.TenantLayout,
        Header: RealEstateTheme.Header,
        Footer: RealEstateTheme.Footer,
        HeroSection: RealEstateTheme.HeroSection,
        PropertyCard: RealEstateTheme.PropertyCard,
        PropertyGrid: RealEstateTheme.PropertyGrid,
    },
    'minimal': {
        Layout: MinimalTheme.TenantLayout,
        Header: MinimalTheme.Header,
        Footer: MinimalTheme.Footer,
        HeroSection: MinimalTheme.HeroSection,
        PropertyCard: MinimalTheme.PropertyCard,
        PropertyGrid: MinimalTheme.PropertyGrid,
    }
};

export type ThemeType = keyof typeof ThemeRegistry;
