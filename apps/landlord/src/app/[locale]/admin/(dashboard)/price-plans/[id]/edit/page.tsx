
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { getTranslations } from "next-intl/server";
import { PricePlanForm } from "@/components/admin/price-plans/PricePlanForm";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export default async function EditPricePlanPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const t = await getTranslations("Admin.PricePlanManage.NewPlan");
    const tMenu = await getTranslations("Admin.PricePlanManage.menu");

    async function updatePricePlan(data: any): Promise<{ success: boolean; message: string }> {
        'use server';

        const token = await getAdminAuthCookie();

        if (!token) {
            return { success: false, message: 'Not authenticated' };
        }

        // Transform data for API
        const typeMap: Record<string, number> = {
            'monthly': 0,
            'yearly': 1,
            'lifetime': 2
        };

        const payload: any = {
            ...data,
            type: typeMap[data.type] ?? 0,
            has_trial: !!data.has_trial,
            has_price: !!data.has_price,
            status: data.status === 'active',
            features: data.features.map((f: string) => ({
                feature_name: f,
                status: true
            })),
            faq: [{
                question: data.faq_title,
                answer: data.faq_description
            }]
        };

        // Remove unnecessary fields
        delete payload.faq_title;
        delete payload.faq_description;
        // limit is in formData but not in sample payload.

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/price-plans/${id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept-Language': locale,
                    },
                }
            );

            revalidatePath(`/${locale}/admin/price-plans`);
            return { success: true, message: response.data.message };
        } catch (error: any) {
            console.error('Failed to update price plan:', error);
            const msg = error.response?.data?.message || error.message || 'Failed to update price plan';
            return {
                success: false,
                message: msg
            };
        }
    }

    // Fetch Initial Data
    let pricePlan = null;
    const token = await getAdminAuthCookie();

    if (token) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/price-plans/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                pricePlan = response.data.data;
            }
        } catch (error) {
            console.error('Failed to fetch price plan:', error);
        }
    }

    if (!pricePlan) {
        // If 404 or failed to fetch, show not found or empty form? 
        // Better to show not found if logic dictates.
        // For now, let's assume if it fails, we show 404 page.
        notFound();
    }


    return (
        <AdminPageWrapper
            title={`Edit Price Plan`}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_plans"), href: `/admin/price-plans` },
                { label: "Edit", href: "#" }
            ]}
        >
            <div className="space-y-6">
                {/* Warning Banners - Reusing from Create Page */}
                <div className="space-y-3">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-amber-600 dark:text-amber-400 text-sm">
                        {t("warning_features")}
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-600 dark:text-blue-400 text-sm">
                        {t("warning_trial")}
                    </div>
                </div>

                <PricePlanForm
                    initialData={pricePlan}
                    submitAction={updatePricePlan}
                    locale={locale}
                />
            </div>
        </AdminPageWrapper>
    );
}
