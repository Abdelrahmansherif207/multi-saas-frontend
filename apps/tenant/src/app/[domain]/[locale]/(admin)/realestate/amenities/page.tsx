import { customerAuthAxios } from '@/lib/auth/axios';
import { AmenitiesResponse } from './types';
import AmenitiesClient from './AmenitiesClient';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function AmenitiesPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;

    // Fetch data directly from API
    let data: AmenitiesResponse['data'] = [];
    let meta: Meta = {
        current_page: 1,
        from: null,
        last_page: 1,
        links: [],
        path: '',
        per_page: 100,
        to: null,
        total: 0
    };

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<AmenitiesResponse>(`/tenant/${subdomain}/admin/realestate/amenities`);

        if (response.data && response.data.data) {
            data = response.data.data;
            // Handle meta if it exists, otherwise default
            if (response.data.meta) {
                meta = response.data.meta;
            } else {
                meta.total = data.length;
                meta.to = data.length;
                meta.from = 1;
            }
        }
    } catch (error) {
        console.error('Error fetching amenities:', error);
    }

    return (
        <AmenitiesClient
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={params.domain}
        />
    );
}
