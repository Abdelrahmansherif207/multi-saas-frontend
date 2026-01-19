import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, Calendar, Shield, CheckCircle, XCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

interface AdminResponse {
    success: boolean;
    message: string;
    data: AdminDetails;
}

async function getAdmin(id: string): Promise<AdminDetails | null> {
    const token = await getAdminAuthCookie();

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<AdminResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/admins/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.data;
    } catch {
        return null;
    }
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function InfoRow({
    label,
    value,
    icon,
    valueClassName
}: {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
    valueClassName?: string;
}) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
            <span className="text-muted-foreground text-sm flex items-center gap-2">
                {icon}
                {label}
            </span>
            <span className={`font-medium text-sm ${valueClassName || ''}`}>{value}</span>
        </div>
    );
}

export default async function AdminDetailsPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations("Admin.RoleManage.AdminDetails");
    const tMenu = await getTranslations("Admin.RoleManage.menu");

    const admin = await getAdmin(id);

    if (!admin) {
        return (
            <AdminPageWrapper
                title={t("title")}
                breadcrumbs={[
                    { label: tMenu("title"), href: "#" },
                    { label: tMenu("all_admins"), href: `/${locale}/admin/admins` },
                    { label: t("title"), href: "#" }
                ]}
            >
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="text-muted-foreground text-lg">{t("admin_not_found")}</div>
                    <Link href={`/${locale}/admin/admins`}>
                        <Button variant="outline" className="mt-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t("back_to_admins")}
                        </Button>
                    </Link>
                </div>
            </AdminPageWrapper>
        );
    }

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_admins"), href: `/${locale}/admin/admins` },
                { label: admin.name, href: "#" }
            ]}
        >
            <div className="space-y-6">
                {/* Back Button */}
                <Link href={`/${locale}/admin/admins`}>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t("back_to_admins")}
                    </Button>
                </Link>

                {/* Top Header with Avatar */}
                <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                    <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
                        <AvatarImage src={admin.image || ""} />
                        <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                            {admin.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl font-bold">{admin.name}</h2>
                        <p className="text-muted-foreground">@{admin.username}</p>
                        <div className="flex gap-2 mt-2">
                            {admin.roles.map((role, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 border-brand-orange/20">
                                    {role}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            {t("sections.basic_info")}
                        </h3>
                        <div className="space-y-4">
                            <InfoRow label={t("labels.id")} value={`#${admin.id}`} />
                            <InfoRow label={t("labels.name")} value={admin.name} />
                            <InfoRow label={t("labels.username")} value={admin.username} />
                            <InfoRow
                                label={t("labels.email")}
                                value={admin.email}
                                icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                            />
                            <InfoRow
                                label={t("labels.email_verified")}
                                value={
                                    <span className="flex items-center gap-1">
                                        {admin.email_verified ? (
                                            <><CheckCircle className="h-4 w-4 text-green-500" /> {t("labels.yes")}</>
                                        ) : (
                                            <><XCircle className="h-4 w-4 text-red-500" /> {t("labels.no")}</>
                                        )}
                                    </span>
                                }
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Phone className="h-5 w-5 text-primary" />
                            {t("sections.contact_info")}
                        </h3>
                        <div className="space-y-4">
                            <InfoRow
                                label={t("labels.mobile")}
                                value={admin.mobile || t("labels.not_provided")}
                                icon={<Phone className="h-4 w-4 text-muted-foreground" />}
                            />
                            <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {t("labels.created_at")}
                                </div>
                                <span className="font-medium text-sm">{formatDate(admin.created_at)}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {t("labels.updated_at")}
                                </div>
                                <span className="font-medium text-sm">{formatDate(admin.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permissions Section */}
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        {t("sections.roles_and_permissions")}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">{t("labels.permissions")}</h4>
                            <div className="flex flex-wrap gap-2">
                                {admin.permissions.map((permission, idx) => (
                                    <Badge key={idx} variant="outline" className="bg-background">
                                        {permission}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
