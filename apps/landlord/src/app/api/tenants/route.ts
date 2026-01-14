import { NextRequest, NextResponse } from 'next/server';
import { authAxios } from '@/lib/auth/axios';
import type { TenantListResponse } from '@/types/tenant';

export async function GET() {
    try {
        // Call Laravel backend - list user's tenants
        const response = await authAxios.get<TenantListResponse>('/tenants');

        return NextResponse.json({
            success: true,
            data: response.data.data,
        });

    } catch (error: any) {
        console.error('Tenant list error:', error.response?.data || error.message);

        // Handle authorization errors
        if (error.response?.status === 401) {
            return NextResponse.json(
                { message: 'Please login to view your tenants' },
                { status: 401 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to fetch tenants' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Forward request to Laravel Backend using authAxios
        // authAxios interceptor handles getting the HttpOnly cookie for server-side requests
        const response = await authAxios.post('/tenants', body);

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Create tenant proxy error:', error.response?.data || error.message);

        // Propagate validation errors or other backend errors
        return NextResponse.json(
            {
                message: error.response?.data?.message || 'Failed to create tenant',
                errors: error.response?.data?.errors
            },
            { status: error.response?.status || 500 }
        );
    }
}

