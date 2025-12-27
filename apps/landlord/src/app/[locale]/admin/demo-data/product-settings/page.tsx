"use client";

import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";

export default function ProductSettingsPage() {
    const t = useTranslations("Admin.DemoData.product_settings");

    // Mock data
    const products = [
        { id: 1, title: "Category" },
        { id: 2, title: "Sub-category" },
        { id: 3, title: "Child-category" },
        { id: 4, title: "Colors" },
        { id: 5, title: "Sizes" },
        { id: 6, title: "Delivery Option" },
        { id: 7, title: "Badges" },
        { id: 8, title: "Campaign" },
        { id: 9, title: "Shipping & Return Policy" },
        { id: 10, title: "All Products" },
    ];

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/demo-data/product-settings" }]}
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
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="text-right">
                                        <Button size="icon" variant="secondary" className="h-8 w-8">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right">{product.title}</TableCell>
                                    <TableCell className="text-right">{product.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        Showing 1 to 10 of 10 entries
                    </div>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="default" size="sm">1</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
