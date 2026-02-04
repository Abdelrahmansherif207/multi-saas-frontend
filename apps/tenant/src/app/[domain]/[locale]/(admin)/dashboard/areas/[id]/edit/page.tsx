import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/layout';
import { AreaForm } from '@/components/admin/areas';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { customerAuthAxios } from '@/lib/auth/axios';
import { Area } from '../../types';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function EditAreaPage({ params }: PageProps) {
    const { locale, domain, id } = await params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    let area: Area | null = null;

    try {
        const response = await customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/areas/${id}`);
        if (response.data?.data) {
            area = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching area:', error);
    }

    if (!area) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'تعديل منطقة' : 'Edit Area'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المناطق' : 'Areas', href: `/${locale}/dashboard/areas` },
                    { label: area.name, href: `/${locale}/dashboard/areas/${id}` },
                    { label: isRTL ? 'تعديل' : 'Edit' },
                ]}
                locale={locale}
            />

            <AreaForm
                area={area}
                locale={locale}
                mode="edit"
                subdomain={subdomain}
                authToken={authToken}
            />
        </div>
    );
}
