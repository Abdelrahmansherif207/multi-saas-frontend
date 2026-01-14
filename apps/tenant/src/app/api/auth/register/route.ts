import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { setCustomerAuthCookie } from '@/lib/auth/cookies';
import { getSubdomainFromRequest } from '@/lib/auth/axios';
import type { CustomerRegisterRequest, CustomerAuthResponse } from '@/types/customer-auth';

export async function POST(request: NextRequest) {
    try {
        const body: CustomerRegisterRequest = await request.json();

        // Get subdomain from request
        const subdomain = await getSubdomainFromRequest();

        if (!subdomain) {
            return NextResponse.json(
                { message: 'Unable to determine tenant context' },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!body.email || !body.password || !body.name || !body.password_confirmation) {
            return NextResponse.json(
                { message: 'Name, email, password, and password confirmation are required' },
                { status: 400 }
            );
        }

        // Call Laravel backend - tenant customer registration
        const response = await axios.post<CustomerAuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/tenant/${subdomain}/auth/register`,
            body,
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
            message: 'Registration successful',
        });

    } catch (error: any) {
        console.error('Customer registration error:', error.response?.data || error.message);

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

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Registration failed' },
            { status: error.response?.status || 500 }
        );
    }
}
