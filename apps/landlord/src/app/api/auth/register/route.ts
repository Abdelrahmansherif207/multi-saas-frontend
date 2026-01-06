import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { setAuthCookie } from '@/lib/auth/cookies';
import type { RegisterRequest, AuthResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
    try {
        const body: RegisterRequest = await request.json();

        // Validate required fields
        if (!body.email || !body.password || !body.name) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Call Laravel backend registration endpoint
        const response = await axios.post<AuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );

        const { token, user } = response.data.data;

        // Store token in HttpOnly cookie (NEVER send to client)
        await setAuthCookie(token);

        // Return success WITHOUT token
        return NextResponse.json({
            success: true,
            user,
            message: 'Registration successful',
        });

    } catch (error: any) {
        console.error('Registration error:', error.response?.data || error.message);

        // Handle validation errors from Laravel
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
                message: error.response?.data?.message || 'Registration failed',
            },
            { status: error.response?.status || 500 }
        );
    }
}
