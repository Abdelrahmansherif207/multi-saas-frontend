"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";

const formSchema = z.object({
    site_meta_title_en: z.string().optional(),
    site_meta_title_ar: z.string().optional(),
    site_meta_keywords_en: z.string().optional(),
    site_meta_keywords_ar: z.string().optional(),
    site_meta_description_en: z.string().optional(),
    site_meta_description_ar: z.string().optional(),
    og_meta_title_en: z.string().optional(),
    og_meta_title_ar: z.string().optional(),
    og_meta_description_en: z.string().optional(),
    og_meta_description_ar: z.string().optional(),
    site_logo: z.any().optional(),
    canonical_url_type: z.string().optional(),
});

interface ImageUploadFieldProps {
    label: string;
    sizeHint: string;
    preview: string | null;
    onUpload: (file: File) => void;
    onRemove: () => void;
    t: any;
}

const ImageUploadField = ({ label, sizeHint, preview, onUpload, onRemove, t }: ImageUploadFieldProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="space-y-2">
            <Label className="text-primary font-medium text-sm flex justify-end">{label}</Label>
            <div className="flex flex-col gap-4 items-end">
                <div className="border-2 border-dashed border-border rounded-lg p-4 w-32 h-32 flex items-center justify-center bg-muted/30 relative group overflow-hidden">
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-md" />
                            <button
                                type="button"
                                onClick={onRemove}
                                className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                            <span className="text-xs">{t("change_image")}</span>
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleButtonClick}
                        className="bg-black hover:bg-black/90 hover:text-white dark:bg-white dark:hover:bg-white/90 text-white dark:text-black border-none h-8 text-xs"
                    >
                        {t("change_image")}
                    </Button>
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">{t("image_format", { size: sizeHint })}</p>
                </div>
            </div>
        </div>
    );
};

export default function SEOSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.seo_settings");
    const tIdentity = useTranslations("Admin.GeneralSettings.site_identity");
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            site_meta_title_en: "",
            site_meta_title_ar: "",
            site_meta_keywords_en: "",
            site_meta_keywords_ar: "",
            site_meta_description_en: "",
            site_meta_description_ar: "",
            og_meta_title_en: "",
            og_meta_title_ar: "",
            og_meta_description_en: "",
            og_meta_description_ar: "",
            canonical_url_type: "self",
        },
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setLogoPreview(null);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("title"), href: "/admin/general-settings/seo-settings" }
            ]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Language Tabs */}
                        <div className="flex justify-end mb-6">
                            <div className="inline-flex rounded-lg border border-border p-1 bg-muted/20">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("ar")}
                                    className={cn(
                                        "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                                        activeTab === "ar"
                                            ? "bg-white text-primary shadow-sm dark:bg-black dark:text-white"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    العربية
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("en")}
                                    className={cn(
                                        "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                                        activeTab === "en"
                                            ? "bg-white text-primary shadow-sm dark:bg-black dark:text-white"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    English (UK)
                                </button>
                            </div>
                        </div>

                        {/* Translatable Fields */}
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name={activeTab === "en" ? "site_meta_title_en" : "site_meta_title_ar"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("site_meta_title")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Wajha" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={activeTab === "en" ? "site_meta_keywords_en" : "site_meta_keywords_ar"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("site_meta_keywords")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="keyword1, keyword2" {...field} className="text-right" />
                                        </FormControl>
                                        <p className="text-[10px] text-muted-foreground text-right">{t("site_meta_keywords_help")}</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={activeTab === "en" ? "site_meta_description_en" : "site_meta_description_ar"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("site_meta_description")}</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Create your own website within few minutes" {...field} className="text-right min-h-[100px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="pt-4 border-t border-border/40">
                                <h3 className="text-lg font-semibold mb-4 text-right">OG Meta Information</h3>
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name={activeTab === "en" ? "og_meta_title_en" : "og_meta_title_ar"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-end">{t("og_meta_title")}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Wajha" {...field} className="text-right" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={activeTab === "en" ? "og_meta_description_en" : "og_meta_description_ar"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-end">{t("og_meta_description")}</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Create your own website within few minutes" {...field} className="text-right min-h-[100px]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Site Logo */}
                        <div className="pt-6 border-t border-border/40">
                            <ImageUploadField
                                label={t("site_logo")}
                                sizeHint="100*100"
                                preview={logoPreview}
                                onUpload={handleUpload}
                                onRemove={handleRemove}
                                t={tIdentity}
                            />
                        </div>

                        {/* Canonical URL Type */}
                        <div className="pt-6 border-t border-border/40">
                            <FormField
                                control={form.control}
                                name="canonical_url_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("canonical_url_type")}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="text-right flex-row-reverse">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent align="end">
                                                <SelectItem value="self">Self</SelectItem>
                                                <SelectItem value="custom">Custom</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                                {t("save_changes")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AdminPageWrapper>
    );
}