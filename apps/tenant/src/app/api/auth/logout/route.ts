import { NextResponse } from 'next/server';
import { deleteCustomerAuthCookies } from '@/lib/auth/cookies';
import { customerAuthAxios, getSubdomainFromRequest } from '@/lib/auth/axios';

export async function POST() {
    try {
        // Get subdomain from request
        const subdomain = await getSubdomainFromRequest();

        // Try to call backend logout (optional - invalidate token on server)
        if (subdomain) {
            try {
                await customerAuthAxios.post(`/tenant/${subdomain}/auth/logout`);
            } catch (err) {
                // Ignore backend logout errors - still clear cookies
                console.warn('Backend logout failed, clearing cookies anyway');
            }
        }

        // Delete customer auth cookies
        await deleteCustomerAuthCookies();

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });

    } catch (error: any) {
        console.error('Customer logout error:', error);

        // Still try to delete cookies even on error
        try {
            await deleteCustomerAuthCookies();
        } catch (cookieError) {
            console.error('Failed to delete cookies:', cookieError);
        }

        return NextResponse.json({
            success: true,
            message: 'Logged out',
        });
    }
}
