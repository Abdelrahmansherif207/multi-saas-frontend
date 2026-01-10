import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { setAdminAuthCookie } from '@/lib/auth/admin-cookies';
import type { AdminAuthResponse } from '@/types/admin-auth';

interface AdminRegisterRequest {
    name: string;
    username: string;
    email: string;
    mobile?: string;
    address?: string;
    country?: string;
    password: string;
    password_confirmation: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: AdminRegisterRequest = await request.json();

        // Validate required fields
        const errors: Record<string, string[]> = {};

        if (!body.name) {
            errors.name = ['The name field is required.'];
        }
        if (!body.username) {
            errors.username = ['The username field is required.'];
        }
        if (!body.email) {
            errors.email = ['The email field is required.'];
        }
        if (!body.password) {
            errors.password = ['The password field is required.'];
        }
        if (!body.password_confirmation) {
            errors.password_confirmation = ['The password confirmation field is required.'];
        }
        if (body.password && body.password_confirmation && body.password !== body.password_confirmation) {
            errors.password = ['The password confirmation does not match.'];
        }

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                {
                    message: 'Validation failed',
                    errors,
                },
                { status: 422 }
            );
        }

        // Call Laravel backend admin registration endpoint
        const response = await axios.post<AdminAuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/register`,
            {
                name: body.name,
                username: body.username,
                email: body.email,
                mobile: body.mobile,
                address: body.address,
                country: body.country,
                password: body.password,
                password_confirmation: body.password_confirmation,
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
            message: 'Registration successful',
        });

    } catch (error: any) {
        console.error('Admin registration error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });

        // Handle validation errors (including duplicate email/username)
        if (error.response?.status === 422) {
            return NextResponse.json(
                {
                    message: 'Validation failed',
                    errors: error.response.data.errors,
                },
                { status: 422 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
            },
            { status: error.response?.status || 500 }
        );
    }
}
