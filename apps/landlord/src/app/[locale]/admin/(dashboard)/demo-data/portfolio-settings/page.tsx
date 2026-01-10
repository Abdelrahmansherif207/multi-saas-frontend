"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";

export default function PortfolioSettingsPage() {
    const t = useTranslations("Admin.DemoData.portfolio_settings");

    // Mock data for demonstration
    const demoData = [
        { id: 1, title: "All Portfolio Category" },
        { id: 2, title: "All Portfolios" },
    ];

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("title"), href: "/admin/demo-data/portfolio-settings" },
            ]}
        >
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Input
                        placeholder={t("search_placeholder")}
                        className="max-w-sm"
                    />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show</span>
                        <Input
                            type="number"
                            defaultValue={10}
                            className="w-16 h-8"
                        />
                        <span>entries</span>
                    </div>
                </div>

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-right">{t("table_id")}</TableHead>
                                <TableHead className="text-right">{t("table_title")}</TableHead>
                                <TableHead className="w-[100px] text-right">{t("table_action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {demoData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium text-right">{item.id}</TableCell>
                                    <TableCell className="text-right">{item.title}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        Showing 1 to {demoData.length} of {demoData.length} entries
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>
                            Previous
                        </Button>
                        <Button variant="default" size="sm">
                            1
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
