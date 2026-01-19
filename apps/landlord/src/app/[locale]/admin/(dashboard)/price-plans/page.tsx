
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getTranslations, getLocale } from "next-intl/server";
import { Edit } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import { revalidatePath } from "next/cache";
import { DeletePricePlanButton } from "@/components/admin/price-plans/DeletePricePlanButton";
import { ToggleStatusButton } from "@/components/admin/price-plans/ToggleStatusButton";

interface PricePlan {
    id: number;
    title: string;
    subtitle: string | null;
    price: number;
    type: string;
    status: string;
    has_trial: boolean;
    has_price: boolean;
    features: string[];
    created_at: string;
    updated_at: string;
}

interface PricePlansResponse {
    success: boolean;
    message: string;
    data: PricePlan[];
}

export default async function AllPricePlansPage() {
    const t = await getTranslations("Admin.PricePlanManage.AllPlans");
    const tMenu = await getTranslations("Admin.PricePlanManage.menu");
    const locale = await getLocale();

    // -- Inline Server Actions --

    async function deletePricePlan(id: number) {
        'use server';
        const token = await getAdminAuthCookie();
        if (!token) return { success: false, message: 'Not authenticated' };

        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/price-plans/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            revalidatePath(`/${locale}/admin/price-plans`);
            return { success: true, message: response.data.message };
        } catch (error: any) {
            console.error('Failed to delete plan:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to delete plan'
            };
        }
    }

    async function togglePricePlanStatus(id: number) {
        'use server';
        const token = await getAdminAuthCookie();
        if (!token) return { success: false, message: 'Not authenticated' };

        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/price-plans/${id}/toggle-status`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            revalidatePath(`/${locale}/admin/price-plans`);
            return { success: true, message: response.data.message };
        } catch (error: any) {
            console.error('Failed to toggle status:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to toggle status'
            };
        }
    }


    // -- Data Fetching --
    const token = await getAdminAuthCookie();
    let plans: PricePlan[] = [];

    if (token) {
        try {
            const response = await axios.get<PricePlansResponse>(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/price-plans`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept-Language': locale,
                    }
                }
            );
            if (response.data.success) {
                plans = response.data.data;
            }
        } catch (error) {
            console.error("Failed to fetch price plans", error);
        }
    }


    const getTypeBadgeColor = (type: string) => {
        switch (type) {
            case "Lifetime": return "bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300";
            case "Yearly": return "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-300";
            case "Monthly": return "bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-300";
            default: return "bg-muted text-muted-foreground";
        }
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_plans"), href: "/admin/price-plans" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show</span>
                        <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
                        <span>entries</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Search:</span>
                            <Input className="h-9 w-[200px]" placeholder="" />
                        </div>
                        <Link href={`/${locale}/admin/price-plans/new`}>
                            <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                                {t("create_plan")}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="font-semibold text-foreground">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.title")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.price")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.type")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.created")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {plans.length > 0 ? (
                                plans.map((plan) => (
                                    <TableRow key={plan.id} className="hover:bg-muted/20 border-b-border/40">
                                        <TableCell className="font-medium">{plan.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span>{plan.title}</span>
                                                {plan.has_trial && (
                                                    <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400">
                                                        Trial
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{plan.has_price ? `$ ${plan.price?.toLocaleString()}` : 'Free'}</TableCell>
                                        <TableCell>
                                            <Badge className={getTypeBadgeColor(plan.type)}>
                                                {plan.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <ToggleStatusButton
                                                id={plan.id}
                                                status={plan.status}
                                                toggleAction={togglePricePlanStatus}
                                            />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground whitespace-nowrap">
                                            {new Date(plan.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1.5">
                                                <DeletePricePlanButton id={plan.id} deleteAction={deletePricePlan} />
                                                <Link href={`/${locale}/admin/price-plans/${plan.id}/edit`}>
                                                    <Button size="sm" className="h-7 px-2 bg-primary hover:bg-primary/80 text-white dark:text-black">
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                        No price plans found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing {plans.length} entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
