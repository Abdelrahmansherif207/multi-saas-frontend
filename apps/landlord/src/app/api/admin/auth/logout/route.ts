import { NextRequest, NextResponse } from 'next/server';
import { adminAuthAxios } from '@/lib/auth/admin-axios';
import { deleteAdminAuthCookies, getAdminAuthCookie } from '@/lib/auth/admin-cookies';

export async function POST(request: NextRequest) {
    try {
        const token = await getAdminAuthCookie();

        if (!token) {
            // Already logged out
            return NextResponse.json({
                success: true,
                message: 'Already logged out',
            });
        }

        // Call Laravel backend admin logout endpoint
        try {
            await adminAuthAxios.post('/admin/auth/logout');
        } catch (error) {
            // Even if backend logout fails, we still clear cookies
            console.error('Backend admin logout error:', error);
        }

        // Clear all admin auth cookies
        await deleteAdminAuthCookies();

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully',
            data: null,
        });

    } catch (error: any) {
        console.error('Admin logout error:', error);

        // Always clear cookies even on error
        await deleteAdminAuthCookies();

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully',
            data: null,
        });
    }
}
