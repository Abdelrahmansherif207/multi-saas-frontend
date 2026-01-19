'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, User, Mail, Phone, Lock, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CreateAdminFormProps {
    locale: string;
    submitAction: (data: any) => Promise<{ success: boolean; message: string }>;
}

export default function CreateAdminForm({ locale, submitAction }: CreateAdminFormProps) {
    const t = useTranslations("Admin.RoleManage.AddAdmin");
    const tMenu = useTranslations("Admin.RoleManage.menu");
    const router = useRouter();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        mobile: '',
        password: '',
        password_confirmation: '',
        role: 'admin'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
        setSuccess(null);
    };

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            setError(t("form.password_confirm_placeholder") || "Passwords do not match");
            return;
        }

        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            // Call the server action passed via props
            const response = await submitAction(formData);

            if (response.success) {
                setSuccess(response.message || t("form.success"));
                setTimeout(() => {
                    router.push(`/${locale}/admin/admins`);
                    router.refresh();
                }, 1500);
            } else {
                setError(response.message || t("form.error"));
            }
        } catch (err: any) {
            console.error(err);
            // fallback error
            setError(t("form.error"));
        }

        setSaving(false);
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_admins"), href: `/${locale}/admin/admins` },
                { label: t("title"), href: "#" }
            ]}
        >
            <div className="space-y-6">
                {/* Back Button */}
                <Link href={`/${locale}/admin/admins`}>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {tMenu("all_admins")}
                    </Button>
                </Link>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Messages */}
                    {error && (
                        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-600 text-sm">
                            {success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Basic Information
                            </h3>

                            <div className="space-y-2">
                                <Label htmlFor="name">{t("form.name")}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t("form.name_placeholder")}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">{t("form.username")}</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder={t("form.username_placeholder")}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">{t("form.username_desc")}</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                    {t("form.role")}
                                </Label>
                                <Select value={formData.role} onValueChange={handleRoleChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("form.select_role")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Contact & Security */}
                        <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6 space-y-4">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                Contact & Security
                            </h3>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    {t("form.email")}
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t("form.email_placeholder")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mobile" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {t("form.mobile")}
                                </Label>
                                <Input
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder={t("form.mobile_placeholder")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">{t("form.password")}</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={t("form.password_placeholder")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">{t("form.password_confirm")}</Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder={t("form.password_confirm_placeholder")}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Link href={`/${locale}/admin/admins`}>
                            <Button type="button" variant="outline">
                                {t("form.cancel")}
                            </Button>
                        </Link>
                        <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90">
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {t("form.saving")}
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    {t("form.submit")}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminPageWrapper>
    );
}
