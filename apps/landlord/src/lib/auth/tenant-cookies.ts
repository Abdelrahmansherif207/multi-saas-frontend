import { cookies } from 'next/headers';

/**
 * Cookie names for tenant-scoped authentication
 * Separate from user auth to allow simultaneous landlord + tenant admin sessions
 */
export const TENANT_AUTH_COOKIE_NAME = 'tenant_auth_token';
export const TENANT_TOKEN_ISSUED_AT_COOKIE = 'tenant_token_issued_at';
export const ACTIVE_TENANT_SUBDOMAIN_COOKIE = 'active_tenant_subdomain';

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
 * Set tenant-scoped authentication token in HttpOnly cookie
 */
export async function setTenantAuthCookie(token: string, subdomain: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(TENANT_AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);

    // Track which tenant is active
    cookieStore.set(ACTIVE_TENANT_SUBDOMAIN_COOKIE, subdomain, {
        ...COOKIE_OPTIONS,
        httpOnly: false, // Allow client to read active tenant
    });

    // Track when token was issued for virtual expiry
    cookieStore.set(
        TENANT_TOKEN_ISSUED_AT_COOKIE,
        Date.now().toString(),
        COOKIE_OPTIONS
    );
}

/**
 * Get tenant-scoped authentication token from HttpOnly cookie
 */
export async function getTenantAuthCookie(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(TENANT_AUTH_COOKIE_NAME);
    return cookie?.value || null;
}

/**
 * Get active tenant subdomain
 */
export async function getActiveTenantSubdomain(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ACTIVE_TENANT_SUBDOMAIN_COOKIE);
    return cookie?.value || null;
}

/**
 * Get tenant token issued timestamp
 */
export async function getTenantTokenIssuedAt(): Promise<number | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(TENANT_TOKEN_ISSUED_AT_COOKIE);
    return cookie?.value ? parseInt(cookie.value, 10) : null;
}

/**
 * Delete tenant authentication cookies
 */
export async function deleteTenantAuthCookies(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete(TENANT_AUTH_COOKIE_NAME);
    cookieStore.delete(TENANT_TOKEN_ISSUED_AT_COOKIE);
    cookieStore.delete(ACTIVE_TENANT_SUBDOMAIN_COOKIE);
}

/**
 * Check if tenant token needs rotation based on virtual expiry
 * Virtual expiry: 12 minutes
 */
export async function shouldRotateTenantToken(): Promise<boolean> {
    const issuedAt = await getTenantTokenIssuedAt();
    if (!issuedAt) return false;

    const VIRTUAL_EXPIRY_MS = 12 * 60 * 1000; // 12 minutes
    const now = Date.now();
    const age = now - issuedAt;

    return age > VIRTUAL_EXPIRY_MS;
}
