import { customerAuthAxios } from '@/lib/auth/axios';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/layout';
import { PropertyDetailView } from '@/components/admin/properties';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function ViewPropertyPage({ params }: PageProps) {
    const { locale, domain, id } = await params;
    const t = await getTranslations('Admin.properties');
    const isRTL = locale === 'ar';

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
    } catch {
        // Property fetch failed
    }

    if (!property) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={property.title}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: t('title'), href: `/${locale}/realestate/properties` },
                    { label: property.title },
                ]}
                locale={locale}
            />

            <PropertyDetailView property={property} locale={locale} />
        </div>
    );
}
