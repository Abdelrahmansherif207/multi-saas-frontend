"use client";

import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";

export default function SoftwareUpdateSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.software_update_settings");

    const handleCheckUpdate = () => {
        console.log("Checking for updates...");
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/software-update-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <div className="flex flex-col items-end space-y-4">
                    <h3 className="text-base font-semibold">{t("check_update")}</h3>
                    <Button
                        onClick={handleCheckUpdate}
                        className="bg-[#2B6CB0] hover:bg-[#2B6CB0]/90 text-white font-medium w-full sm:w-auto"
                    >
                        {t("check_button")}
                    </Button>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
