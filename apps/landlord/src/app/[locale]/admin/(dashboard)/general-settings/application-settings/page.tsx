"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function ApplicationSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.application_settings");

    // State for toggles
    const [liveServer, setLiveServer] = useState(false);
    const [appDebug, setAppDebug] = useState(false);

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
                    <h2 className="text-lg font-semibold text-foreground/90 text-right">
                        {t("title")}
                    </h2>

                    {/* Timezone */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex justify-end">
                            {t("timezone_label")}
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-right"
                            placeholder={t("timezone_placeholder")}
                        />
                    </div>

                    {/* App Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex justify-end">
                            {t("app_name_label")}
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-right"
                            placeholder={t("app_name_placeholder")}
                        />
                    </div>

                    {/* Live Server Toggle */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex justify-end">
                            {t("live_server_label")}
                        </label>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium min-w-[30px] text-center">
                                    {liveServer ? t("yes") : t("no")}
                                </span>
                                <Switch
                                    checked={liveServer}
                                    onCheckedChange={setLiveServer}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground text-right">
                                {t("live_server_help")}
                            </p>
                        </div>
                    </div>

                    {/* App Debug Toggle */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex justify-end">
                            {t("app_debug_label")}
                        </label>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium min-w-[30px] text-center">
                                    {appDebug ? t("yes") : t("no")}
                                </span>
                                <Switch
                                    checked={appDebug}
                                    onCheckedChange={setAppDebug}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground text-right">
                                {t("app_debug_help")}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                            {t("save_changes")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}