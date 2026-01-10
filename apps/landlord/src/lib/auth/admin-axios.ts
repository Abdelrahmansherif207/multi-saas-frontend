import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getAdminAuthCookie } from './admin-cookies';

/**
 * Create Axios instance for admin backend API calls
 * This instance automatically attaches admin auth tokens from HttpOnly cookies
 */
export function createAdminAuthAxios(): AxiosInstance {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        timeout: 30000,
    });

    // Request interceptor: attach token from HttpOnly cookie
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Get admin token from server-side cookie
            const token = await getAdminAuthCookie();

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
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
                console.error('Admin unauthorized request - token may be invalid');
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

/**
 * Singleton instance for server-side admin API calls
 */
export const adminAuthAxios = createAdminAuthAxios();
