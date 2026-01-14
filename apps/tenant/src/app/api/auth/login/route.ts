import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { setCustomerAuthCookie } from '@/lib/auth/cookies';
import { getSubdomainFromRequest } from '@/lib/auth/axios';
import type { CustomerLoginRequest, CustomerAuthResponse } from '@/types/customer-auth';

export async function POST(request: NextRequest) {
    try {
        const body: CustomerLoginRequest = await request.json();

        // Get subdomain from request
        const subdomain = await getSubdomainFromRequest();

        if (!subdomain) {
            return NextResponse.json(
                { message: 'Unable to determine tenant context' },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!body.credential || !body.password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Call Laravel backend - tenant customer login
        const response = await axios.post<CustomerAuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/tenant/${subdomain}/auth/login`,
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

        const { token, customer } = response.data.data;

        // Store token in HttpOnly cookie
        await setCustomerAuthCookie(token);

        // Return success WITHOUT token
        return NextResponse.json({
            success: true,
            customer,
            message: 'Login successful',
        });

    } catch (error: any) {
        console.error('Customer login error:', error.response?.data || error.message);

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
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Login failed' },
            { status: error.response?.status || 500 }
        );
    }
}
