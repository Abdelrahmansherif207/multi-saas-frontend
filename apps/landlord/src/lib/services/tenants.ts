import axios from 'axios';

export interface CreateTenantData {
    subdomain: string;
    plan_id: string | number;
    theme: string;
    theme_code?: string;
}

/**
 * Service for tenant-related operations.
 * Calls the local Next.js API routes (BFF).
 */
export const tenantService = {
    /**
     * Create a new tenant.
     * @param data Tenant creation data
     */
    create: async (data: CreateTenantData) => {
        const response = await axios.post('/api/tenants', data);
        return response.data;
    },

    /**
     * Get list of user's tenants.
     */
    list: async () => {
        const response = await axios.get('/api/tenants');
        return response.data;
    },

    /**
     * Check tenant database status.
     * @param subdomain Tenant subdomain
     */
    getDatabaseStatus: async (subdomain: string) => {
        const response = await axios.get(`/api/tenants/${subdomain}/database-status`);
        return response.data;
    },

    /**
     * Switch to a tenant context (as landlord/admin).
     * @param subdomain Tenant subdomain
     */
    switch: async (subdomain: string) => {
        const response = await axios.post(`/api/tenants/${subdomain}/switch`);
        return response.data;
    }
};
