import { customerAuthAxios } from '@/lib/auth/axios';
import DevelopersClient from './DevelopersClient';
import { DevelopersResponse } from './types';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function DevelopersPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;

    // Fetch data directly from API
    let data: DevelopersResponse['data'] = [];
    let meta: DevelopersResponse['meta'] = {
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

        const response = await customerAuthAxios.get<DevelopersResponse>(`/tenant/${subdomain}/admin/realestate/developers`);

        if (response.data && response.data.data) {
            data = response.data.data;
            meta = response.data.meta;
        }
    } catch (error) {
        console.error('Error fetching developers:', error);
    }

    return (
        <DevelopersClient
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={params.domain}
        />
    );
}
