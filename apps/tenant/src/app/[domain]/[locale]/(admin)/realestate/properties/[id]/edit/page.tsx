import { customerAuthAxios } from '@/lib/auth/axios';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/layout';
import { PropertyForm } from '@/components/admin/properties';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
    const { locale, domain, id } = await params;
    const t = await getTranslations('Admin.properties');
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    let property = null;

    try {
        const response = await customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/properties/${id}`);
        if (response.data?.data) {
            property = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching property:', error);
    }

    if (!property) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('editProperty')}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: t('title'), href: `/${locale}/realestate/properties` },
                    { label: property.title, href: `/${locale}/realestate/properties/${id}` },
                    { label: t('editProperty') },
                ]}
                locale={locale}
            />

            <PropertyForm
                property={property}
                locale={locale}
                mode="edit"
                subdomain={subdomain}
                authToken={authToken}
            />
        </div>
    );
}
