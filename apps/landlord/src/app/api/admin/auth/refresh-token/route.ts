import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getAdminAuthCookie, setAdminAuthCookie, shouldRotateAdminToken } from '@/lib/auth/admin-cookies';
import type { AdminTokenRefreshResponse } from '@/types/admin-auth';

/**
 * Admin token refresh/rotation endpoint
 * Called automatically by middleware when token needs rotation
 */
export async function POST(request: NextRequest) {
    try {
        const currentToken = await getAdminAuthCookie();

        if (!currentToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthenticated'
                },
                { status: 401 }
            );
        }

        // Check if rotation is actually needed
        const needsRotation = await shouldRotateAdminToken();
        if (!needsRotation) {
            return NextResponse.json({
                success: true,
                message: 'Token is still fresh',
            });
        }

        // Call backend refresh endpoint
        try {
            const response = await axios.post<AdminTokenRefreshResponse>(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/refresh-token`,
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
            await setAdminAuthCookie(token);

            return NextResponse.json({
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    token_type: response.data.data.token_type,
                    expires_at: response.data.data.expires_at,
                },
            });
        } catch (error: any) {
            // If refresh endpoint doesn't exist, extend virtual expiry
            if (error.response?.status === 404) {
                await setAdminAuthCookie(currentToken);

                return NextResponse.json({
                    success: true,
                    message: 'Token expiry extended',
                });
            }

            throw error;
        }

    } catch (error: any) {
        console.error('Admin token refresh error:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthenticated'
                },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Token refresh failed',
            },
            { status: error.response?.status || 500 }
        );
    }
}
