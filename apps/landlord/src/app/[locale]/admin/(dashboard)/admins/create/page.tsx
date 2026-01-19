import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import CreateAdminForm from "./CreateAdminForm";
import axios from "axios";

export default async function CreateAdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    async function createAdmin(data: any): Promise<{ success: boolean; message: string }> {
        'use server';

        const token = await getAdminAuthCookie();

        if (!token) {
            return { success: false, message: 'Not authenticated' };
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/admins`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return {
                success: response.data.success,
                message: response.data.message
            };
        } catch (error: any) {
            console.error('Failed to create admin:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create admin'
            };
        }
    }

    return <CreateAdminForm locale={locale} submitAction={createAdmin} />;
}
