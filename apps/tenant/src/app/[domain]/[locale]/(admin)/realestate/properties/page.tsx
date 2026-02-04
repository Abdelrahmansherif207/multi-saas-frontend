import { customerAuthAxios } from '@/lib/auth/axios';
import { PropertiesResponse, Meta } from './types';
import { getTranslations } from 'next-intl/server';
import PropertiesClient from './PropertiesClient';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function PropertiesListPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const authToken = await getCustomerAuthCookie();

    // Fetch data directly from API
    let data: PropertiesResponse['data'] = [];
    let meta: Meta = {
        current_page: 1,
        from: 0,
        last_page: 1,
        links: [],
        path: '',
        per_page: 15,
        to: 0,
        total: 0
    };

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<PropertiesResponse>(`/tenant/${subdomain}/admin/realestate/properties`);

        if (response.data && response.data.data) {
            data = response.data.data;
            const rawMeta = response.data.meta;

            if (rawMeta) {
                meta = {
                    current_page: Array.isArray(rawMeta.current_page) ? rawMeta.current_page[0] : rawMeta.current_page,
                    from: rawMeta.from,
                    last_page: Array.isArray(rawMeta.last_page) ? rawMeta.last_page[0] : rawMeta.last_page,
                    links: rawMeta.links || [],
                    path: rawMeta.path,
                    per_page: Array.isArray(rawMeta.per_page) ? rawMeta.per_page[0] : rawMeta.per_page,
                    to: rawMeta.to,
                    total: Array.isArray(rawMeta.total) ? rawMeta.total[0] : rawMeta.total,
                };
            }
        }
    } catch (error) {
        console.error('Error fetching properties:', error);
    }

    // const activeFiltersCount = [filterType, filterArea, filterStatus].filter(Boolean).length;

    return (
        <PropertiesClient
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={params.domain}
            authToken={authToken}
        />
    );
}

//   <PropertyModal
//                 isOpen={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setEditingProperty(null);
//                 }}
//                 onSubmit={(data) => {
//                     console.log('Form submitted:', data);
//                     setIsModalOpen(false);
//                     setEditingProperty(null);
//                 }}
//                 mode={editingProperty ? 'edit' : 'create'}
//                 locale={locale}
//                 initialData={editingProperty ? {
//                     name: editingProperty.name,
//                     typeId: editingProperty.typeId,
//                     areaId: editingProperty.areaId,
//                     developerPrice: editingProperty.developerPrice.toString(),
//                     status: editingProperty.status,
//                     images: [
//                         'https://picsum.photos/seed/property1/400/300',
//                         'https://picsum.photos/seed/property2/400/300',
//                         'https://picsum.photos/seed/property3/400/300',
//                         'https://picsum.photos/seed/property4/400/300',
//                     ],
//                 } : undefined}
//                 propertyTypes={mockPropertyTypes.map(t => ({ id: t.id, name: t.name, nameAr: t.nameAr }))}
//                 areas={mockAreas.map(a => ({ id: a.id, name: a.name, nameAr: a.nameAr }))}
//             />