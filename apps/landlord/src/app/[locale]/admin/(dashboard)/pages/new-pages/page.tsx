"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Upload, Globe, Facebook, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    title: z.string().min(2, "validation.title_min"),
    content: z.string().min(10, "validation.content_min"),
    excerpt: z.string().max(191, "validation.excerpt_max").optional(),
    visibility: z.string().min(1, "validation.visibility_required"),
    status: z.string().min(1, "validation.status_required"),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    fbTitle: z.string().optional(),
    fbDescription: z.string().optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewPage() {
    const t = useTranslations("Admin.Pages.NewPage");
    const [activeTab, setActiveTab] = useState<"general" | "facebook" | "twitter">("general");
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            excerpt: "",
            visibility: "public",
            status: "draft",
            seoTitle: "",
            seoDescription: "",
            fbTitle: "",
            fbDescription: "",
            twitterTitle: "",
            twitterDescription: "",
        },
    });

    function onSubmit(values: FormValues) {
        console.log(values);
        // Handle submission
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("breadcrumbs.admin"), href: "/admin" },
                { label: t("breadcrumbs.pages"), href: "/admin/pages" },
                { label: t("breadcrumbs.new_page"), href: "/admin/pages/new-pages" },
            ]}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column - Sidebar */}
                        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                                <CardContent className="p-6 space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="visibility"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.visibility")}</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t("form.select_visibility")} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="public">{t("form.visibilities.public")}</SelectItem>
                                                        <SelectItem value="private">{t("form.visibilities.private")}</SelectItem>
                                                        <SelectItem value="hidden">{t("form.visibilities.hidden")}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage>
                                                    {form.formState.errors.visibility?.message && t(form.formState.errors.visibility.message)}
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
                                                            <SelectValue placeholder={t("form.select_status")} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="draft">{t("form.statuses.draft")}</SelectItem>
                                                        <SelectItem value="published">{t("form.statuses.published")}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage>
                                                    {form.formState.errors.status?.message && t(form.formState.errors.status.message)}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-2">
                                        <Label>{t("form.featured_image")}</Label>
                                        <div className="relative aspect-video rounded-lg border-2 border-dashed border-border/60 bg-muted/30 flex flex-col items-center justify-center overflow-hidden group">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                                                    <p className="text-xs text-muted-foreground">
                                                        {t("form.recommended_size")}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button type="button" variant="secondary" size="sm" className="gap-2">
                                                    <Upload className="w-4 h-4" />
                                                    {t("form.upload_image")}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                                        {t("form.submit")}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Main Content */}
                        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
                            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.page_title")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t("form.page_title_placeholder")} {...field} />
                                                </FormControl>
                                                <FormMessage>
                                                    {form.formState.errors.title?.message && t(form.formState.errors.title.message)}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.content")}</FormLabel>
                                                <FormControl>
                                                    <RichTextEditor
                                                        content={field.value}
                                                        onChange={field.onChange}
                                                        placeholder={t("form.content_placeholder")}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {form.formState.errors.content?.message && t(form.formState.errors.content.message)}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="excerpt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t("form.excerpt")}</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder={t("form.excerpt_placeholder")}
                                                        className="min-h-[80px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {form.formState.errors.excerpt?.message && t(form.formState.errors.excerpt.message)}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* SEO Section */}
                            <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-brand-orange" />
                                        {t("seo.title")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex border-b border-border/40 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("general")}
                                            className={cn(
                                                "px-4 py-2 text-sm font-medium transition-colors relative",
                                                activeTab === "general" ? "text-brand-orange" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {t("seo.tabs.general")}
                                            {activeTab === "general" && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("facebook")}
                                            className={cn(
                                                "px-4 py-2 text-sm font-medium transition-colors relative",
                                                activeTab === "facebook" ? "text-brand-orange" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {t("seo.tabs.facebook")}
                                            {activeTab === "facebook" && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("twitter")}
                                            className={cn(
                                                "px-4 py-2 text-sm font-medium transition-colors relative",
                                                activeTab === "twitter" ? "text-brand-orange" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {t("seo.tabs.twitter")}
                                            {activeTab === "twitter" && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {activeTab === "general" && (
                                            <div className="space-y-4 animate-in fade-in-50 duration-300">
                                                <FormField
                                                    control={form.control}
                                                    name="seoTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t("seo.general.title")}</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder={t("seo.general.title_placeholder")} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="seoDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t("seo.general.description")}</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder={t("seo.general.description_placeholder")} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {activeTab === "facebook" && (
                                            <div className="space-y-4 animate-in fade-in-50 duration-300">
                                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                                    <Facebook className="w-5 h-5" />
                                                    <span className="font-semibold">{t("seo.facebook.header")}</span>
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="fbTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t("seo.facebook.title")}</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder={t("seo.facebook.title_placeholder")} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="fbDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t("seo.facebook.description")}</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder={t("seo.facebook.description_placeholder")} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {activeTab === "twitter" && (
                                            <div className="space-y-4 animate-in fade-in-50 duration-300">
                                                <div className="flex items-center gap-2 text-sky-500 mb-2">
                                                    <Twitter className="w-5 h-5" />
                                                    <span className="font-semibold">{t("seo.twitter.header")}</span>
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="twitterTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t("seo.twitter.title")}</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder={t("seo.twitter.title_placeholder")} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="twitterDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t("seo.twitter.description")}</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder={t("seo.twitter.description_placeholder")} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </AdminPageWrapper>
    );
}