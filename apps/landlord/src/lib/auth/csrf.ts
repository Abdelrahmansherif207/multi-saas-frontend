import { randomBytes } from 'crypto';
import { setCSRFCookie, getCSRFCookie } from './cookies';

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
    return randomBytes(32).toString('hex');
}

/**
 * Set CSRF token in cookie
 */
export async function setCSRFToken(): Promise<string> {
    const token = generateCSRFToken();
    await setCSRFCookie(token);
    return token;
}

/**
 * Validate CSRF token (double-submit cookie pattern)
 */
export async function validateCSRFToken(submittedToken: string): Promise<boolean> {
    const cookieToken = await getCSRFCookie();

    if (!cookieToken || !submittedToken) {
        return false;
    }

    // Constant-time comparison to prevent timing attacks
    return timingSafeEqual(
        Buffer.from(cookieToken),
        Buffer.from(submittedToken)
    );
}

/**
 * Timing-safe string comparison
 */
function timingSafeEqual(a: Buffer, b: Buffer): boolean {
    if (a.length !== b.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a[i] ^ b[i];
    }

    return result === 0;
}

/**
 * Get CSRF token for forms
 * Use this in Server Components to get token for forms
 */
export async function getCSRFToken(): Promise<string> {
    let token = await getCSRFCookie();

    if (!token) {
        token = await setCSRFToken();
    }

    return token;
}
