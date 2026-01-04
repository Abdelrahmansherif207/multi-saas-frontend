import React from 'react';
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
        TopCompounds: RealEstateTheme.TopCompounds,
        SellPropertyBanner: RealEstateTheme.SellPropertyBanner,
        ExpertAdviceForm: RealEstateTheme.ExpertAdviceForm,
        TopAreas: RealEstateTheme.TopAreas,
        NewLaunches: RealEstateTheme.NewLaunches as React.FC<any> | undefined,
        ComparisonBanner: RealEstateTheme.ComparisonBanner,
        Pages: {
            PropertiesListPage: RealEstateTheme.PropertiesListPage,
            PropertyDetailPage: RealEstateTheme.PropertyDetailPage,
            ContactPage: RealEstateTheme.ContactPage,
            AboutPage: RealEstateTheme.AboutPage,
            BlogPage: RealEstateTheme.BlogPage,
            ComparePage: RealEstateTheme.ComparePage,
            AreaPage: RealEstateTheme.AreaPage,
        }
    },
    'minimal': {
        Layout: MinimalTheme.TenantLayout,
        Header: MinimalTheme.Header,
        Footer: MinimalTheme.Footer,
        HeroSection: MinimalTheme.HeroSection,
        PropertyCard: MinimalTheme.PropertyCard,
        PropertyGrid: MinimalTheme.PropertyGrid,
        TopCompounds: undefined,
        SellPropertyBanner: undefined,
        ExpertAdviceForm: undefined,
        TopAreas: MinimalTheme.TopAreas,
        NewLaunches: MinimalTheme.NewLaunches as React.FC<any> | undefined,
        ComparisonBanner: undefined,
        Pages: {
            PropertiesListPage: undefined,
            PropertyDetailPage: undefined,
            ContactPage: undefined,
            AboutPage: undefined,
            BlogPage: undefined,
            ComparePage: undefined,
            AreaPage: MinimalTheme.AreaPage,
        }
    }
};

export type ThemeType = keyof typeof ThemeRegistry;
