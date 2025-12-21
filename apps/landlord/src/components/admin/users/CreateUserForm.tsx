"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    company: z.string().optional(),
    address: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});

export function CreateUserForm() {
    const t = useTranslations("Admin.UserManage.AddUser");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            mobile: "",
            country: "",
            city: "",
            state: "",
            company: "",
            address: "",
            password: "",
            passwordConfirm: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Handle submission
    }

    return (
        <div className="w-full bg-card border border-border/40 rounded-xl p-6 md:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.name")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.name_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.username")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.username_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.email")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.email_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.mobile")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.mobile_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.country")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("form.select_country")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* Mock Countries */}
                                        <SelectItem value="usa">USA</SelectItem>
                                        <SelectItem value="uk">UK</SelectItem>
                                        <SelectItem value="canada">Canada</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.city")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.city_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.state")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.state_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.company")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.company_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.address")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.address_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.password")}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder={t("form.password_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.password_confirm")}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder={t("form.password_confirm_placeholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white dark:text-black w-full sm:w-auto">
                        {t("form.submit")}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
