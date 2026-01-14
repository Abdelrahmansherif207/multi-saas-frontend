/**
 * Tenant Customer Authentication Types
 */

export interface Customer {
    id: number;
    name: string;
    email: string;
    mobile?: string;
    address?: string;
    avatar?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface CustomerAuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        token_type: string;
        expires_at?: string;
        customer: Customer;
    };
}

export interface CustomerLoginRequest {
    credential: string;
    password: string;
}

export interface CustomerRegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    mobile?: string;
}

export interface CustomerApiError {
    message: string;
    errors?: Record<string, string[]>;
}
