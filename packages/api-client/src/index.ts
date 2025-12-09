/**
 * @repo/api-client - Typed API Client
 * 
 * Base Axios configuration for communicating with the Laravel backend.
 * This client handles authentication tokens, error handling, and provides
 * typed request/response methods.
 */

import axios, {
    AxiosInstance,
    AxiosError,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, ApiError } from '@repo/types';

/**
 * Configuration options for the API client
 */
export interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    getAuthToken?: () => string | null;
    onAuthError?: () => void;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Partial<ApiClientConfig> = {
    timeout: 30000, // 30 seconds
};

/**
 * Token storage key for browser environments
 */
const TOKEN_KEY = 'auth_token';

/**
 * Get stored auth token (browser only)
 */
function getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Store auth token (browser only)
 */
export function setStoredToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove stored auth token (browser only)
 */
export function removeStoredToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * Create a configured Axios instance
 */
export function createApiClient(config: ApiClientConfig): AxiosInstance {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    const client = axios.create({
        baseURL: mergedConfig.baseURL,
        timeout: mergedConfig.timeout,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    // Request interceptor: Add auth token
    client.interceptors.request.use(
        (requestConfig: InternalAxiosRequestConfig) => {
            const token = mergedConfig.getAuthToken?.() ?? getStoredToken();
            if (token) {
                requestConfig.headers.Authorization = `Bearer ${token}`;
            }
            return requestConfig;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor: Handle errors
    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ApiError>) => {
            // Handle 401 Unauthorized
            if (error.response?.status === 401) {
                removeStoredToken();
                mergedConfig.onAuthError?.();
            }
            return Promise.reject(error);
        }
    );

    return client;
}

/**
 * Default API client instance
 * Uses NEXT_PUBLIC_API_URL environment variable
 */
let defaultClient: AxiosInstance | null = null;

/**
 * Get or create the default API client
 */
export function getApiClient(): AxiosInstance {
    if (!defaultClient) {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        defaultClient = createApiClient({ baseURL });
    }
    return defaultClient;
}

/**
 * Type-safe GET request
 */
export async function apiGet<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    const response = await getApiClient().get<ApiResponse<T>>(url, config);
    return response.data;
}

/**
 * Type-safe POST request
 */
export async function apiPost<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    const response = await getApiClient().post<ApiResponse<T>>(url, data, config);
    return response.data;
}

/**
 * Type-safe PUT request
 */
export async function apiPut<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    const response = await getApiClient().put<ApiResponse<T>>(url, data, config);
    return response.data;
}

/**
 * Type-safe DELETE request
 */
export async function apiDelete<T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    const response = await getApiClient().delete<ApiResponse<T>>(url, config);
    return response.data;
}

/**
 * Check if error is an API error
 */
export function isApiError(error: unknown): error is AxiosError<ApiError> {
    return axios.isAxiosError(error);
}

/**
 * Extract error message from API error
 */
export function getErrorMessage(error: unknown): string {
    if (isApiError(error)) {
        return error.response?.data?.message || error.message || 'An unexpected error occurred';
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
}

