import { customerAuthAxios } from '@/lib/auth/axios';
import { AreasResponse } from './types';
import AreasClient from './AreasClient';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function AreasPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;

    // Fetch data directly from API
    let data: AreasResponse['data'] = [];
    let meta: AreasResponse['meta'] = {
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

        const response = await customerAuthAxios.get<AreasResponse>(`/tenant/${subdomain}/admin/realestate/areas`);

        if (response.data && response.data.data) {
            data = response.data.data;
            meta = response.data.meta;
        }
    } catch (error) {
        console.error('Error fetching areas:', error);
    }

    return (
        <AreasClient
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={params.domain}
        />
    );
}
