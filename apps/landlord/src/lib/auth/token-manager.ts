import { getTokenIssuedAt, setAuthCookie } from './cookies';

/**
 * Virtual token expiry in milliseconds (12 minutes)
 * Tokens are rotated before they actually expire
 */
const VIRTUAL_EXPIRY_MS = 12 * 60 * 1000;

/**
 * Minimum time between rotation attempts (prevents concurrent rotations)
 */
const MIN_ROTATION_INTERVAL_MS = 60 * 1000; // 1 minute

/**
 * Track last rotation attempt to prevent concurrent requests
 */
let lastRotationAttempt = 0;

/**
 * Check if token needs rotation based on virtual expiry
 */
export async function needsRotation(): Promise<boolean> {
    const issuedAt = await getTokenIssuedAt();
    if (!issuedAt) return false;

    const now = Date.now();
    const age = now - issuedAt;

    // Check if token is old enough to rotate
    if (age < VIRTUAL_EXPIRY_MS) {
        return false;
    }

    // Prevent concurrent rotation attempts
    if (now - lastRotationAttempt < MIN_ROTATION_INTERVAL_MS) {
        return false;
    }

    return true;
}

/**
 * Rotate token by calling the refresh endpoint
 * This should be called from middleware or API routes
 */
export async function rotateToken(): Promise<boolean> {
    try {
        lastRotationAttempt = Date.now();

        // Call the refresh endpoint (internal Next.js API route)
        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include', // Include cookies
        });

        if (!response.ok) {
            console.error('Token rotation failed:', response.status);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Token rotation error:', error);
        return false;
    }
}

/**
 * Update token and reset issued timestamp
 */
export async function updateToken(newToken: string): Promise<void> {
    await setAuthCookie(newToken);
}
