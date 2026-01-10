import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getAuthCookie, setAuthCookie, shouldRotateToken } from '@/lib/auth/cookies';

/**
 * Token refresh/rotation endpoint
 * Called automatically by middleware when token needs rotation
 */
export async function POST(request: NextRequest) {
    try {
        const currentToken = await getAuthCookie();

        if (!currentToken) {
            return NextResponse.json(
                { message: 'No token to refresh' },
                { status: 401 }
            );
        }

        // Check if rotation is actually needed
        const needsRotation = await shouldRotateToken();
        if (!needsRotation) {
            return NextResponse.json({
                success: true,
                message: 'Token is still fresh',
            });
        }

        // For Laravel Sanctum, we typically don't have a refresh endpoint
        // Instead, we can re-authenticate or extend the token
        // This is a placeholder - adjust based on your Laravel backend implementation

        // Option 1: If your backend has a refresh endpoint
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );

            const { token } = response.data.data;

            // Update token in cookie
            await setAuthCookie(token);

            return NextResponse.json({
                success: true,
                message: 'Token refreshed',
            });
        } catch (error: any) {
            // If refresh endpoint doesn't exist, we can just reset the issued_at time
            // This effectively extends the virtual expiry
            if (error.response?.status === 404) {
                // Reset the issued_at time to extend virtual expiry
                await setAuthCookie(currentToken);

                return NextResponse.json({
                    success: true,
                    message: 'Token expiry extended',
                });
            }

            throw error;
        }

    } catch (error: any) {
        console.error('Token refresh error:', error.response?.data || error.message);

        return NextResponse.json(
            {
                message: 'Token refresh failed',
            },
            { status: error.response?.status || 500 }
        );
    }
}
