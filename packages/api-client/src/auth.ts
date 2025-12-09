/**
 * Authentication API Functions
 * 
 * Functions for user authentication against Laravel Sanctum.
 */

import type {
    User,
    AuthResponse,
    LoginCredentials,
    RegisterData,
    ApiResponse,
} from '@repo/types';
import { apiGet, apiPost, setStoredToken, removeStoredToken } from './index';

/**
 * Login with email and password
 * 
 * @param credentials - Login credentials
 * @returns Auth response with user and token
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse, LoginCredentials>(
        '/auth/login',
        credentials
    );

    // Store the token for subsequent requests
    if (response.data.token) {
        setStoredToken(response.data.token);
    }

    return response.data;
}

/**
 * Register a new user
 * 
 * @param data - Registration data
 * @returns Auth response with user and token
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse, RegisterData>('/auth/register', data);

    // Store the token for subsequent requests
    if (response.data.token) {
        setStoredToken(response.data.token);
    }

    return response.data;
}

/**
 * Logout the current user
 */
export async function logout(): Promise<void> {
    try {
        await apiPost('/auth/logout');
    } finally {
        // Always remove token, even if logout request fails
        removeStoredToken();
    }
}

/**
 * Get the currently authenticated user
 * 
 * @returns Current user or null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
    try {
        const response = await apiGet<User>('/auth/user');
        return response.data;
    } catch {
        return null;
    }
}

/**
 * Request password reset email
 * 
 * @param email - User's email address
 */
export async function forgotPassword(email: string): Promise<void> {
    await apiPost('/auth/forgot-password', { email });
}

/**
 * Reset password with token
 * 
 * @param data - Reset password data
 */
export async function resetPassword(data: {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}): Promise<void> {
    await apiPost('/auth/reset-password', data);
}

/**
 * Verify email with token
 * 
 * @param token - Verification token from email
 */
export async function verifyEmail(token: string): Promise<void> {
    await apiPost('/auth/verify-email', { token });
}

/**
 * Resend email verification
 */
export async function resendVerificationEmail(): Promise<void> {
    await apiPost('/auth/resend-verification');
}

/**
 * Refresh authentication token
 * 
 * @returns New auth response with fresh token
 */
export async function refreshToken(): Promise<AuthResponse> {
    const response = await apiPost<AuthResponse>('/auth/refresh');

    if (response.data.token) {
        setStoredToken(response.data.token);
    }

    return response.data;
}
