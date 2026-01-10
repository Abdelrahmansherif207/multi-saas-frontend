"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const licenseFormSchema = z.object({
    license_key: z.string().optional(),
    envato_username: z.string().optional(),
});

export default function LicenseSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.license_settings");

    const form = useForm<z.infer<typeof licenseFormSchema>>({
        resolver: zodResolver(licenseFormSchema) as any,
        defaultValues: {
            license_key: "",
            envato_username: "",
        },
    });

    function onSubmit(values: z.infer<typeof licenseFormSchema>) {
        console.log(values);
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/license-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-right">{t("title")}</h3>

                            <FormField
                                control={form.control}
                                name="license_key"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("license_key")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("license_key")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="envato_username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("envato_username")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("envato_username")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button type="submit" className="bg-[#2B6CB0] hover:bg-[#2B6CB0]/90 text-white font-medium w-full sm:w-auto">
                                {t("submit")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AdminPageWrapper>
    );
}
