import { cookies } from 'next/headers';

/**
 * Cookie names for tenant customer authentication
 */
export const CUSTOMER_AUTH_COOKIE_NAME = 'customer_token';
export const CUSTOMER_TOKEN_ISSUED_AT_COOKIE = 'customer_token_issued_at';

/**
 * Cookie configuration for production security
 */
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * Set customer authentication token in HttpOnly cookie
 */
export async function setCustomerAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(CUSTOMER_AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);

    // Track when token was issued for virtual expiry
    cookieStore.set(
        CUSTOMER_TOKEN_ISSUED_AT_COOKIE,
        Date.now().toString(),
        COOKIE_OPTIONS
    );
}

/**
 * Get customer authentication token from HttpOnly cookie
 */
export async function getCustomerAuthCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(CUSTOMER_AUTH_COOKIE_NAME);
    return cookie?.value || null;
}

/**
 * Get customer token issued timestamp
 */
export async function getCustomerTokenIssuedAt(): Promise<number | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(CUSTOMER_TOKEN_ISSUED_AT_COOKIE);
    return cookie?.value ? parseInt(cookie.value, 10) : null;
}

/**
 * Delete customer authentication cookies
 */
export async function deleteCustomerAuthCookies(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete(CUSTOMER_AUTH_COOKIE_NAME);
    cookieStore.delete(CUSTOMER_TOKEN_ISSUED_AT_COOKIE);
}

/**
 * Check if customer token needs rotation based on virtual expiry
 * Virtual expiry: 12 minutes
 */
export async function shouldRotateCustomerToken(): Promise<boolean> {
    const issuedAt = await getCustomerTokenIssuedAt();
    if (!issuedAt) return false;

    const VIRTUAL_EXPIRY_MS = 12 * 60 * 1000; // 12 minutes
    const now = Date.now();
    const age = now - issuedAt;

    return age > VIRTUAL_EXPIRY_MS;
}
