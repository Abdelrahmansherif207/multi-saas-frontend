import { cookies } from 'next/headers';

/**
 * Cookie names for authentication
 */
export const AUTH_COOKIE_NAME = 'auth_token';
export const TOKEN_ISSUED_AT_COOKIE = 'token_issued_at';
export const CSRF_COOKIE_NAME = 'csrf_token';

/**
 * Cookie configuration for production security
 */
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days (actual token lifetime from backend)
};

/**
 * Set authentication token in HttpOnly cookie
 */
export async function setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);

    // Track when token was issued for virtual expiry
    cookieStore.set(
        TOKEN_ISSUED_AT_COOKIE,
        Date.now().toString(),
        COOKIE_OPTIONS
    );
}

/**
 * Get authentication token from HttpOnly cookie
 */
export async function getAuthCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(AUTH_COOKIE_NAME);
    return cookie?.value || null;
}

/**
 * Get token issued timestamp
 */
export async function getTokenIssuedAt(): Promise<number | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(TOKEN_ISSUED_AT_COOKIE);
    return cookie?.value ? parseInt(cookie.value, 10) : null;
}

/**
 * Delete authentication cookies
 */
export async function deleteAuthCookies(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete(AUTH_COOKIE_NAME);
    cookieStore.delete(TOKEN_ISSUED_AT_COOKIE);
    cookieStore.delete(CSRF_COOKIE_NAME);
}

/**
 * Set CSRF token cookie
 */
export async function setCSRFCookie(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(CSRF_COOKIE_NAME, token, {
        ...COOKIE_OPTIONS,
        httpOnly: false, // CSRF token needs to be readable by client
    });
}

/**
 * Get CSRF token from cookie
 */
export async function getCSRFCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(CSRF_COOKIE_NAME);
    return cookie?.value || null;
}

/**
 * Check if token needs rotation based on virtual expiry
 * Virtual expiry: 10-15 minutes (configurable)
 */
export async function shouldRotateToken(): Promise<boolean> {
    const issuedAt = await getTokenIssuedAt();
    if (!issuedAt) return false;

    const VIRTUAL_EXPIRY_MS = 12 * 60 * 1000; // 12 minutes
    const now = Date.now();
    const age = now - issuedAt;

    return age > VIRTUAL_EXPIRY_MS;
}
