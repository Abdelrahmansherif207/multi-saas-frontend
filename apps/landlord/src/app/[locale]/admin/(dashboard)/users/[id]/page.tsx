import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, Building, MapPin, Globe, CheckCircle, XCircle, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import Link from "next/link";

interface Domain {
    id: number;
    domain: string;
    tenant_id: string;
    created_at: string;
    updated_at: string;
}

interface Payment {
    id: number;
    email: string;
    name: string;
    package_name: string;
    package_price: string;
    package_gateway: string | null;
    status: number;
    payment_status: number;
    start_date: string;
    expire_date: string;
    theme: string;
    is_active: boolean;
    is_expired: boolean;
    created_at: string;
}

interface Tenant {
    id: string;
    user_id: number;
    instruction_status: boolean;
    theme: string | null;
    theme_code: string;
    domains: Domain[];
    latest_payment: Payment;
    created_at: string;
    updated_at: string;
}

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
    tenants: Tenant[];
    created_at: string;
    updated_at: string;
}

interface UserResponse {
    success: boolean;
    message: string;
    data: UserDetails;
}

async function getUser(id: string): Promise<UserDetails | null> {
    const token = await getAdminAuthCookie();

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<UserResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
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

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale } = await params;
    const t = await getTranslations("Admin.UserManage.UserDetails");
    const tMenu = await getTranslations("Admin.UserManage.menu");

    const user = await getUser(id);

    if (!user) {
        return (
            <AdminPageWrapper
                title={t("title")}
                breadcrumbs={[
                    { label: tMenu("title"), href: "#" },
                    { label: tMenu("all_users"), href: `/${locale}/admin/users` },
                    { label: t("title"), href: "#" }
                ]}
            >
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="text-muted-foreground text-lg">{t("user_not_found")}</div>
                    <Link href={`/${locale}/admin/users`}>
                        <Button variant="outline" className="mt-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t("back_to_users")}
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
                { label: tMenu("all_users"), href: `/${locale}/admin/users` },
                { label: user.name, href: "#" }
            ]}
        >
            <div className="space-y-6">
                {/* Back Button */}
                <Link href={`/${locale}/admin/users`}>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t("back_to_users")}
                    </Button>
                </Link>

                {/* User Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            {t("sections.basic_info")}
                        </h3>
                        <div className="space-y-4">
                            <InfoRow label={t("labels.id")} value={`#${user.id}`} />
                            <InfoRow label={t("labels.name")} value={user.name} />
                            <InfoRow label={t("labels.username")} value={user.username} />
                            <InfoRow
                                label={t("labels.email")}
                                value={user.email}
                                icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                            />
                            <InfoRow
                                label={t("labels.has_subdomain")}
                                value={user.has_subdomain ? t("labels.yes") : t("labels.no")}
                                valueClassName={user.has_subdomain ? "text-green-500" : "text-red-500"}
                            />
                            <InfoRow
                                label={t("labels.email_verified")}
                                value={
                                    <span className="flex items-center gap-1">
                                        {user.email_verified ? (
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
                                value={user.mobile || t("labels.not_provided")}
                                icon={<Phone className="h-4 w-4 text-muted-foreground" />}
                            />
                            <InfoRow
                                label={t("labels.company")}
                                value={user.company || t("labels.not_provided")}
                                icon={<Building className="h-4 w-4 text-muted-foreground" />}
                            />
                            <InfoRow
                                label={t("labels.address")}
                                value={user.address || t("labels.not_provided")}
                                icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
                            />
                            <InfoRow label={t("labels.city")} value={user.city || t("labels.not_provided")} />
                            <InfoRow label={t("labels.state")} value={user.state || t("labels.not_provided")} />
                            <InfoRow
                                label={t("labels.country")}
                                value={user.country || t("labels.not_provided")}
                                icon={<Globe className="h-4 w-4 text-muted-foreground" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                    <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t("labels.created_at")}:</span>
                            <span className="font-medium">{formatDate(user.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t("labels.updated_at")}:</span>
                            <span className="font-medium">{formatDate(user.updated_at)}</span>
                        </div>
                    </div>
                </div>

                {/* Tenants Section */}
                {user.tenants && user.tenants.length > 0 && (
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Globe className="h-5 w-5 text-primary" />
                            {t("sections.tenants")} ({user.tenants.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {user.tenants.map((tenant) => (
                                <TenantCard key={tenant.id} tenant={tenant} t={t} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminPageWrapper>
    );
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

function TenantCard({ tenant, t }: { tenant: Tenant; t: (key: string) => string }) {
    const domain = tenant.domains[0]?.domain || tenant.id;
    const payment = tenant.latest_payment;

    const getStatusBadge = () => {
        if (payment?.is_expired) {
            return <span className="px-2 py-1 rounded-full text-xs bg-red-500/10 text-red-500">{t("tenant.expired")}</span>;
        }
        if (payment?.is_active) {
            return <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">{t("tenant.active")}</span>;
        }
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-500">{t("tenant.pending")}</span>;
    };

    return (
        <div className="rounded-xl border border-border/40 bg-background/50 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    {tenant.theme_code && (
                        <div
                            className="w-4 h-4 rounded-full border border-border/50"
                            style={{ backgroundColor: tenant.theme_code }}
                        />
                    )}
                    <span className="font-semibold text-sm truncate max-w-[150px]">{tenant.id}</span>
                </div>
                {getStatusBadge()}
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("tenant.domain")}:</span>
                    <a
                        href={`http://${domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate max-w-[120px]"
                    >
                        {domain}
                    </a>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("tenant.theme")}:</span>
                    <span>{payment?.theme || tenant.theme || 'default'}</span>
                </div>
                {payment && (
                    <>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("tenant.package")}:</span>
                            <span>{payment.package_name || 'Free'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("tenant.price")}:</span>
                            <span>${payment.package_price}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("tenant.expire_date")}:</span>
                            <span>{new Date(payment.expire_date).toLocaleDateString()}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
