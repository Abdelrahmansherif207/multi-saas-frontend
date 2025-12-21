"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function WalletSettingsPage() {
    const t = useTranslations("Admin.WalletManage.Settings");
    const tMenu = useTranslations("Admin.WalletManage.menu");
    const [enabled, setEnabled] = useState(true);

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("settings"), href: "/admin/wallet/settings" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-foreground/80">{t("subtitle")}</h2>

                    <div className="flex items-center gap-3">
                        <Switch
                            id="wallet-enabled"
                            checked={enabled}
                            onCheckedChange={setEnabled}
                        />
                        <Label htmlFor="wallet-enabled" className="text-sm font-medium cursor-pointer">
                            {enabled ? t("yes") : t("no")}
                        </Label>
                    </div>

                    <p className="text-sm text-muted-foreground">{t("helper_text")}</p>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                    {t("save_changes")}
                </Button>
            </div>
        </AdminPageWrapper>
    );
}
