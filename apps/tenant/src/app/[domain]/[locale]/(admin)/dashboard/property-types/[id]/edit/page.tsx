import { customerAuthAxios } from '@/lib/auth/axios';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/layout';
import { PropertyTypeForm } from '@/components/admin/property-types';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { PropertyType } from '../../types';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function EditPropertyTypePage({ params }: PageProps) {
    const { locale, domain, id } = await params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    let propertyType: PropertyType | null = null;

    try {
        const response = await customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/property-types/${id}`);
        if (response.data?.data) {
            propertyType = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching property type:', error);
    }

    if (!propertyType) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'تعديل نوع العقار' : 'Edit Property Type'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'أنواع العقارات' : 'Property Types', href: `/${locale}/dashboard/property-types` },
                    { label: propertyType.name, href: `/${locale}/dashboard/property-types/${id}` },
                    { label: isRTL ? 'تعديل' : 'Edit' },
                ]}
                locale={locale}
            />

            <PropertyTypeForm
                propertyType={propertyType}
                locale={locale}
                mode="edit"
                subdomain={subdomain}
                authToken={authToken}
            />
        </div>
    );
}
