/**
 * User and Authentication Types
 * 
 * Types for user data, authentication responses, and role-based access.
 */

/**
 * User roles in the system
 */
export type UserRole = 'super_admin' | 'tenant_admin' | 'customer';

/**
 * Base user interface
 */
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar_url?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

/**
 * Super Admin user (landlord context)
 */
export interface SuperAdmin extends User {
    role: 'super_admin';
    permissions: string[];
}

/**
 * Tenant Admin user (tenant context)
 */
export interface TenantAdmin extends User {
    role: 'tenant_admin';
    tenant_id: string;
    permissions: string[];
}

/**
 * Customer user (tenant context)
 */
export interface Customer extends User {
    role: 'customer';
    tenant_id: string;
    phone?: string;
    address?: CustomerAddress;
}

/**
 * Customer address
 */
export interface CustomerAddress {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
}

/**
 * Authentication response from login endpoint
 */
export interface AuthResponse {
    user: User;
    token: string;
    token_type: 'Bearer';
    expires_at?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

/**
 * Registration data
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
