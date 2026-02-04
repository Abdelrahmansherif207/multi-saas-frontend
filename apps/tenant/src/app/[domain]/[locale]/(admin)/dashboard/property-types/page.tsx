import { customerAuthAxios } from '@/lib/auth/axios';
import { PropertyTypesResponse } from './types';
import PropertyTypesClient from './PropertyTypesClient';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function PropertyTypesPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const authToken = await getCustomerAuthCookie();

    // Fetch data directly from API
    let data: PropertyTypesResponse['data'] = [];

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<PropertyTypesResponse>(`/tenant/${subdomain}/admin/realestate/property-types`);

        if (response.data && response.data.data) {
            data = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching property types:', error);
    }

    return (
        <PropertyTypesClient
            initialData={data}
            locale={locale}
            subdomain={params.domain}
            authToken={authToken}
        />
    );
}

