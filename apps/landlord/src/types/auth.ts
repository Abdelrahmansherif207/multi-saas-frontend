export interface Config {
    [key: string]: any;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    mobile?: string;
    company?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    image?: string;
    has_subdomain?: boolean;
    email_verified: boolean;
    latest_payment?: any;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        token_type: string;
        expires_at: string;
        email_verification_required: boolean;
        requires_2fa?: boolean;
        two_factor_token?: string;
        user: User;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
    two_factor_token?: string;
}

export interface RegisterRequest {
    name: string;
    username?: string;
    email: string;
    mobile?: string;
    address?: string;
    country?: string;
    password: string;
    password_confirmation: string;
}

export interface TokenData {
    token: string;
    issuedAt: number;
    expiresAt: string;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}
