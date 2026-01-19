import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getAdminAuthCookie } from '@/lib/auth/admin-cookies';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const token = await getAdminAuthCookie();

    if (!token) {
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string }; status?: number } };
        return NextResponse.json(
            { success: false, message: err.response?.data?.message || 'Failed to update user' },
            { status: err.response?.status || 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log(`[API] DELETE request received for user ID: ${id}`);

    const token = await getAdminAuthCookie();

    if (!token) {
        console.log('[API] No admin token found');
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`;
    console.log(`[API] Forwarding to backend: ${backendUrl}`);

    try {
        const response = await axios.delete(
            backendUrl,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log(`[API] Backend response status: ${response.status}`);
        console.log(`[API] Backend response data:`, response.data);

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const err = error as { response?: { data?: any; status?: number }; message?: string };
        console.error('[API] Backend request failed:', err.message);
        if (err.response) {
            console.error('[API] Error response data:', err.response.data);
            console.error('[API] Error response status:', err.response.status);
        }

        return NextResponse.json(
            { success: false, message: err.response?.data?.message || 'Failed to deactivate user' },
            { status: err.response?.status || 500 }
        );
    }
}
