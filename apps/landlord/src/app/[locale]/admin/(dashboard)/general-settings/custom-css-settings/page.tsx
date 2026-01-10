"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const customCssFormSchema = z.object({
    css_code: z.string().optional(),
});

export default function CustomCssSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.custom_css_settings");

    const form = useForm<z.infer<typeof customCssFormSchema>>({
        resolver: zodResolver(customCssFormSchema) as any,
        defaultValues: {
            css_code: "",
        },
    });

    function onSubmit(values: z.infer<typeof customCssFormSchema>) {
        console.log(values);
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/custom-css-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="css_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex justify-end">{t("css_label")}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t("css_placeholder")}
                                            {...field}
                                            className="min-h-[400px] font-mono text-sm text-right"
                                            dir="ltr"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end pt-2">
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
