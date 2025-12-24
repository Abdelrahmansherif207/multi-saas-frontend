"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function GeneralSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.settings"), href: "/admin/general-settings" },
            ]}
        >
            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                <CardContent className="p-6 space-y-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-right">
                            {t("title")}
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {/* Home Page Display */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-end">
                                {t("home_page_label")}
                            </label>
                            <Input
                                className="text-right"
                                placeholder={t("home_page_placeholder")}
                            />
                            <p className="text-[0.8rem] text-muted-foreground text-right text-blue-500">
                                {t("home_page_help")}
                            </p>
                        </div>

                        {/* Price Plan Page Display */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-end">
                                {t("price_plan_label")}
                            </label>
                            <Input
                                className="text-right"
                                placeholder={t("price_plan_placeholder")}
                            />
                            <p className="text-[0.8rem] text-muted-foreground text-right text-blue-500">
                                {t("price_plan_help")}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        {/* <Button className="bg-[#1e40af] hover:bg-[#1e40af]/90 text-white px-8">
                        </Button> */}
                        <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                            {t("submit")}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AdminPageWrapper>
    );
}