"use client";

import { useState } from "react";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Category {
    id: string;
    title: string;
    status: "published" | "draft";
}

const dummyCategories: Category[] = [
    { id: "1", title: "Programming", status: "published" },
    { id: "2", title: "Design", status: "published" },
    { id: "3", title: "Marketing", status: "draft" },
    { id: "4", title: "SaaS", status: "published" },
];

export default function BlogCategoriesPage() {
    const t = useTranslations("Admin.Blogs.Categories");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleSelectAll = () => {
        if (selectedCategories.length === dummyCategories.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(dummyCategories.map((c) => c.id));
        }
    };

    const toggleSelectCategory = (id: string) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.blogs"), href: "/admin/blogs" },
                { label: t("breadcrumbs.categories"), href: "/admin/blogs/blog-category" },
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white gap-2">
                        <Plus className="w-4 h-4" />
                        {t("add_new")}
                    </Button>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder={t("search_placeholder")} className="pl-9" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder={t("bulk_actions")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="publish">{t("actions.publish")}</SelectItem>
                                <SelectItem value="draft">{t("actions.draft")}</SelectItem>
                                <SelectItem value="delete">{t("actions.delete")}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="secondary">{t("apply")}</Button>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedCategories.length === dummyCategories.length}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-[100px] font-semibold text-foreground">
                                        {t("table.id")}
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground">
                                        {t("table.title")}
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground">
                                        {t("table.status")}
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground text-right">
                                        {t("table.actions")}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dummyCategories.map((category) => (
                                    <TableRow
                                        key={category.id}
                                        className="hover:bg-muted/20 border-b-border/40"
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedCategories.includes(category.id)}
                                                onCheckedChange={() => toggleSelectCategory(category.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium text-muted-foreground">
                                            {category.id}
                                        </TableCell>
                                        <TableCell className="font-medium">{category.title}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={category.status === "published" ? "default" : "secondary"}
                                                className={cn(
                                                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                    category.status === "published"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none"
                                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-none"
                                                )}
                                            >
                                                {t(`status.${category.status}`)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-between text-sm text-muted-foreground p-4 border-t border-border/40">
                            <div>
                                {t("pagination.showing", {
                                    from: 1,
                                    to: dummyCategories.length,
                                    total: dummyCategories.length,
                                })}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    {t("pagination.previous")}
                                </Button>
                                <Button variant="outline" size="sm" className="bg-brand-orange text-white border-brand-orange hover:bg-brand-orange/90">
                                    1
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    {t("pagination.next")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
