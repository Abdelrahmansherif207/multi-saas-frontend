import { NextResponse } from 'next/server';
import axios from 'axios';
import type { PlansListResponse } from '@/types/subscription';

export async function GET() {
    try {
        // Call Laravel backend - list available plans (public endpoint)
        const response = await axios.get<PlansListResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/plans`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );

        return NextResponse.json({
            success: true,
            data: response.data.data,
        });

    } catch (error: any) {
        console.error('Plans fetch error:', error.response?.data || error.message);

        // Handle other errors
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to fetch plans' },
            { status: error.response?.status || 500 }
        );
    }
}
