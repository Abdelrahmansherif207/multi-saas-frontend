import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { setAdminAuthCookie } from '@/lib/auth/admin-cookies';
import type { AdminLoginRequest, AdminAuthResponse } from '@/types/admin-auth';

export async function POST(request: NextRequest) {
    try {
        const body: AdminLoginRequest = await request.json();

        // Validate required fields
        if (!body.credential || !body.password) {
            return NextResponse.json(
                {
                    message: 'The credential field is required.',
                    errors: {
                        credential: ['The credential field is required.']
                    }
                },
                { status: 422 }
            );
        }

        // Call Laravel backend admin login endpoint
        const response = await axios.post<AdminAuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/login`,
            {
                credential: body.credential,
                password: body.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );

        const { token, admin } = response.data.data;

        // Store token in HttpOnly cookie (NEVER send to client)
        await setAdminAuthCookie(token);

        // Return success WITHOUT token
        return NextResponse.json({
            success: true,
            admin,
            message: 'Login successful',
        });

    } catch (error: any) {
        console.error('Admin login error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });

        // Handle validation errors
        if (error.response?.status === 422) {
            return NextResponse.json(
                {
                    message: 'Validation failed',
                    errors: error.response.data.errors,
                },
                { status: 422 }
            );
        }

        // Handle authentication errors
        if (error.response?.status === 401) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid credentials',
                },
                { status: 401 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            },
            { status: error.response?.status || 500 }
        );
    }
}
