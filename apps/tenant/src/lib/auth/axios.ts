import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getCustomerAuthCookie } from './cookies';
import { headers } from 'next/headers';

/**
 * Extract subdomain from request headers
 */
export async function getSubdomainFromRequest(): Promise<string | null> {
    const headersList = await headers();
    const host = headersList.get('host') || '';

    // Extract subdomain from host (e.g., "my-shop.example.com" -> "my-shop")
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3001';

    if (host.endsWith(rootDomain)) {
        const subdomain = host.replace(`.${rootDomain}`, '').split('.')[0];
        return subdomain || null;
    }

    // For development with localhost:[port], use X-Tenant-ID header or path
    const tenantHeader = headersList.get('X-Tenant-ID');
    if (tenantHeader) {
        return tenantHeader;
    }

    return null;
}

/**
 * Create Axios instance for tenant customer API calls
 * This instance automatically attaches customer auth tokens and tenant context
 */
export function createCustomerAuthAxios(): AxiosInstance {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    if (!baseURL && typeof window === 'undefined') {
        console.warn('NEXT_PUBLIC_API_URL is not defined in environment variables');
    }

    const instance = axios.create({
        baseURL: baseURL || 'http://127.0.0.1:8000/api/v1',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        timeout: 30000,
    });

    // Request interceptor: attach token
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const token = await getCustomerAuthCookie();

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor: handle errors
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            if (error.response?.status === 401) {
                console.error('Customer unauthorized request - token may be invalid');
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

/**
 * Create Axios instance for public tenant API calls (no auth required)
 */
export function createPublicAxios(): AxiosInstance {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    if (!baseURL && typeof window === 'undefined') {
        console.warn('PUBLIC_API_URL is not defined. Falling back to default for publicAxios.');
    }

    return axios.create({
        baseURL: baseURL || 'http://127.0.0.1:8000/api/v1',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        timeout: 30000,
    });
}

/**
 * Singleton instance for server-side customer API calls
 */
export const customerAuthAxios = createCustomerAuthAxios();

/**
 * Singleton instance for public API calls
 */
export const publicAxios = createPublicAxios();
