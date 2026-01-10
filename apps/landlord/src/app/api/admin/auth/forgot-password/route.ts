import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import type { AdminForgotPasswordRequest } from '@/types/admin-auth';

export async function POST(request: NextRequest) {
    try {
        const body: AdminForgotPasswordRequest = await request.json();

        // Validate required fields
        if (!body.email) {
            return NextResponse.json(
                {
                    message: 'The email field is required.',
                    errors: {
                        email: ['The email field is required.']
                    }
                },
                { status: 422 }
            );
        }

        // Call Laravel backend forgot password endpoint
        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/forgot-password`,
            { email: body.email },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );

        // Always return generic success message for security
        return NextResponse.json({
            success: true,
            message: 'If an account exists with this email, you will receive a password reset link.',
            data: null,
        });

    } catch (error: any) {
        console.error('Admin forgot password error:', error.response?.data || error.message);

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

        // For security, always return generic success message
        // Don't reveal if email exists or not
        return NextResponse.json({
            success: true,
            message: 'If an account exists with this email, you will receive a password reset link.',
            data: null,
        });
    }
}
