import { customerAuthAxios } from '@/lib/auth/axios';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import AmenitiesClient from './AmenitiesClient';
import { AmenitiesResponse } from './types';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function AmenitiesPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const authToken = await getCustomerAuthCookie();

    let data: AmenitiesResponse['data'] = [];
    let meta: AmenitiesResponse['meta'] = {
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

        const response = await customerAuthAxios.get<AmenitiesResponse>(`/tenant/${subdomain}/admin/realestate/amenities`);

        if (response.data && response.data.data) {
            data = response.data.data;
            meta = response.data.meta;
        }
    } catch (error) {
        console.error('Error fetching amenities:', error);
    }

    return (
        <AmenitiesClient
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={domain}
            authToken={authToken}
        />
    );
}
