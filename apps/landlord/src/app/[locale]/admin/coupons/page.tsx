"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    title: z.string().min(1, "validation.required"),
    code: z.string().min(1, "validation.required"),
    discount: z.string().min(1, "validation.required"),
    type: z.string().min(1, "validation.required"),
    maxUsage: z.string().min(1, "validation.required"),
    expiryDate: z.string().min(1, "validation.required"),
    status: z.string().min(1, "validation.required"),
});

interface Coupon {
    id: string;
    title: string;
    code: string;
    discount: string;
    expiryDate: string;
    status: "active" | "inactive";
}

const dummyCoupons: Coupon[] = [
    {
        id: "1",
        title: "Summer Sale",
        code: "SUMMER20",
        discount: "20%",
        expiryDate: "2024-08-31",
        status: "active",
    },
    {
        id: "2",
        title: "Welcome Bonus",
        code: "WELCOME10",
        discount: "$10",
        expiryDate: "2024-12-31",
        status: "active",
    },
];

export default function CouponsPage() {
    const t = useTranslations("Admin.Coupons");
    const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            code: "",
            discount: "",
            type: "percentage",
            maxUsage: "",
            expiryDate: "",
            status: "active",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setIsModalOpen(false);
        form.reset();
    }

    const toggleSelectAll = () => {
        if (selectedCoupons.length === dummyCoupons.length) {
            setSelectedCoupons([]);
        } else {
            setSelectedCoupons(dummyCoupons.map((c) => c.id));
        }
    };

    const toggleSelectCoupon = (id: string) => {
        setSelectedCoupons((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.coupons"), href: "/admin/coupons" },
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white gap-2">
                                <Plus className="w-4 h-4" />
                                {t("add_new")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                                    <Ticket className="w-5 h-5 text-brand-orange" />
                                    {t("add_new")}
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel>{t("form.title")}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t("form.title_placeholder")} {...field} />
                                                    </FormControl>
                                                    <FormMessage>
                                                        {form.formState.errors.title?.message && t(form.formState.errors.title.message)}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="code"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.code")}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t("form.code_placeholder")} {...field} />
                                                    </FormControl>
                                                    <FormMessage>
                                                        {form.formState.errors.code?.message && t(form.formState.errors.code.message)}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="discount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.discount")}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t("form.discount_placeholder")} {...field} />
                                                    </FormControl>
                                                    <FormMessage>
                                                        {form.formState.errors.discount?.message && t(form.formState.errors.discount.message)}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.type")}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={t("form.type_placeholder")} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="percentage">{t("form.types.percentage")}</SelectItem>
                                                            <SelectItem value="fixed">{t("form.types.fixed")}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage>
                                                        {form.formState.errors.type?.message && t(form.formState.errors.type.message)}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="maxUsage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.max_usage")}</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder={t("form.max_usage_placeholder")} {...field} />
                                                    </FormControl>
                                                    <FormMessage>
                                                        {form.formState.errors.maxUsage?.message && t(form.formState.errors.maxUsage.message)}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="expiryDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.expiry_date")}</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage>
                                                        {form.formState.errors.expiryDate?.message && t(form.formState.errors.expiryDate.message)}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("form.status")}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={t("form.status_placeholder")} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="active">{t("form.statuses.active")}</SelectItem>
                                                            <SelectItem value="inactive">{t("form.statuses.inactive")}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage>
                                                        {form.formState.errors.status?.message && t(form.formState.errors.status.message)}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                            {t("form.cancel")}
                                        </Button>
                                        <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                                            {t("form.save")}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>

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
                                <SelectItem value="delete">{t("actions.delete")}</SelectItem>
                                <SelectItem value="active">{t("actions.active")}</SelectItem>
                                <SelectItem value="inactive">{t("actions.inactive")}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="secondary">{t("apply")}</Button>
                    </div>
                </div>

                <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <CardHeader className="border-b border-border/40 bg-muted/30">
                        <CardTitle className="text-lg font-bold">{t("table_title")}</CardTitle>
                    </CardHeader>
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedCoupons.length === dummyCoupons.length}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-[80px]">{t("table.id")}</TableHead>
                                    <TableHead>{t("table.title")}</TableHead>
                                    <TableHead>{t("table.code")}</TableHead>
                                    <TableHead>{t("table.discount")}</TableHead>
                                    <TableHead>{t("table.expiry_date")}</TableHead>
                                    <TableHead>{t("table.status")}</TableHead>
                                    <TableHead className="text-right">{t("table.actions")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dummyCoupons.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                            {t("table.no_data")}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    dummyCoupons.map((coupon) => (
                                        <TableRow key={coupon.id} className="hover:bg-muted/20 border-b-border/40">
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedCoupons.includes(coupon.id)}
                                                    onCheckedChange={() => toggleSelectCoupon(coupon.id)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{coupon.id}</TableCell>
                                            <TableCell className="font-medium">{coupon.title}</TableCell>
                                            <TableCell>
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                                                    {coupon.code}
                                                </code>
                                            </TableCell>
                                            <TableCell>{coupon.discount}</TableCell>
                                            <TableCell>{coupon.expiryDate}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={coupon.status === "active" ? "default" : "secondary"}
                                                    className={cn(
                                                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                        coupon.status === "active"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none"
                                                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-none"
                                                    )}
                                                >
                                                    {t(`form.statuses.${coupon.status}`)}
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
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-between text-sm text-muted-foreground p-4 border-t border-border/40">
                            <div>
                                {t("pagination.showing", {
                                    from: dummyCoupons.length > 0 ? 1 : 0,
                                    to: dummyCoupons.length,
                                    total: dummyCoupons.length,
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
                </Card>
            </div>
        </AdminPageWrapper>
    );
}
