"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const customJsFormSchema = z.object({
    js_code: z.string().optional(),
});

export default function CustomJsSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.custom_js_settings");

    const form = useForm                                                                                                                    <z.infer<typeof customJsFormSchema>>({
        resolver: zodResolver(customJsFormSchema) as any,
        defaultValues: {
            js_code: "",
        },
    });

    function onSubmit(values: z.infer<typeof customJsFormSchema>) {
        console.log(values);
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/custom-js-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="js_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex justify-end">{t("js_label")}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t("js_placeholder")}
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
