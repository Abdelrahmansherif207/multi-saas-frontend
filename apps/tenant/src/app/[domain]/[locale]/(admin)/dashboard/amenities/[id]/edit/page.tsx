import { AdminPageHeader } from '@/components/admin';
import { AmenityForm } from '@/components/admin/amenities';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { customerAuthAxios } from '@/lib/auth/axios';
import { Amenity } from '../../types';
import { Card } from '@/components/admin/ui/Card';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function EditAmenityPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain, id } = params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let amenity: Amenity | undefined;
    let subdomain = domain;

    try {
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
                title={isRTL ? 'تعديل مرفق' : 'Edit Amenity'}
                description={isRTL ? 'تعديل بيانات المرفق' : 'Edit amenity details'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المرافق' : 'Amenities', href: `/${locale}/dashboard/amenities` },
                    { label: amenity.name, href: `/${locale}/dashboard/amenities/${id}` },
                    { label: isRTL ? 'تعديل' : 'Edit' },
                ]}
                locale={locale}
            />

            <Card>
                <AmenityForm
                    amenity={amenity}
                    locale={locale}
                    mode="edit"
                    subdomain={domain}
                    authToken={authToken}
                />
            </Card>
        </div>
    );
}
