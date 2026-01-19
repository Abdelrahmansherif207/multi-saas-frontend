'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Loader2, User, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import axios from "axios";

interface AdminDetails {
    id: number;
    name: string;
    email: string;
    username: string;
    mobile: string;
    image: string | null;
    email_verified: boolean;
    roles: string[];
    permissions: string[];
    created_at: string;
    updated_at: string;
}

interface EditAdminFormProps {
    admin: AdminDetails;
    locale: string;
}

export default function EditAdminForm({ admin, locale }: EditAdminFormProps) {
    const t = useTranslations("Admin.RoleManage.EditAdmin");
    const tMenu = useTranslations("Admin.RoleManage.menu");
    const router = useRouter();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: admin.name || '',
        email: admin.email || '',
        username: admin.username || '',
        mobile: admin.mobile || '',
        email_verified: admin.email_verified || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.put(
                `/api/admin/admins/${admin.id}`,
                formData
            );

            if (response.data.success) {
                setSuccess(response.data.message || t("form.success"));
                setTimeout(() => {
                    router.push(`/${locale}/admin/admins/${admin.id}`);
                    router.refresh();
                }, 1500);
            } else {
                setError(response.data.message || t("form.error"));
            }
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || t("form.error"));
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
                <Link href={`/${locale}/admin/admins/${admin.id}`}>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t("back_to_details")}
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
                        <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                {t("sections.basic_info")}
                            </h3>
                            <div className="space-y-4">
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
                                </div>
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
                                <div className="flex items-center justify-between py-2">
                                    <Label htmlFor="email_verified" className="cursor-pointer">
                                        {t("form.email_verified")}
                                    </Label>
                                    <Switch
                                        id="email_verified"
                                        checked={formData.email_verified}
                                        onCheckedChange={(checked) =>
                                            setFormData(prev => ({ ...prev, email_verified: checked }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary" />
                                {t("sections.contact_info")}
                            </h3>
                            <div className="space-y-4">
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
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Link href={`/${locale}/admin/admins/${admin.id}`}>
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
                                    {t("form.save")}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminPageWrapper>
    );
}
