import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin';
import { ActionButton } from '@/components/admin/ui';
import { AmenityDetailView } from '@/components/admin/amenities';
import { customerAuthAxios } from '@/lib/auth/axios';
import { Amenity } from '../../types';
import { Edit } from 'lucide-react';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function ViewAmenityPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain, id } = params;
    const isRTL = locale === 'ar';

    let amenity: Amenity | undefined;

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<{ data: Amenity }>(`/tenant/${subdomain}/admin/realestate/amenities/${id}`);
        if (response.data?.data) {
            amenity = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching amenity:', error);
    }

    if (!amenity) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">{isRTL ? 'المرفق غير موجود' : 'Amenity not found'}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={amenity.name}
                description={amenity.slug}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المرافق' : 'Amenities', href: `/${locale}/dashboard/amenities` },
                    { label: amenity.name },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/amenities/${id}/edit`}>
                        <ActionButton variant="primary" icon={<Edit className="w-4 h-4" />}>
                            {isRTL ? 'تعديل' : 'Edit'}
                        </ActionButton>
                    </Link>
                }
                locale={locale}
            />

            <AmenityDetailView
                amenity={amenity}
                locale={locale}
            />
        </div>
    );
}
