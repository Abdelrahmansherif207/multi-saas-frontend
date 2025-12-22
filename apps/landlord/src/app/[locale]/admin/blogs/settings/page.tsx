"use client";

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
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    categoryPageItemShow: z.string().min(1, "validation.required"),
    tagPageItemShow: z.string().min(1, "validation.required"),
    searchPageItemShow: z.string().min(1, "validation.required"),
});

export default function BlogSettingsPage() {
    const t = useTranslations("Admin.Blogs.Settings");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryPageItemShow: "3",
            tagPageItemShow: "4",
            searchPageItemShow: "2",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.blogs"), href: "/admin/blogs" },
                { label: t("breadcrumbs.settings"), href: "/admin/blogs/settings" },
            ]}
        >
            <div className="max-w-4xl mx-auto">
                <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <CardHeader className="border-b border-border/40 bg-muted/30">
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <Settings className="w-5 h-5 text-brand-orange" />
                            {t("title")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="categoryPageItemShow"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel className="text-base font-semibold text-foreground/80">
                                                        {t("form.category_show")}
                                                    </FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        className="h-12 bg-background/50 border-border/40 focus:border-brand-orange focus:ring-brand-orange/20 rounded-xl transition-all"
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {form.formState.errors.categoryPageItemShow?.message && t(form.formState.errors.categoryPageItemShow.message)}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tagPageItemShow"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel className="text-base font-semibold text-foreground/80">
                                                        {t("form.tag_show")}
                                                    </FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        className="h-12 bg-background/50 border-border/40 focus:border-brand-orange focus:ring-brand-orange/20 rounded-xl transition-all"
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {form.formState.errors.tagPageItemShow?.message && t(form.formState.errors.tagPageItemShow.message)}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="searchPageItemShow"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel className="text-base font-semibold text-foreground/80">
                                                        {t("form.search_show")}
                                                    </FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        className="h-12 bg-background/50 border-border/40 focus:border-brand-orange focus:ring-brand-orange/20 rounded-xl transition-all"
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {form.formState.errors.searchPageItemShow?.message && t(form.formState.errors.searchPageItemShow.message)}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-brand-orange/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {t("form.save")}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AdminPageWrapper>
    );
}
