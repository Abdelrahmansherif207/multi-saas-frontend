"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function NewPluginPage() {
    const t = useTranslations("Admin");

    return (
        <AdminPageWrapper
            title={t("Plugins.NewPlugin.title")}
            breadcrumbs={[
                { label: t("Plugins.breadcrumbs.admin"), href: "/admin" },
                { label: t("Plugins.breadcrumbs.plugins"), href: "/admin/plugins" },
                { label: t("Plugins.NewPlugin.title"), href: "/admin/plugins/new-plugins" },
            ]}
        >
            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-right">
                            {t("Plugins.NewPlugin.title")}
                        </h2>
                        <p className="text-sm text-muted-foreground text-right">
                            {t("Plugins.NewPlugin.description")}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <div className="w-full max-w-md flex items-center gap-4 justify-end">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                                No file chosen
                            </span>
                            <div className="relative">
                                <Input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".zip"
                                />
                                <Button variant="outline" className="pointer-events-none">
                                    {t("Plugins.NewPlugin.file_label")}
                                </Button>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {t("Plugins.NewPlugin.file_help")}
                        </p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button className="bg-primary hover:bg-primary/80  px-8">
                            {t("Plugins.NewPlugin.submit")}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AdminPageWrapper>
    );
}