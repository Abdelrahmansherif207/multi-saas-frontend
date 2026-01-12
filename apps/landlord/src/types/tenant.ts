/**
 * Tenant Management Types
 */

export interface Tenant {
    id: number;
    subdomain: string;
    domain?: string;
    name: string;
    theme: string;
    status: 'active' | 'suspended' | 'pending';
    database_status: 'ready' | 'creating' | 'failed';
    owner_id: number;
    created_at: string;
    updated_at: string;
}

export interface TenantListResponse {
    success: boolean;
    data: Tenant[];
}

export interface TenantSwitchResponse {
    success: boolean;
    message?: string;
    data: {
        token: string;  // Tenant-scoped admin token
        tenant: Tenant;
    };
}

export interface DatabaseStatusResponse {
    success: boolean;
    data: {
        status: 'ready' | 'creating' | 'failed';
        message?: string;
        progress?: number;
    };
}

// For dashboard display
export interface TenantWithSubscription extends Tenant {
    subscription?: {
        id: number;
        plan_name: string;
        status: string;
        starts_at: string;
        ends_at: string;
    };
}
