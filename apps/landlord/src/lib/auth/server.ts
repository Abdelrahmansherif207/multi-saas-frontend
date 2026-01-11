import { authAxios } from './axios';
import { getAuthCookie } from './cookies';
import type { User } from '@/types/auth';
import { AxiosRequestConfig } from 'axios';

/**
 * Server-side authenticated fetch utility
 * Use this in Server Components, Server Actions, and API Routes
 */
export async function authFetch<T = any>(
    url: string,
    options?: AxiosRequestConfig
): Promise<T> {
    try {
        const response = await authAxios.request<T>({
            url,
            ...options,
        });

        return response.data;
    } catch (error: any) {
        console.error('authFetch error:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Get current authenticated user
 * Use in Server Components and Server Actions
 */
export async function getCurrentUser(): Promise<User | null> {
    try {
        const token = await getAuthCookie();

        if (!token) {
            return null;
        }

        const response = await authAxios.get<{ data: User }>('/auth/me');
        return response.data.data;
    } catch (error: any) {
        console.log('getCurrentUser error:', error.response?.data || error.message);

        // Return null on 401 (not authenticated)
        if (error.response?.status === 401) {
            return null;
        }

        throw error;
    }
}

/**
 * Require authentication - throws if not authenticated
 * Use in Server Components and Server Actions that require auth
 */
export async function requireAuth(): Promise<User> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('Authentication required');
    }

    return user;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const token = await getAuthCookie();
    return !!token;
}
