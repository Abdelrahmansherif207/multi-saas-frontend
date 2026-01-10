"use client";

import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

export default function SitemapSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.sitemap_settings");

    const handleGenerate = () => {
        console.log("Generating sitemap...");
    };

    const handleDownload = (filename: string) => {
        console.log(`Downloading ${filename}...`);
    };

    const handleDelete = (filename: string) => {
        console.log(`Deleting ${filename}...`);
    };

    // Mock data
    const sitemaps = [
        { name: "sitemap.xml", date: "July 2023 - 02:37:39 PM", size: "KB 8.01" },
    ];

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/sitemap-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8 space-y-6">
                <div className="flex justify-end">
                    <Button
                        onClick={handleGenerate}
                        className="bg-[#2B6CB0] hover:bg-[#2B6CB0]/90 text-white font-medium"
                    >
                        {t("generate_now")}
                    </Button>
                </div>

                <div className="text-right text-red-500 text-sm">
                    {t("warning_message")}
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-4 font-medium">{t("table_action")}</th>
                                <th className="p-4 font-medium">{t("table_size")}</th>
                                <th className="p-4 font-medium">{t("table_date")}</th>
                                <th className="p-4 font-medium">{t("table_name")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sitemaps.map((sitemap, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-4 flex justify-end gap-2">
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleDelete(sitemap.name)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-8 w-8 bg-[#2B6CB0] text-white hover:bg-[#2B6CB0]/90"
                                            onClick={() => handleDownload(sitemap.name)}
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </td>
                                    <td className="p-4">{sitemap.size}</td>
                                    <td className="p-4">{sitemap.date}</td>
                                    <td className="p-4">{sitemap.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
