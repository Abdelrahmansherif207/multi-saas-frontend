/**
 * Tenant Configuration Types
 * 
 * These types represent tenant-specific configuration data returned from the Laravel API.
 * Used for dynamic theme loading, site settings, and tenant identification.
 */

/**
 * Core tenant configuration returned from GET /api/tenant/{domain}/config
 */
export interface TenantConfig {
    id: string;
    domain: string;
    custom_domain?: string;
    theme_slug: string;
    font_url?: string;
    site_title: string;
    logo_url?: string;
    favicon_url?: string;
    primary_color?: string;
    secondary_color?: string;
    footer_text?: string;
    social_links?: TenantSocialLinks;
    contact_info?: TenantContactInfo;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Social media links for tenant
 */
export interface TenantSocialLinks {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
}

/**
 * Contact information for tenant
 */
export interface TenantContactInfo {
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    postal_code?: string;
}

/**
 * Minimal tenant info for listing purposes
 */
export interface TenantSummary {
    id: string;
    domain: string;
    site_title: string;
    theme_slug: string;
    is_active: boolean;
}

/**
 * Theme configuration for dynamic CSS loading
 */
export interface ThemeConfig {
    slug: string;
    name: string;
    css_url: string;
    preview_image_url?: string;
    description?: string;
}
