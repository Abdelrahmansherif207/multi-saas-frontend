"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ThemesSettingsPage() {
    const t = useTranslations("Admin.ThemeManage.Settings");
    const tMenu = useTranslations("Admin.ThemeManage.menu");
    const [showOnHomePage, setShowOnHomePage] = useState(false);
    const [showOnAdminPanel, setShowOnAdminPanel] = useState(false);

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("settings"), href: "/admin/themes/settings" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="show-home" className="text-sm text-primary font-medium">
                            {t("show_on_home")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Switch
                                id="show-home"
                                checked={showOnHomePage}
                                onCheckedChange={setShowOnHomePage}
                            />
                            <span className="text-sm text-muted-foreground">
                                {showOnHomePage ? t("yes") : t("no")}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="show-admin" className="text-sm text-primary font-medium">
                            {t("show_on_admin")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Switch
                                id="show-admin"
                                checked={showOnAdminPanel}
                                onCheckedChange={setShowOnAdminPanel}
                            />
                            <span className="text-sm text-muted-foreground">
                                {showOnAdminPanel ? t("yes") : t("no")}
                            </span>
                        </div>
                    </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                    {t("update")}
                </Button>
            </div>
        </AdminPageWrapper>
    );
}
