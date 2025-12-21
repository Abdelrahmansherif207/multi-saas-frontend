"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTranslations } from "next-intl";

import { MultiSelect } from "@/components/ui/custom/multi-select";

const formSchema = z.object({
    expireAlertDays: z.array(z.string()).min(1, "Please select at least one option"),
    deleteAfterDays: z.string().optional(),
});

export function AccountSettingsForm() {
    const t = useTranslations("Admin.UserManage.Settings");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            expireAlertDays: ["Five Day"],
            deleteAfterDays: "5",
        },
    });

    const expireOptions = [
        { label: "One Day", value: "One Day" },
        { label: "Two Days", value: "Two Days" },
        { label: "Three Days", value: "Three Days" },
        { label: "Four Days", value: "Four Days" },
        { label: "Five Day", value: "Five Day" },
        { label: "One Week", value: "One Week" },
    ];

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Handle submission
    }

    return (
        <div className="w-full">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-foreground/80">{t("title")}</h2>
                <Button variant="default" className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                    {useTranslations("Admin.UserManage.menu")("all_users")}
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="expireAlertDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground/80 font-normal">{t("form.expire_alert_days")}</FormLabel>
                                <FormControl>
                                    <MultiSelect
                                        options={expireOptions}
                                        selected={field.value || []}
                                        onChange={field.onChange}
                                        placeholder={t("form.days_placeholder")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="deleteAfterDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground/80 font-normal">{t("form.delete_after_days")}</FormLabel>
                                <FormControl>
                                    <Input placeholder="5" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white dark:text-black w-full sm:w-32">
                        {t("form.submit")}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
