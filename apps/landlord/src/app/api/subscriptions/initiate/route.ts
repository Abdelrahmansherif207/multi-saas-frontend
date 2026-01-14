import { NextRequest, NextResponse } from 'next/server';
import { authAxios } from '@/lib/auth/axios';
import type { InitiateSubscriptionRequest, InitiateSubscriptionResponse } from '@/types/subscription';

export async function POST(request: NextRequest) {
    try {
        const body: InitiateSubscriptionRequest = await request.json();

        // Validate required fields
        if (!body.plan_id || !body.subdomain || !body.payment_gateway) {
            return NextResponse.json(
                { message: 'plan_id, subdomain, and payment_gateway are required' },
                { status: 400 }
            );
        }

        // Validate subdomain format
        const subdomainRegex = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
        if (!subdomainRegex.test(body.subdomain)) {
            return NextResponse.json(
                { message: 'Invalid subdomain format. Use lowercase letters, numbers, and hyphens only.' },
                { status: 400 }
            );
        }

        // Call Laravel backend - initiate subscription
        const response = await authAxios.post<InitiateSubscriptionResponse>(
            '/subscriptions/initiate',
            {
                plan_id: body.plan_id,
                subdomain: body.subdomain,
                theme: body.theme || 'default',
                payment_gateway: body.payment_gateway,
                is_trial: body.is_trial || false,
                coupon_code: body.coupon_code,
            }
        );

        // Return the payment_log and checkout_url (if redirect-based payment)
        return NextResponse.json({
            success: true,
            data: response.data.data,
            message: 'Subscription initiated successfully',
        });

    } catch (error: any) {
        console.error('Subscription initiation error:', error.response?.data || error.message);

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

        // Handle subdomain already taken
        if (error.response?.status === 409) {
            return NextResponse.json(
                { message: 'This subdomain is already taken. Please choose another.' },
                { status: 409 }
            );
        }

        // Handle authorization errors
        if (error.response?.status === 401) {
            return NextResponse.json(
                { message: 'Please login to create a subscription' },
                { status: 401 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to initiate subscription' },
            { status: error.response?.status || 500 }
        );
    }
}
