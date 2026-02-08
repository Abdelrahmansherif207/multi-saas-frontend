import { CompoundForm } from '@/components/admin/compounds';
import { Card } from '@/components/admin/ui/Card';
import { AdminPageHeader } from '@/components/admin';
import { Compound } from '../../types';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import axios from 'axios';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
        id: string;
    }>;
}

export default async function EditCompoundPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain, id } = params;
    const isRTL = locale === 'ar';

    let compound: Compound | null = null;
    let areas: { id: number; name: string }[] = [];
    let developers: { id: number; name: string }[] = [];
    let authToken: string | null = null;

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        authToken = await getCustomerAuthCookie();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        if (subdomain) {
            headers['X-Tenant-ID'] = subdomain;
        }

        const apiBase = process.env.NEXT_PUBLIC_API_URL;

        const [compoundRes, areasRes, devsRes] = await Promise.all([
            axios.get(`${apiBase}/tenant/${subdomain}/admin/realestate/compounds/${id}`, { headers }),
            axios.get(`${apiBase}/tenant/${subdomain}/admin/realestate/areas`, { headers }),
            axios.get(`${apiBase}/tenant/${subdomain}/admin/realestate/developers`, { headers })
        ]);

        compound = compoundRes.data?.data || null;
        areas = areasRes.data?.data || [];
        developers = devsRes.data?.data || [];
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    if (!compound) {
        return (
            <div className="space-y-6">
                <AdminPageHeader
                    title={isRTL ? 'المجمع غير موجود' : 'Compound Not Found'}
                    breadcrumbs={[
                        { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                        { label: isRTL ? 'المجمعات السكنية' : 'Compounds', href: `/${locale}/dashboard/compounds` },
                    ]}
                    locale={locale}
                />
                <Card>
                    <p className="text-slate-600 dark:text-slate-400">
                        {isRTL ? 'المجمع المطلوب غير موجود' : 'The requested compound was not found'}
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'تعديل المجمع' : 'Edit Compound'}
                description={compound.name || ''}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المجمعات السكنية' : 'Compounds', href: `/${locale}/dashboard/compounds` },
                    { label: compound.name || (isRTL ? 'تعديل' : 'Edit') },
                ]}
                locale={locale}
            />

            <Card>
                <CompoundForm
                    compound={compound}
                    locale={locale}
                    mode="edit"
                    subdomain={domain}
                    authToken={authToken}
                    areas={areas}
                    developers={developers}
                />
            </Card>
        </div>
    );
}
