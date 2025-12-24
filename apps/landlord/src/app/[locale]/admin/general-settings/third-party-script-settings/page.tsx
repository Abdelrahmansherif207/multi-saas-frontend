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
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";

const formSchema = z.object({
    header_tracking_code: z.string().optional(),
    footer_tracking_code: z.string().optional(),
    google_analytics_id: z.string().optional(),
    google_maps_key: z.string().optional(),
    google_maps_key_js: z.string().optional(),
    facebook_pixel_enabled: z.boolean().default(false),
    facebook_pixel_id: z.string().optional(),
    google_recaptcha_enabled: z.boolean().default(false),
    google_recaptcha_site_key: z.string().optional(),
    google_recaptcha_secret_key: z.string().optional(),
    live_chat_enabled: z.boolean().default(false),
    live_chat_code: z.string().optional(),
});

export default function ThirdPartyScriptSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.third_party_script_settings");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            header_tracking_code: "",
            footer_tracking_code: "",
            google_analytics_id: "",
            google_maps_key: "",
            google_maps_key_js: "",
            facebook_pixel_enabled: false,
            facebook_pixel_id: "",
            google_recaptcha_enabled: false,
            google_recaptcha_site_key: "",
            google_recaptcha_secret_key: "",
            live_chat_enabled: false,
            live_chat_code: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: t("title"), href: "/admin/general-settings/third-party-script-settings" }
            ]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {/* Tracking Codes */}
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="header_tracking_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("header_tracking_code")}</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="<script>...</script>" {...field} className="text-right min-h-[100px] font-mono" />
                                        </FormControl>
                                        <p className="text-[10px] text-muted-foreground text-right">{t("header_tracking_code_help")}</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="footer_tracking_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("footer_tracking_code")}</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="<script>...</script>" {...field} className="text-right min-h-[100px] font-mono" />
                                        </FormControl>
                                        <p className="text-[10px] text-muted-foreground text-right">{t("footer_tracking_code_help")}</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Google Analytics */}
                        <div className="pt-6 border-t border-border/40">
                            <h3 className="text-lg font-semibold mb-4 text-right">{t("google_analytics_title")}</h3>
                            <FormField
                                control={form.control}
                                name="google_analytics_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("google_analytics_id")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="UA-XXXXX-Y" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Google Maps */}
                        <div className="pt-6 border-t border-border/40">
                            <h3 className="text-lg font-semibold mb-4 text-right">{t("google_maps_key")}</h3>
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="google_maps_key"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-end">{t("google_maps_key")}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="AIza..." {...field} className="text-right" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="google_maps_key_js"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-end">{t("google_maps_key_js")}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="AIza..." {...field} className="text-right" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Facebook Pixel */}
                        <div className="pt-6 border-t border-border/40">
                            <h3 className="text-lg font-semibold mb-4 text-right">{t("facebook_pixel_title")}</h3>
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="facebook_pixel_enabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <FormLabel className="text-base">{t("facebook_pixel_enabled")}</FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="facebook_pixel_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-end">{t("facebook_pixel_id")}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123456789" {...field} className="text-right" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Google reCAPTCHA */}
                        <div className="pt-6 border-t border-border/40">
                            <h3 className="text-lg font-semibold mb-4 text-right">{t("google_recaptcha_title")}</h3>
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="google_recaptcha_enabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <FormLabel className="text-base">{t("google_recaptcha_enabled")}</FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="google_recaptcha_site_key"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-end">{t("google_recaptcha_site_key")}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="site key" {...field} className="text-right" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="google_recaptcha_secret_key"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-end">{t("google_recaptcha_secret_key")}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="secret key" {...field} className="text-right" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Live Chat */}
                        <div className="pt-6 border-t border-border/40">
                            <h3 className="text-lg font-semibold mb-4 text-right">{t("live_chat_title")}</h3>
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="live_chat_enabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <FormLabel className="text-base">{t("live_chat_enabled")}</FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="live_chat_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-end">{t("live_chat_code")}</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="<script>...</script>" {...field} className="text-right min-h-[100px] font-mono" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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