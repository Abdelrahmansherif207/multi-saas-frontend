import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PropertyCardDetail } from '../../../../../../../components/admin/properties';
import { getPropertyById } from '../../../../../../../mocks/admin/properties';

export default async function PropertyDetailPage({
    params,
}: {
    params: Promise<{ domain: string; locale: string; id: string }>;
}) {
    const { locale, id } = await params;
    const t = await getTranslations('Admin.properties');

    const property = getPropertyById(id);

    if (!property) {
        notFound();
    }

    return (
        <div>
            <PropertyCardDetail property={property} locale={locale} />
        </div>
    );
}
