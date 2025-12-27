"use client";

import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";

export default function CacheSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.cache_settings");

    const handleClearCache = (type: string) => {
        console.log(`Clearing ${type} cache...`);
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/cache-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-right">{t("subtitle")}</h3>
                        <div className="flex flex-col items-end space-y-3">
                            <Button
                                onClick={() => handleClearCache("view")}
                                className="bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium w-full sm:w-auto"
                            >
                                {t("clear_view_cache")}
                            </Button>
                            <Button
                                onClick={() => handleClearCache("route")}
                                className="bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium w-full sm:w-auto"
                            >
                                {t("clear_route_cache")}
                            </Button>
                            <Button
                                onClick={() => handleClearCache("config")}
                                className="bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium w-full sm:w-auto"
                            >
                                {t("clear_config_cache")}
                            </Button>
                            <Button
                                onClick={() => handleClearCache("event")}
                                className="bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium w-full sm:w-auto"
                            >
                                {t("clear_event_cache")}
                            </Button>
                            <Button
                                onClick={() => handleClearCache("all")}
                                className="bg-[#10B981] hover:bg-[#10B981]/90 text-white font-medium w-full sm:w-auto"
                            >
                                {t("clear_all_cache")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
