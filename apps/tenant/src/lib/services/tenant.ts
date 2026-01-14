import { customerAuthAxios } from '../auth/axios';

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
        try {
            const response = await customerAuthAxios.get(`/tenant/${subdomain}/info`, {
                headers: {
                    'X-Tenant-ID': subdomain,
                    'Accept': 'application/json',
                },
                timeout: 5000
            });

            return response.data;
        } catch (error: any) {
            return null;
        }
    }
};
