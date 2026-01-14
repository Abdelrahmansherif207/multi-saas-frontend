import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getTenantAuthCookie, getActiveTenantSubdomain } from './tenant-cookies';

/**
 * Create Axios instance for tenant-scoped backend API calls
 * This instance automatically attaches tenant auth tokens and subdomain context
 */
export function createTenantAuthAxios(): AxiosInstance {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        timeout: 30000,
    });

    // Request interceptor: attach token and tenant context
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Get tenant token from server-side cookie
            const token = await getTenantAuthCookie();
            const subdomain = await getActiveTenantSubdomain();

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Add tenant context header
            if (subdomain && config.headers) {
                config.headers['X-Tenant-ID'] = subdomain;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor: handle errors
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            // Handle 401 Unauthorized
            if (error.response?.status === 401) {
                console.error('Tenant unauthorized request - token may be invalid');
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

/**
 * Singleton instance for server-side tenant-scoped API calls
 */
export const tenantAuthAxios = createTenantAuthAxios();
