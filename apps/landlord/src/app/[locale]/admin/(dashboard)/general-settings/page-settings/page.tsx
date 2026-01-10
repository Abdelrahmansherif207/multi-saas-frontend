"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function PageSettings() {
    const t = useTranslations("Admin.GeneralSettings.page_settings");

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
                <div className="text-sm text-muted-foreground">
                    <Link href="/admin/general-settings" className="hover:text-primary transition-colors">
                        / {t("title")}
                    </Link>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="space-y-8 max-w-4xl">
                    {/* Home Page Settings */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold text-foreground/90">
                                {t("title")}
                            </h2>
                            <label className="text-sm font-medium text-muted-foreground">
                                {t("home_page_display")}
                            </label>
                        </div>
                        <div className="space-y-2">
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                placeholder={t("home_page_display")}
                            />
                            <p className="text-xs text-blue-500 font-medium">
                                {t("home_page_help")}
                            </p>
                        </div>
                    </div>

                    {/* Price Plan Settings */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-muted-foreground">
                            {t("price_plan_page_display")}
                        </label>
                        <div className="space-y-2">
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                placeholder={t("price_plan_page_display")}
                            />
                            <p className="text-xs text-blue-500 font-medium">
                                {t("price_plan_help")}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        {/* <button className="px-6 py-2.5 bg-[#2B6CB0] hover:bg-[#2c5282] text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                        </button> */}
                        <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                            {t("update_changes")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}