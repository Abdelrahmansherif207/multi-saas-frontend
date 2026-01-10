import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { setAuthCookie } from '@/lib/auth/cookies';
import type { LoginRequest, AuthResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
    try {
        const body: LoginRequest = await request.json();

        // Validate required fields
        if (!body.email || !body.password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Call Laravel backend login endpoint
        const response = await axios.post<AuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
                credential: body.email,
                password: body.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );

        const { token, expires_at, requires_2fa, two_factor_token, user } = response.data.data;

        // Handle 2FA flow
        if (requires_2fa && two_factor_token) {
            // Don't store token yet, return 2FA token for next step
            return NextResponse.json({
                requires_2fa: true,
                two_factor_token,
                message: 'Two-factor authentication required',
            });
        }

        // Store token in HttpOnly cookie (NEVER send to client)
        await setAuthCookie(token);

        // Return success WITHOUT token
        return NextResponse.json({
            success: true,
            user,
            message: 'Login successful',
        });

    } catch (error: any) {
        console.error('Login error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
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
                    message: 'Invalid credentials',
                },
                { status: 401 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            {
                message: error.response?.data?.message || 'Login failed',
            },
            { status: error.response?.status || 500 }
        );
    }
}
