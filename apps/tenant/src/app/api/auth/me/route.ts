import { NextResponse } from 'next/server';
import { customerAuthAxios, getSubdomainFromRequest } from '@/lib/auth/axios';

export async function GET() {
    try {
        // Get subdomain from request
        const subdomain = await getSubdomainFromRequest();

        if (!subdomain) {
            return NextResponse.json(
                { message: 'Unable to determine tenant context' },
                { status: 400 }
            );
        }

        // Call Laravel backend - get customer profile
        const response = await customerAuthAxios.get(
            `/tenant/${subdomain}/auth/me`
        );

        return NextResponse.json({
            success: true,
            customer: response.data.data,
        });

    } catch (error: any) {
        console.error('Customer profile fetch error:', error.response?.data || error.message);

        // Handle unauthorized
        if (error.response?.status === 401) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to fetch profile' },
            { status: error.response?.status || 500 }
        );
    }
}
