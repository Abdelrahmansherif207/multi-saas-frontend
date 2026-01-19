'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Loader2, User, Mail, Phone, Building, MapPin, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import axios from "axios";

interface UserDetails {
    id: number;
    name: string;
    email: string;
    username: string;
    mobile: string | null;
    company: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    image: string | null;
    has_subdomain: boolean;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
}

interface EditUserFormProps {
    user: UserDetails;
    locale: string;
}

export default function EditUserForm({ user, locale }: EditUserFormProps) {
    const t = useTranslations("Admin.UserManage.EditUser");
    const tMenu = useTranslations("Admin.UserManage.menu");
    const router = useRouter();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        mobile: user.mobile || '',
        company: user.company || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        email_verified: user.email_verified || false,
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
            // Call the API route which has access to the token
            const response = await axios.put(
                `/api/admin/users/${user.id}`,
                formData
            );

            if (response.data.success) {
                setSuccess(response.data.message || t("form.success"));
                setTimeout(() => {
                    router.push(`/${locale}/admin/users/${user.id}`);
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
                { label: tMenu("all_users"), href: `/${locale}/admin/users` },
                { label: t("title"), href: "#" }
            ]}
        >
            <div className="space-y-6">
                {/* Back Button */}
                <Link href={`/${locale}/admin/users/${user.id}`}>
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
                                <div className="space-y-2">
                                    <Label htmlFor="company" className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        {t("form.company")}
                                    </Label>
                                    <Input
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={t("form.company_placeholder")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        {t("form.address")}
                                    </Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder={t("form.address_placeholder")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Globe className="h-5 w-5 text-primary" />
                            {t("sections.location_info")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">{t("form.city")}</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder={t("form.city_placeholder")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">{t("form.state")}</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder={t("form.state_placeholder")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">{t("form.country")}</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder={t("form.country_placeholder")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Link href={`/${locale}/admin/users/${user.id}`}>
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
