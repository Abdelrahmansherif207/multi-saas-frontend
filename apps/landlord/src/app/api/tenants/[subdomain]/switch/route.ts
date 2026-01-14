import { NextRequest, NextResponse } from 'next/server';
import { authAxios } from '@/lib/auth/axios';
import { setTenantAuthCookie } from '@/lib/auth/tenant-cookies';
import type { TenantSwitchResponse } from '@/types/tenant';

export async function POST(
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

        // Call Laravel backend - switch tenant context
        const response = await authAxios.post<TenantSwitchResponse>(
            `/tenants/${subdomain}/switch`
        );

        const { token, tenant } = response.data.data;

        // Store tenant-scoped token in separate cookie
        await setTenantAuthCookie(token, subdomain);

        // Return tenant data and token for the frontend to handle redirection
        return NextResponse.json({
            success: true,
            data: {
                tenant,
                token
            },
            message: `Switched to tenant: ${tenant.name || subdomain}`,
        });

    } catch (error: any) {
        console.error('Tenant switch error:', error.response?.data || error.message);

        // Handle not found
        if (error.response?.status === 404) {
            return NextResponse.json(
                { message: 'Tenant not found or you do not have access' },
                { status: 404 }
            );
        }

        // Handle authorization errors
        if (error.response?.status === 401) {
            return NextResponse.json(
                { message: 'Please login to switch tenant context' },
                { status: 401 }
            );
        }

        // Handle forbidden (not owner)
        if (error.response?.status === 403) {
            return NextResponse.json(
                { message: 'You do not have permission to access this tenant' },
                { status: 403 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to switch tenant' },
            { status: error.response?.status || 500 }
        );
    }
}
