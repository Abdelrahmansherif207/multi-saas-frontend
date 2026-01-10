import { cookies } from 'next/headers';

/**
 * Cookie names for admin authentication
 * Separate from user auth to allow simultaneous sessions
 */
export const ADMIN_AUTH_COOKIE_NAME = 'admin_auth_token';
export const ADMIN_TOKEN_ISSUED_AT_COOKIE = 'admin_token_issued_at';

/**
 * Cookie configuration for production security
 */
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * Set admin authentication token in HttpOnly cookie
 */
export async function setAdminAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(ADMIN_AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);

    // Track when token was issued for virtual expiry
    cookieStore.set(
        ADMIN_TOKEN_ISSUED_AT_COOKIE,
        Date.now().toString(),
        COOKIE_OPTIONS
    );
}

/**
 * Get admin authentication token from HttpOnly cookie
 */
export async function getAdminAuthCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_AUTH_COOKIE_NAME);
    return cookie?.value || null;
}

/**
 * Get admin token issued timestamp
 */
export async function getAdminTokenIssuedAt(): Promise<number | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_TOKEN_ISSUED_AT_COOKIE);
    return cookie?.value ? parseInt(cookie.value, 10) : null;
}

/**
 * Delete admin authentication cookies
 */
export async function deleteAdminAuthCookies(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete(ADMIN_AUTH_COOKIE_NAME);
    cookieStore.delete(ADMIN_TOKEN_ISSUED_AT_COOKIE);
}

/**
 * Check if admin token needs rotation based on virtual expiry
 * Virtual expiry: 12 minutes
 */
export async function shouldRotateAdminToken(): Promise<boolean> {
    const issuedAt = await getAdminTokenIssuedAt();
    if (!issuedAt) return false;

    const VIRTUAL_EXPIRY_MS = 12 * 60 * 1000; // 12 minutes
    const now = Date.now();
    const age = now - issuedAt;

    return age > VIRTUAL_EXPIRY_MS;
}
