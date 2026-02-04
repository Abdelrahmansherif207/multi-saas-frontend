import { getTranslations } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/layout';
import { PropertyTypeForm } from '@/components/admin/property-types';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function CreatePropertyTypePage({ params }: PageProps) {
    const { locale, domain } = await params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'إضافة نوع عقار' : 'Create Property Type'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'أنواع العقارات' : 'Property Types', href: `/${locale}/dashboard/property-types` },
                    { label: isRTL ? 'إضافة نوع عقار' : 'Create Property Type' },
                ]}
                locale={locale}
            />

            <PropertyTypeForm locale={locale} mode="create" subdomain={subdomain} authToken={authToken} />
        </div>
    );
}
