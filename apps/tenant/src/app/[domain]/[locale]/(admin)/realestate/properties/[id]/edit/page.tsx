import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '../../../../../../../../components/admin/layout';
import { PropertyForm } from '../../../../../../../../components/admin/properties';
import { getPropertyById } from '../../../../../../../../mocks/admin/properties';

export default async function EditPropertyPage({
    params,
}: {
    params: Promise<{ domain: string; locale: string; id: string }>;
}) {
    const { locale, id } = await params;
    const t = await getTranslations('Admin.properties');
    const isRTL = locale === 'ar';

    const property = getPropertyById(id);

    if (!property) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={t('editProperty')}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/realestate` },
                    { label: t('title'), href: `/${locale}/realestate/properties` },
                    { label: property.name, href: `/${locale}/realestate/properties/${id}` },
                    { label: t('editProperty') },
                ]}
                locale={locale}
            />

            <PropertyForm property={property} locale={locale} mode="edit" />
        </div>
    );
}
