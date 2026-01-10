/**
 * Admin Authentication Types
 */

export interface Admin {
    id: number;
    name: string;
    email: string;
    username: string;
    mobile?: string;
    image?: string;
    email_verified: boolean;
    roles: string[];
    permissions: string[];
    created_at: string;
    updated_at: string;
}

export interface AdminAuthResponse {
    success: boolean;
    message: string;
    data: {
        admin: Admin;
        token: string;
        token_type: string;
        expires_at: string;
    };
}

export interface AdminLoginRequest {
    credential: string;
    password: string;
}

export interface AdminResetPasswordRequest {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export interface AdminForgotPasswordRequest {
    email: string;
}

export interface AdminTokenRefreshResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        token_type: string;
        expires_at: string;
    };
}

export interface AdminApiError {
    message: string;
    errors?: Record<string, string[]>;
}

export interface AdminRegisterRequest {
    name: string;
    username: string;
    email: string;
    mobile?: string;
    address?: string;
    country?: string;
    password: string;
    password_confirmation: string;
}
