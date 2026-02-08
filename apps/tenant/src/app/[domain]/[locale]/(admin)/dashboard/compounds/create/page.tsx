import { CompoundForm } from '@/components/admin/compounds';
import { Card } from '@/components/admin/ui/Card';
import { AdminPageHeader } from '@/components/admin';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import axios from 'axios';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function CreateCompoundPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const isRTL = locale === 'ar';

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

        const [areasRes, devsRes] = await Promise.all([
            axios.get(`${apiBase}/tenant/${subdomain}/admin/realestate/areas`, { headers }),
            axios.get(`${apiBase}/tenant/${subdomain}/admin/realestate/developers`, { headers })
        ]);

        areas = areasRes.data?.data || [];
        developers = devsRes.data?.data || [];
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'إضافة مجمع جديد' : 'Create New Compound'}
                description={isRTL ? 'أضف مجمع سكني جديد' : 'Add a new residential compound'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المجمعات السكنية' : 'Compounds', href: `/${locale}/dashboard/compounds` },
                    { label: isRTL ? 'إضافة جديد' : 'Create New' },
                ]}
                locale={locale}
            />

            <Card>
                <CompoundForm
                    locale={locale}
                    mode="create"
                    subdomain={domain}
                    authToken={authToken}
                    areas={areas}
                    developers={developers}
                />
            </Card>
        </div>
    );
}
