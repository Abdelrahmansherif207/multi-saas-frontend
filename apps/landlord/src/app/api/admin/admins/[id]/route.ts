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
            `${process.env.NEXT_PUBLIC_API_URL}/admin/admins/${id}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Failed to update admin:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.response?.data?.message || 'Failed to update admin'
            },
            { status: error.response?.status || 500 }
        );
    }
}

export async function DELETE(
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
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/admins/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Failed to delete admin:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.response?.data?.message || 'Failed to delete admin'
            },
            { status: error.response?.status || 500 }
        );
    }
}
