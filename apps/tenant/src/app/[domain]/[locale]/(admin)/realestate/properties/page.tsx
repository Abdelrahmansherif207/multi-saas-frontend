import { customerAuthAxios } from '@/lib/auth/axios';
import { PropertiesResponse, Meta } from './types';
import { getTranslations } from 'next-intl/server';
import PropertiesClient from './PropertiesClient';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropertiesListPage(props: PageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { locale, domain } = params;

    console.log('[PropertiesListPage] searchParams:', searchParams);

    const authToken = await getCustomerAuthCookie();

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    // Prepare filter query
    const queryParams = new URLSearchParams();

    // Helper to get param regardless of bracket format
    const getSearchParam = (key: string) => {
        return searchParams[key] || searchParams[`filter[${key}]`];
    };

    const purpose = getSearchParam('purpose');
    const compound_id = getSearchParam('compound_id');
    const property_type_id = getSearchParam('property_type_id');
    const search = searchParams['search'];

    if (purpose) queryParams.append('filter[purpose]', String(purpose));
    if (compound_id) queryParams.append('filter[compound_id]', String(compound_id));
    if (property_type_id) queryParams.append('filter[property_type_id]', String(property_type_id));
    if (search) queryParams.append('search', String(search));

    // Prepare filter params
    const filterParams: any = {};
    if (purpose) filterParams['filter[purpose]'] = purpose;
    if (compound_id) filterParams['filter[compound_id]'] = compound_id;
    if (property_type_id) filterParams['filter[property_type_id]'] = property_type_id;
    if (search) filterParams['search'] = search;

    console.log('[PropertiesListPage] API Params:', filterParams);

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
    let propertyTypes: any[] = [];
    let compounds: any[] = [];

    try {
        const [propRes, typesRes, compoundsRes] = await Promise.all([
            customerAuthAxios.get<PropertiesResponse>(`/tenant/${subdomain}/admin/realestate/properties`, { params: filterParams }),
            customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/property-types`),
            customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/compounds`)
        ]);

        if (propRes.data && propRes.data.data) {
            data = propRes.data.data;
            console.log('[PropertiesListPage] Property IDs:', data.map(p => p.id));
            const rawMeta = propRes.data.meta;

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

        if (typesRes.data?.data) propertyTypes = typesRes.data.data;
        if (compoundsRes.data?.data) compounds = compoundsRes.data.data;

    } catch (error) {
        console.error('Error fetching properties data:', error);
    }

    return (
        <PropertiesClient
            key={JSON.stringify(filterParams)}
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={subdomain}
            authToken={authToken}
            propertyTypes={propertyTypes}
            compounds={compounds}
            initialFilters={{
                purpose: (searchParams['filter[purpose]'] as string) || '',
                compound_id: (searchParams['filter[compound_id]'] as string) || '',
                property_type_id: (searchParams['filter[property_type_id]'] as string) || '',
                search: (searchParams['search'] as string) || ''
            }}
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