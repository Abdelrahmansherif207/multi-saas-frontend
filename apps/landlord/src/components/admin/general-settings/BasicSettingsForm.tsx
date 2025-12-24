"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    site_title_en: z.string().optional(),
    site_title_ar: z.string().optional(),
    site_tagline_en: z.string().optional(),
    site_tagline_ar: z.string().optional(),
    footer_text_en: z.string().optional(),
    footer_text_ar: z.string().optional(),
    database_engine: z.string().optional(),
    date_display_style: z.string().optional(),
    dark_mode_switcher: z.boolean().default(false),
    section_title_extra_design: z.boolean().default(false),
    rtl_support: z.boolean().default(false),
    lazy_load: z.boolean().default(false),
    email_verification: z.boolean().default(false),
    sorting_table: z.boolean().default(false),
});

export function BasicSettingsForm() {
    const t = useTranslations("Admin.GeneralSettings.basic_settings");
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            site_title_en: "",
            site_title_ar: "",
            site_tagline_en: "",
            site_tagline_ar: "",
            footer_text_en: "",
            footer_text_ar: "",
            database_engine: "InnoDB",
            date_display_style: "01-12-2025",
            dark_mode_switcher: true,
            section_title_extra_design: true,
            rtl_support: false,
            lazy_load: false,
            email_verification: false,
            sorting_table: true,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
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
                            name={activeTab === "en" ? "site_title_en" : "site_title_ar"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("site_title")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Wajha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={activeTab === "en" ? "site_tagline_en" : "site_tagline_ar"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("site_tagline")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Build your website using our platform" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={activeTab === "en" ? "footer_text_en" : "footer_text_ar"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("footer_text")}</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="MultiSaas. All Rights Reserved (2025)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* General Fields */}
                    <div className="space-y-6 pt-6 border-t border-border/40">
                        <FormField
                            control={form.control}
                            name="database_engine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("database_engine")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly className="bg-muted/50" />
                                    </FormControl>
                                    <p className="text-[10px] text-muted-foreground text-right">{t("database_engine_help")}</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date_display_style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("date_display_style")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly className="bg-muted/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Toggles */}
                    <div className="space-y-6 pt-6 border-t border-border/40">
                        {[
                            { name: "dark_mode_switcher", label: "dark_mode_switcher" },
                            { name: "section_title_extra_design", label: "section_title_extra_design" },
                            { name: "rtl_support", label: "rtl_support" },
                            { name: "lazy_load", label: "lazy_load", help: "lazy_load_help" },
                            { name: "email_verification", label: "email_verification" },
                            { name: "sorting_table", label: "sorting_table", help: "sorting_table_help" },
                        ].map((item) => (
                            <FormField
                                key={item.name}
                                control={form.control}
                                name={item.name as any}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">{t(item.label)}</FormLabel>
                                            {item.help && <p className="text-[10px] text-muted-foreground">{t(item.help)}</p>}
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                            {t("save_changes")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
