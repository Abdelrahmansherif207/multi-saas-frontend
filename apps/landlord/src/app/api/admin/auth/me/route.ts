import { NextRequest, NextResponse } from 'next/server';
import { adminAuthAxios } from '@/lib/auth/admin-axios';
import { getAdminAuthCookie } from '@/lib/auth/admin-cookies';
import type { Admin } from '@/types/admin-auth';

/**
 * Get current authenticated admin
 */
export async function GET(request: NextRequest) {
    try {
        const token = await getAdminAuthCookie();

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Unauthenticated'
                },
                { status: 401 }
            );
        }

        // Fetch admin from Laravel backend
        const response = await adminAuthAxios.get<{ success: boolean; message: string; data: Admin }>('/admin/auth/me');

        return NextResponse.json({
            success: true,
            message: 'Admin profile retrieved',
            data: response.data.data,
        });

    } catch (error: any) {
        console.error('Get admin error:', error.response?.data || error.message);

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
                message: error.response?.data?.message || 'Failed to fetch admin profile',
            },
            { status: error.response?.status || 500 }
        );
    }
}
