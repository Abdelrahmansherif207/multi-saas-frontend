import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getAuthCookie } from './cookies';

/**
 * Create Axios instance for backend API calls
 * This instance automatically attaches auth tokens from HttpOnly cookies
 */
const base = process.env.NEXT_PUBLIC_API_URL;
console.log(base);
export function createAuthAxios(): AxiosInstance {
    const instance = axios.create({
        baseURL: base,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        timeout: 30000,
    });

    // Request interceptor: attach token from HttpOnly cookie
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Get token from server-side cookie
            const token = await getAuthCookie();

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
                // Token is invalid or expired
                // In API routes, this will trigger logout
                console.log('Unauthorized request - token may be invalid');
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

/**
 * Singleton instance for server-side use
 */
export const authAxios = createAuthAxios();
