import { getTranslations } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/layout';
import { PropertyForm } from '@/components/admin/properties';

export default async function CreatePropertyPage({
    params,
}: {
    params: Promise<{ domain: string; locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations('Admin.properties');
    const isRTL = locale === 'ar';

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('createProperty')}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: t('title'), href: `/${locale}/realestate/properties` },
                    { label: t('createProperty') },
                ]}
                locale={locale}
            />

            <PropertyForm locale={locale} mode="create" />
        </div>
    );
}
