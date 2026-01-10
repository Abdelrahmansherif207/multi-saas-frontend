import { NextRequest, NextResponse } from 'next/server';
import { authAxios } from '@/lib/auth/axios';
import { getAuthCookie } from '@/lib/auth/cookies';
import type { User } from '@/types/auth';

/**
 * Get current authenticated user
 */
export async function GET(request: NextRequest) {
    try {
        const token = await getAuthCookie();

        if (!token) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Fetch user from Laravel backend
        const response = await authAxios.get<{ data: User }>('/v1/auth/me');

        return NextResponse.json({
            user: response.data.data,
        });

    } catch (error: any) {
        console.error('Get user error:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                message: error.response?.data?.message || 'Failed to fetch user',
            },
            { status: error.response?.status || 500 }
        );
    }
}
