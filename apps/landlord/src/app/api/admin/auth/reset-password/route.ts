import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import type { AdminResetPasswordRequest } from '@/types/admin-auth';

export async function POST(request: NextRequest) {
    try {
        const body: AdminResetPasswordRequest = await request.json();

        // Validate required fields
        const errors: Record<string, string[]> = {};

        if (!body.email) {
            errors.email = ['The email field is required.'];
        }
        if (!body.token) {
            errors.token = ['The token field is required.'];
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
                    message: Object.values(errors)[0][0],
                    errors,
                },
                { status: 422 }
            );
        }

        // Call Laravel backend reset password endpoint
        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/reset-password`,
            {
                email: body.email,
                token: body.token,
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

        return NextResponse.json({
            success: true,
            message: 'Password reset successfully. Please login with your new password.',
            data: null,
        });

    } catch (error: any) {
        console.error('Admin reset password error:', error.response?.data || error.message);

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

        // Handle invalid/expired token
        if (error.response?.status === 400 || error.response?.status === 404) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid or expired reset token',
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: error.response?.data?.message || 'Password reset failed',
            },
            { status: error.response?.status || 500 }
        );
    }
}
