import axios from 'axios';
import { publicAxios } from '../auth/axios';

export interface TenantInfoResponse {
    success: boolean;
    message: string;
    data: {
        tenant_id: string;
        settings: {
            id: string;
            user_id: number;
            theme: string | null;
            theme_code: string;
            instruction_status: boolean;
            data: any[];
            created_at: string;
        };
        package: {
            has_subscription: boolean;
            package: {
                id: number;
                title: string;
                type: number;
                price: string;
            };
            features: string[];
            permissions: {
                page: number;
                blog: number;
                product: number;
                portfolio: number;
                storage: number;
                appointment: number;
            };
            expire_date: string;
            is_expired: boolean;
            is_lifetime: boolean;
            start_date: string;
            payment_status: number;
        };
        remaining_days: number;
        features: string[];
    };
}

export const tenantService = {
    /**
     * Get tenant information from the backend
     * @param subdomain The tenant subdomain (e.g. 'dod3')
     */
    getInfo: async (subdomain: string): Promise<TenantInfoResponse | null> => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

        try {
            // Robustly identify the tenant by using the subdomain in the URL host
            // Example: http://karim123.localhost:8000/api/v1/tenant/karim123/info
            const urlObj = new URL(apiBaseUrl);
            const baseHost = urlObj.host.replace('127.0.0.1', 'localhost');
            const tenantApiUrl = `${urlObj.protocol}//${subdomain}.${baseHost}${urlObj.pathname}/tenant/${subdomain}/info`;

            console.log(`[TenantService] Calling: ${tenantApiUrl}`);

            const response = await axios.get(tenantApiUrl, {
                headers: {
                    'Accept': 'application/json',
                    'X-Tenant-ID': subdomain, // Redundant but safe
                },
                timeout: 5000
            });

            console.log(`[TenantService] ✅ Success for ${subdomain}`);
            return response.data;
        } catch (error: any) {
            console.error(`[TenantService] ❌ Error for ${subdomain}: ${error.message}`);
            if (error.response) {
                console.error(`[TenantService] Status: ${error.response.status}`);
                console.error(`[TenantService] Response Data:`, error.response.data);
            }
            return null;
        }
    }
};
