"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    site_main_color_one: z.string().default("#000000"),
    site_main_color_two: z.string().default("#000000"),
    site_main_color_three: z.string().default("#000000"),
    site_secondary_color: z.string().default("#000000"),
    site_secondary_color_two: z.string().default("#000000"),
    site_secondary_color_three: z.string().default("#000000"),
    site_background_color: z.string().default("#ffffff"),
    site_background_color_two: z.string().default("#ffffff"),
    site_background_color_three: z.string().default("#ffffff"),
    site_text_color: z.string().default("#000000"),
    site_text_color_two: z.string().default("#000000"),
    site_text_color_three: z.string().default("#000000"),
    site_border_color: z.string().default("#e5e7eb"),
    site_border_color_two: z.string().default("#e5e7eb"),
    site_border_color_three: z.string().default("#e5e7eb"),
    site_hover_color: z.string().default("#000000"),
    site_hover_color_two: z.string().default("#000000"),
    site_hover_color_three: z.string().default("#000000"),
});

export function ColorsSettingsForm() {
    const t = useTranslations("Admin.GeneralSettings.colors_settings");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            site_main_color_one: "#6366f1",
            site_main_color_two: "#4f46e5",
            site_main_color_three: "#4338ca",
            site_secondary_color: "#ec4899",
            site_secondary_color_two: "#db2777",
            site_secondary_color_three: "#be185d",
            site_background_color: "#ffffff",
            site_background_color_two: "#f9fafb",
            site_background_color_three: "#f3f4f6",
            site_text_color: "#111827",
            site_text_color_two: "#374151",
            site_text_color_three: "#4b5563",
            site_border_color: "#e5e7eb",
            site_border_color_two: "#d1d5db",
            site_border_color_three: "#9ca3af",
            site_hover_color: "#000000",
            site_hover_color_two: "#000000",
            site_hover_color_three: "#000000",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    const colorFields = [
        { name: "site_main_color_one", label: "site_main_color_one" },
        { name: "site_main_color_two", label: "site_main_color_two" },
        { name: "site_main_color_three", label: "site_main_color_three" },
        { name: "site_secondary_color", label: "site_secondary_color" },
        { name: "site_secondary_color_two", label: "site_secondary_color_two" },
        { name: "site_secondary_color_three", label: "site_secondary_color_three" },
        { name: "site_background_color", label: "site_background_color" },
        { name: "site_background_color_two", label: "site_background_color_two" },
        { name: "site_background_color_three", label: "site_background_color_three" },
        { name: "site_text_color", label: "site_text_color" },
        { name: "site_text_color_two", label: "site_text_color_two" },
        { name: "site_text_color_three", label: "site_text_color_three" },
        { name: "site_border_color", label: "site_border_color" },
        { name: "site_border_color_two", label: "site_border_color_two" },
        { name: "site_border_color_three", label: "site_border_color_three" },
        { name: "site_hover_color", label: "site_hover_color" },
        { name: "site_hover_color_two", label: "site_hover_color_two" },
        { name: "site_hover_color_three", label: "site_hover_color_three" },
    ];

    return (
        <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {colorFields.map((item) => (
                            <FormField
                                key={item.name}
                                control={form.control}
                                name={item.name as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t(item.label)}</FormLabel>
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border shadow-sm">
                                                <Input
                                                    type="color"
                                                    {...field}
                                                    className="absolute -top-2 -left-2 w-16 h-16 p-0 border-0 cursor-pointer"
                                                />
                                            </div>
                                            <FormControl>
                                                <Input {...field} className="font-mono uppercase" />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border/40">
                        <Button type="submit" className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-medium w-full sm:w-auto">
                            {t("save_changes")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
