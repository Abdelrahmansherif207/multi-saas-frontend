"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AddNewThemePage() {
    const t = useTranslations("Admin.ThemeManage.AddTheme");
    const tMenu = useTranslations("Admin.ThemeManage.menu");
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("add_theme"), href: "/admin/themes/new" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-amber-600 dark:text-amber-400 text-sm">
                        {t("warning_text")}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="theme-file" className="text-sm font-semibold text-foreground">
                            {t("upload_label")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Input
                                id="theme-file"
                                type="file"
                                accept=".zip"
                                onChange={handleFileChange}
                                className="max-w-md"
                            />
                        </div>
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            {t("zip_only")}
                        </p>
                    </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                    {t("submit")}
                </Button>
            </div>
        </AdminPageWrapper>
    );
}
