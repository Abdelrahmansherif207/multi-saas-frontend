import { NextResponse } from 'next/server';
import axios from 'axios';
import type { ThemesListResponse } from '@/types/subscription';

export async function GET() {
    try {
        // Call Laravel backend - list available themes (public endpoint)
        const response = await axios.get<ThemesListResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/themes`,
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
        console.error('Themes fetch error:', error.response?.data || error.message);

        // Handle other errors - provide fallback themes
        if (error.response?.status === 404 || error.code === 'ECONNREFUSED') {
            // Fallback themes if endpoint not available
            return NextResponse.json({
                success: true,
                data: [
                    { id: 'default', name: 'Default Theme' },
                    { id: 'minimal', name: 'Minimal' },
                    { id: 'real-estate', name: 'Real Estate' },
                ],
            });
        }

        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to fetch themes' },
            { status: error.response?.status || 500 }
        );
    }
}
