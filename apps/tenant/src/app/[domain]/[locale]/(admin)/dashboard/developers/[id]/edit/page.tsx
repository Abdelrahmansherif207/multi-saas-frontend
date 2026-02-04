import { AdminPageHeader } from '@/components/admin';
import { DeveloperForm } from '@/components/admin/developers';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { customerAuthAxios } from '@/lib/auth/axios';
import { Developer } from '../../types';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function EditDeveloperPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain, id } = params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let developer: Developer | undefined;
    let subdomain = domain;

    try {
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<{ data: Developer }>(`/tenant/${subdomain}/admin/realestate/developers/${id}`);
        if (response.data?.data) {
            developer = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching developer:', error);
    }

    if (!developer) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">{isRTL ? 'المطور غير موجود' : 'Developer not found'}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'تعديل مطور' : 'Edit Developer'}
                description={isRTL ? 'تعديل بيانات المطور' : 'Edit developer details'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المطورين' : 'Developers', href: `/${locale}/dashboard/developers` },
                    { label: developer.name, href: `/${locale}/dashboard/developers/${id}` },
                    { label: isRTL ? 'تعديل' : 'Edit' },
                ]}
                locale={locale}
            />

            <DeveloperForm
                developer={developer}
                locale={locale}
                mode="edit"
                authToken={authToken}
            />
        </div>
    );
}
