"use client";

import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";

export default function WidgetSettingsPage() {
    const t = useTranslations("Admin.DemoData.widget_settings");

    // Mock data
    const widgets = [
        { id: 1, title: "About Us Widget" },
        { id: 2, title: "Navigation Menu Widget" },
        { id: 3, title: "Custom Link Widget" },
        { id: 4, title: "Contact Info Widget" },
        { id: 5, title: "Blog Category Widget" },
        { id: 6, title: "Popular Blog Widget" },
        { id: 7, title: "Service Category Widget" },
        { id: 8, title: "Popular Service Widget" },
        { id: 9, title: "Query Submit Widget" },
        { id: 10, title: "Donation Category Widget" },
    ];

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/demo-data/widget-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Show</span>
                        <Input className="w-16 h-8" defaultValue={10} type="number" />
                        <span className="text-sm text-muted-foreground">entries</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{t("search_placeholder")}:</span>
                        <Input className="w-64 h-8" />
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">{t("table_action")}</TableHead>
                                <TableHead className="text-right w-full">{t("table_title")}</TableHead>
                                <TableHead className="text-right">{t("table_id")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {widgets.map((widget) => (
                                <TableRow key={widget.id}>
                                    <TableCell className="text-right">
                                        <Button size="icon" variant="secondary" className="h-8 w-8">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right">{widget.title}</TableCell>
                                    <TableCell className="text-right">{widget.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        Showing 1 to 10 of 21 entries
                    </div>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button variant="default" size="sm">1</Button>
                        <Button variant="outline" size="sm">2</Button>
                        <Button variant="outline" size="sm">3</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}