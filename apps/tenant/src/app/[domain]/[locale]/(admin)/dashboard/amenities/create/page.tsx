import { AdminPageHeader } from '@/components/admin';
import { AmenityForm } from '@/components/admin/amenities';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { Card } from '@/components/admin/ui/Card';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function CreateAmenityPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'إضافة مرفق' : 'Add Amenity'}
                description={isRTL ? 'إضافة مرفق جديد' : 'Add a new amenity'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المرافق' : 'Amenities', href: `/${locale}/dashboard/amenities` },
                    { label: isRTL ? 'إضافة' : 'Add' },
                ]}
                locale={locale}
            />

            <Card>
                <AmenityForm
                    locale={locale}
                    mode="create"
                    subdomain={domain}
                    authToken={authToken}
                />
            </Card>
        </div>
    );
}
