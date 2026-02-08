import { getTranslations } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin';
import { PropertyForm } from '@/components/admin/properties';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function CreatePropertyPage({ params }: PageProps) {
    const { locale, domain } = await params;
    const t = await getTranslations('Admin.properties');
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('createProperty')}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: t('title'), href: `/${locale}/realestate/properties` },
                    { label: t('createProperty') },
                ]}
                locale={locale}
            />

            <PropertyForm locale={locale} mode="create" subdomain={subdomain} authToken={authToken} />
        </div>
    );
}
