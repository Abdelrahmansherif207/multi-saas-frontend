import { getTranslations } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/layout';
import { AreaForm } from '@/components/admin/areas';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function CreateAreaPage({ params }: PageProps) {
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
                title={isRTL ? 'إضافة منطقة' : 'Create Area'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المناطق' : 'Areas', href: `/${locale}/dashboard/areas` },
                    { label: isRTL ? 'إضافة منطقة' : 'Create Area' },
                ]}
                locale={locale}
            />

            <AreaForm locale={locale} mode="create" subdomain={subdomain} authToken={authToken} />
        </div>
    );
}
