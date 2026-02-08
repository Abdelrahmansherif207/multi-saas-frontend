import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/layout';
import { ActionButton } from '@/components/admin/ui';
import { AreaDetailClient } from '@/components/admin/areas';
import { customerAuthAxios } from '@/lib/auth/axios';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { Area } from '../types';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function ViewAreaPage({ params }: PageProps) {
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
                title={area.name}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المناطق' : 'Areas', href: `/${locale}/dashboard/areas` },
                    { label: area.name },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/areas/${id}/edit`}>
                        <ActionButton variant="primary" icon={<Edit className="w-4 h-4" />}>
                            {isRTL ? 'تعديل' : 'Edit'}
                        </ActionButton>
                    </Link>
                }
                locale={locale}
            />

            <AreaDetailClient
                area={area}
                locale={locale}
                subdomain={subdomain}
                areaId={id}
                authToken={authToken}
            />
        </div>
    );
}
