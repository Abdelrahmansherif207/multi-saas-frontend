"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

const gdprFormSchema = z.object({
    gdpr_title: z.string().optional(),
    gdpr_message: z.string().optional(),
    more_info_link_label: z.string().optional(),
    more_info_link: z.string().optional(),
    cookie_accept_button_label: z.string().optional(),
    cookie_decline_button_label: z.string().optional(),
    cookie_manage_button_label: z.string().optional(),
    cookie_manage_title: z.string().optional(),
    cookie_enable_disable: z.boolean().default(true),
    cookie_expire: z.string().optional(),
    show_delay: z.string().optional(),
    questions: z.array(z.object({
        question: z.string().optional(),
        description: z.string().optional(),
    })).optional(),
});

export default function GdprSettingsPage() {
    const t = useTranslations("Admin.GeneralSettings.gdpr_settings");

    const form = useForm<z.infer<typeof gdprFormSchema>>({
        resolver: zodResolver(gdprFormSchema) as any,
        defaultValues: {
            gdpr_title: "",
            gdpr_message: "",
            more_info_link_label: "",
            more_info_link: "",
            cookie_accept_button_label: "",
            cookie_decline_button_label: "",
            cookie_manage_button_label: "",
            cookie_manage_title: "",
            cookie_enable_disable: true,
            cookie_expire: "30",
            show_delay: "1000",
            questions: [{ question: "", description: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });

    function onSubmit(values: z.infer<typeof gdprFormSchema>) {
        console.log(values);
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[{ label: t("title"), href: "/admin/general-settings/gdpr-settings" }]}
        >
            <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-right">{t("gdpr_title")}</h3>

                            <FormField
                                control={form.control}
                                name="gdpr_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("gdpr_title")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("gdpr_title")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gdpr_message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("gdpr_message")}</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder={t("gdpr_message")} {...field} className="text-right min-h-[100px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="more_info_link_label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("more_info_link_label")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("more_info_link_label")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="more_info_link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("more_info_link")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/privacy-policy" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cookie_accept_button_label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("cookie_accept_button_label")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("cookie_accept_button_label")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cookie_decline_button_label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("cookie_decline_button_label")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("cookie_decline_button_label")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cookie_manage_button_label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("cookie_manage_button_label")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("cookie_manage_button_label")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cookie_manage_title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("cookie_manage_title")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("cookie_manage_title")} {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cookie_enable_disable"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row-reverse items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5 text-right">
                                            <FormLabel className="text-base">{t("cookie_enable_disable")}</FormLabel>
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

                            <FormField
                                control={form.control}
                                name="cookie_expire"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("cookie_expire")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="30" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="show_delay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-end">{t("show_delay")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1000" {...field} className="text-right" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center flex-row-reverse">
                                <h3 className="text-lg font-medium">{t("questions_title")}</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ question: "", description: "" })}
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    {t("add_question")}
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 left-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>

                                    <FormField
                                        control={form.control}
                                        name={`questions.${index}.question`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-end">{t("question_label")}</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="text-right" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`questions.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-end">{t("description_label")}</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} className="text-right min-h-[80px]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>

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
