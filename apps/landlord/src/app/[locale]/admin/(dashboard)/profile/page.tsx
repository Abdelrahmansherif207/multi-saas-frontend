import { adminAuthAxios } from "@/lib/auth/admin-axios";
import { getTranslations } from "next-intl/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Shield, Key } from "lucide-react";
import type { Admin } from "@/types/admin-auth";
import { PermissionsList } from "@/components/admin/PermissionsList";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Admin.Profile' });

    return {
        title: t('title', { defaultMessage: 'Admin Profile' }),
    };
}

export default async function AdminProfilePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Admin.Profile' });

    // Fetch admin profile directly from backend
    let admin: Admin | null = null;
    try {
        const response = await adminAuthAxios.get<{ success: boolean; data: Admin }>('/admin/auth/me');
        admin = response.data.data;
    } catch (error) {
        // If unauthorized, redirect to login
        redirect(`/${locale}/admin/login`);
    }

    if (!admin) {
        return <div>{t('error_loading', { defaultMessage: 'Failed to load profile' })}</div>;
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('title', { defaultMessage: 'My Profile' })}</h2>
                    <p className="text-muted-foreground">
                        {t('description', { defaultMessage: 'View and manage your admin profile information.' })}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('personal_info', { defaultMessage: 'Personal Information' })}</CardTitle>
                        <CardDescription>
                            {t('personal_info_desc', { defaultMessage: 'Basic details about your admin account.' })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={admin.image} />
                                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                                    {getInitials(admin.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-semibold">{admin.name}</h3>
                                <p className="text-sm text-muted-foreground">@{admin.username}</p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                                <User className="w-5 h-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground">{t('label_username', { defaultMessage: 'Username' })}</p>
                                    <p className="text-sm font-medium">{admin.username}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                                <Mail className="w-5 h-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground">{t('label_email', { defaultMessage: 'Email Address' })}</p>
                                    <p className="text-sm font-medium">{admin.email}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Roles & Security Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('security_roles', { defaultMessage: 'Roles & Permissions' })}</CardTitle>
                        <CardDescription>
                            {t('security_roles_desc', { defaultMessage: 'Access levels and security settings.' })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Shield className="w-4 h-4" />
                                    <span>{t('assigned_roles', { defaultMessage: 'Assigned Roles' })}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {admin.roles?.map((role) => (
                                        <Badge key={role} variant="secondary" className="px-3 py-1">
                                            {role}
                                        </Badge>
                                    )) || (
                                            <span className="text-sm text-muted-foreground italic">No roles assigned</span>
                                        )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Key className="w-4 h-4" />
                                    <span>{t('permissions', { defaultMessage: 'Permissions' })}</span>
                                </div>
                                <PermissionsList permissions={admin.permissions || []} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
