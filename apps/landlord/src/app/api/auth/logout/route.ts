import { NextRequest, NextResponse } from 'next/server';
import { authAxios } from '@/lib/auth/axios';
import { deleteAuthCookies, getAuthCookie } from '@/lib/auth/cookies';

export async function POST(request: NextRequest) {
    try {
        const token = await getAuthCookie();

        if (!token) {
            // Already logged out
            return NextResponse.json({
                success: true,
                message: 'Already logged out',
            });
        }

        // Call Laravel backend logout endpoint
        try {
            await authAxios.post('/auth/logout');
        } catch (error) {
            // Even if backend logout fails, we still clear cookies
            console.error('Backend logout error:', error);
        }

        // Clear all auth cookies
        await deleteAuthCookies();

        return NextResponse.json({
            success: true,
            message: 'Logout successful',
        });

    } catch (error: any) {
        console.error('Logout error:', error);

        // Always clear cookies even on error
        await deleteAuthCookies();

        return NextResponse.json(
            {
                success: true,
                message: 'Logout completed',
            }
        );
    }
}
