/**
 * Tenant API Functions
 * 
 * Functions for fetching tenant-specific data.
 * Primarily used by Server Components for SSR.
 */

import type { TenantConfig, ThemeConfig, ApiResponse } from '@repo/types';
import { apiGet } from './index';

/**
 * Fetch tenant configuration by domain
 * Used in tenant layout.tsx for dynamic theme loading
 * 
 * @param domain - The tenant's subdomain or custom domain
 * @returns Tenant configuration including theme and settings
 */
export async function getTenantConfig(domain: string): Promise<TenantConfig> {
    const response = await apiGet<TenantConfig>(`/tenants/${domain}/config`);
    return response.data;
}

/**
 * Fetch available themes
 * Used in admin dashboard for theme selection
 * 
 * @returns List of available themes
 */
export async function getAvailableThemes(): Promise<ThemeConfig[]> {
    const response = await apiGet<ThemeConfig[]>('/themes');
    return response.data;
}

/**
 * Validate if a domain/subdomain is available
 * Used during tenant registration
 * 
 * @param domain - The domain to check
 * @returns Whether the domain is available
 */
export async function checkDomainAvailability(domain: string): Promise<boolean> {
    try {
        const response = await apiGet<{ available: boolean }>(`/tenants/check-domain/${domain}`);
        return response.data.available;
    } catch {
        // If endpoint fails, assume unavailable for safety
        return false;
    }
}

/**
 * Server-side fetch for tenant config (bypasses client cache)
 * For use in Server Components only
 * 
 * @param domain - The tenant's domain
 * @param apiUrl - The API base URL (from server environment)
 * @returns Tenant configuration
 */
export async function fetchTenantConfigServer(
    domain: string,
    apiUrl: string
): Promise<TenantConfig> {
    const response = await fetch(`${apiUrl}/tenants/${domain}/config`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        // Standard cache control (Next.js will interpret this for ISR)
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch tenant config: ${response.statusText}`);
    }

    const data: ApiResponse<TenantConfig> = await response.json();
    return data.data;
}
