"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Loader2, ExternalLink, LogIn, RefreshCw, AlertCircle } from "lucide-react";
import type { Tenant } from "@/types/tenant";
import { tenantService } from "@/lib/services/tenants";

interface TenantListProps {
    onTenantSwitch?: (subdomain: string) => void;
}

export function TenantList({ onTenantSwitch }: TenantListProps) {
    const t = useTranslations('dashboardTab');

    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [switchingTenant, setSwitchingTenant] = useState<string | null>(null);

    useEffect(() => {
        fetchTenants();
    }, []);

    async function fetchTenants() {
        setIsLoading(true);
        setError(null);

        try {
            const data = await tenantService.list();
            setTenants(data.data || []);
        } catch (err: any) {
            console.error('Failed to fetch tenants:', err);
            setError(err.message || 'Failed to load websites');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleTenantSwitch(subdomain: string) {
        setSwitchingTenant(subdomain);

        try {
            const data = await tenantService.switch(subdomain);

            if (!data.success) {
                throw new Error(data.message || 'Failed to switch tenant');
            }

            const { token } = data.data;

            // Callback for parent component
            onTenantSwitch?.(subdomain);

            // Redirect to tenant admin dashboard
            const tenantAppUrl = process.env.NEXT_PUBLIC_TENANT_APP_URL || 'http://localhost:3001';
            const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3001';

            // Construct the public URL for the tenant admin dashboard
            const host = `${subdomain}.${rootDomain}`;
            const targetUrl = new URL(`/en/admin/login`, `http://${host}`);
            targetUrl.searchParams.set('token', token);

            console.log(`[TenantList] Redirecting to: ${targetUrl.toString()}`);
            window.location.href = targetUrl.toString();

        } catch (err: any) {
            console.error('Failed to switch tenant:', err);
            alert(err.message || 'Failed to switch to tenant admin');
        } finally {
            setSwitchingTenant(null);
        }
    }

    function getTenantUrl(tenant: Tenant): string {
        // Construct the tenant URL
        const baseUrl = process.env.NEXT_PUBLIC_TENANT_DOMAIN || 'localhost:3001';
        return `http://${tenant.subdomain}.${baseUrl}`;
    }

    function getStatusBadgeClass(status: Tenant['status']): string {
        switch (status) {
            case 'active':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
            case 'suspended':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    function getDatabaseStatusIcon(status: Tenant['database_status']) {
        switch (status) {
            case 'ready':
                return <span className="text-emerald-500">●</span>;
            case 'creating':
                return <Loader2 className="h-3 w-3 animate-spin text-yellow-500" />;
            case 'failed':
                return <span className="text-red-500">●</span>;
            default:
                return null;
        }
    }

    if (isLoading) {
        return (
            <div className="bg-card rounded-lg border shadow-sm p-8">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t('loading') || 'Loading...'}</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-card rounded-lg border shadow-sm p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                    <Button variant="outline" onClick={fetchTenants} size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        {t('retry') || 'Retry'}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 font-medium">{t('table.id')}</th>
                            <th className="px-6 py-3 font-medium">{t('table.site')}</th>
                            <th className="px-6 py-3 font-medium">{t('table.status') || 'Status'}</th>
                            <th className="px-6 py-3 font-medium">{t('table.database') || 'Database'}</th>
                            <th className="px-6 py-3 font-medium">{t('table.browse')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {tenants.length > 0 ? (
                            tenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{tenant.id}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 tracking-wide">
                                            {getTenantUrl(tenant)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(tenant.status)}`}>
                                            {tenant.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            {getDatabaseStatusIcon(tenant.database_status)}
                                            <span className="capitalize">{tenant.database_status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                size="sm"
                                                className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0 shadow-sm rounded-full px-6 transition-all hover:scale-105"
                                                onClick={() => {
                                                    const url = getTenantUrl(tenant);
                                                    window.open(url, '_blank');
                                                }}
                                                disabled={tenant.database_status && tenant.database_status !== 'ready'}
                                            >
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                {t('table.visit') || 'Visit Website'}
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-sky-500 hover:bg-sky-600 text-white border-0 shadow-sm rounded-full px-6 transition-all hover:scale-105"
                                                onClick={() => {
                                                    // Use subdomain if available, otherwise use id (fallback for backend responses)
                                                    const sub = tenant.subdomain || (typeof tenant.id === 'string' ? tenant.id : '');
                                                    if (sub) handleTenantSwitch(sub);
                                                    else alert("Could not determine tenant subdomain");
                                                }}
                                                disabled={switchingTenant === tenant.subdomain || (tenant.database_status && tenant.database_status !== 'ready')}
                                            >
                                                {switchingTenant === tenant.subdomain ? (
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                ) : (
                                                    <LogIn className="h-4 w-4 mr-2" />
                                                )}
                                                {t('table.login_admin') || 'Login as super admin'}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-6 py-4" colSpan={5}>
                                    <div className="text-center py-4 text-muted-foreground">
                                        {t('table.no_websites')}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
