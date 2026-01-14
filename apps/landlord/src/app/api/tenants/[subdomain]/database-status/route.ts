import { NextRequest, NextResponse } from 'next/server';
import { authAxios } from '@/lib/auth/axios';
import type { DatabaseStatusResponse } from '@/types/tenant';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ subdomain: string }> }
) {
    try {
        const { subdomain } = await params;

        if (!subdomain) {
            return NextResponse.json(
                { message: 'Subdomain is required' },
                { status: 400 }
            );
        }

        // Call Laravel backend - check database status
        const response = await authAxios.get<DatabaseStatusResponse>(
            `/tenants/${subdomain}/database-status`
        );

        return NextResponse.json({
            success: true,
            data: response.data.data,
        });

    } catch (error: any) {
        console.error('Database status check error:', error.response?.data || error.message);

        // Handle not found
        if (error.response?.status === 404) {
            return NextResponse.json(
                { message: 'Tenant not found' },
                { status: 404 }
            );
        }

        // Handle authorization errors
        if (error.response?.status === 401) {
            return NextResponse.json(
                { message: 'Please login to check database status' },
                { status: 401 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to check database status' },
            { status: error.response?.status || 500 }
        );
    }
}
