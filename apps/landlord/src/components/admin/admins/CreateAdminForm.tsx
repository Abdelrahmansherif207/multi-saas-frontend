"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

// Form Schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    mobile: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
    role: z.string().min(1, "Please select a role"),
    image: z.any().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});

export function CreateAdminForm() {
    const t = useTranslations("Admin.RoleManage.AddAdmin");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            mobile: "",
            email: "",
            password: "",
            passwordConfirm: "",
            role: "",
        },
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    function onSubmit(values: z.infer<typeof formSchema>) {
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
                                <FormDescription className="text-destructive font-medium">
                                    {t("form.username_desc")}
                                </FormDescription>
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

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary">{t("form.role")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("form.select_role")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="super_admin">Super Admin</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image Upload Mock */}
                    <div className="space-y-2">
                        <Label className="text-primary font-medium text-sm">{t("form.image")}</Label>
                        <div className="flex flex-col gap-4">
                            <div className="border-2 border-dashed border-border rounded-lg p-4 w-32 h-32 flex items-center justify-center bg-muted/30">
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                                        <span className="text-xs">{t("form.image")}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Button type="button" variant="outline" className="bg-primary hover:bg-primary/90 text-white dark:text-black border-none">
                                    {t("form.change_image")}
                                </Button>
                                <p className="text-xs text-muted-foreground mt-1">{t("form.image_format")}</p>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white dark:text-black w-full sm:w-auto">
                        {t("form.submit")}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
