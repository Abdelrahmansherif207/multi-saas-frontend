import { AdminPageHeader } from '@/components/admin';
import { DeveloperForm } from '@/components/admin/developers';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function CreateDeveloperPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'إضافة مطور' : 'Add Developer'}
                description={isRTL ? 'إضافة مطور عقاري جديد' : 'Add a new real estate developer'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المطورين' : 'Developers', href: `/${locale}/dashboard/developers` },
                    { label: isRTL ? 'إضافة' : 'Add' },
                ]}
                locale={locale}
            />

            <DeveloperForm
                locale={locale}
                mode="create"
                authToken={authToken}
            />
        </div>
    );
}
