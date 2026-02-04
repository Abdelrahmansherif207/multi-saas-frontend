import { customerAuthAxios } from '@/lib/auth/axios';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/layout';
import { PropertyTypeDetailView } from '@/components/admin/property-types';
import { PropertyType } from '../types';
import Link from 'next/link';
import { ActionButton } from '@/components/admin/ui';
import { Edit } from 'lucide-react';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function ViewPropertyTypePage({ params }: PageProps) {
    const { locale, domain, id } = await params;
    const isRTL = locale === 'ar';

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    console.log('[ViewPropertyTypePage] subdomain:', subdomain, 'id:', id);

    let propertyType: PropertyType | null = null;

    try {
        const response = await customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/property-types/${id}`);
        console.log('[ViewPropertyTypePage] API response:', response.data);
        if (response.data?.data) {
            propertyType = response.data.data;
        }
    } catch (error) {
        console.error('[ViewPropertyTypePage] API error:', error);
    }

    if (!propertyType) {
        console.log('[ViewPropertyTypePage] Property type not found, calling notFound()');
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={propertyType.name}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'أنواع العقارات' : 'Property Types', href: `/${locale}/dashboard/property-types` },
                    { label: propertyType.name },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/property-types/${id}/edit`}>
                        <ActionButton variant="primary" icon={<Edit className="w-4 h-4" />}>
                            {isRTL ? 'تعديل' : 'Edit'}
                        </ActionButton>
                    </Link>
                }
                locale={locale}
            />

            <PropertyTypeDetailView propertyType={propertyType} locale={locale} />
        </div>
    );
}
