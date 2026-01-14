import { NextRequest, NextResponse } from 'next/server';
import { authAxios } from '@/lib/auth/axios';
import type { CompleteSubscriptionRequest, CompleteSubscriptionResponse } from '@/types/subscription';

export async function POST(request: NextRequest) {
    try {
        const body: CompleteSubscriptionRequest = await request.json();

        // Validate required fields
        if (!body.payment_log_id || !body.transaction_id || !body.payment_gateway) {
            return NextResponse.json(
                { message: 'payment_log_id, transaction_id, and payment_gateway are required' },
                { status: 400 }
            );
        }

        // Call Laravel backend - complete subscription
        const response = await authAxios.post<CompleteSubscriptionResponse>(
            '/subscriptions/complete',
            {
                payment_log_id: body.payment_log_id,
                transaction_id: body.transaction_id,
                payment_gateway: body.payment_gateway,
            }
        );

        // Return tenant URL and subscription data
        return NextResponse.json({
            success: true,
            data: response.data.data,
            message: 'Subscription completed successfully. Your tenant is being created!',
        });

    } catch (error: any) {
        console.error('Subscription completion error:', error.response?.data || error.message);

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

        // Handle payment verification failed
        if (error.response?.status === 402) {
            return NextResponse.json(
                { message: 'Payment verification failed. Please try again.' },
                { status: 402 }
            );
        }

        // Handle authorization errors
        if (error.response?.status === 401) {
            return NextResponse.json(
                { message: 'Session expired. Please login again.' },
                { status: 401 }
            );
        }

        // Handle not found (invalid payment_log_id)
        if (error.response?.status === 404) {
            return NextResponse.json(
                { message: 'Invalid payment reference. Please try again.' },
                { status: 404 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to complete subscription' },
            { status: error.response?.status || 500 }
        );
    }
}
