import { customerAuthAxios } from '@/lib/auth/axios';
import { AreasResponse } from './types';
import AreasClient from './AreasClient';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function AreasPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const authToken = await getCustomerAuthCookie();

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
    let stats: any = null;

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const [areasResponse, statsResponse] = await Promise.all([
            customerAuthAxios.get<AreasResponse>(`/tenant/${subdomain}/admin/realestate/areas`),
            customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/areas/statistics`)
        ]);

        if (areasResponse.data?.data) {
            data = areasResponse.data.data;
            meta = areasResponse.data.meta;
        }

        if (statsResponse.data?.data) {
            stats = statsResponse.data.data;
        }
    } catch (error) {
        console.error('Error fetching areas data:', error);
    }

    return (
        <AreasClient
            initialData={data}
            meta={meta}
            stats={stats}
            locale={locale}
            subdomain={params.domain}
            authToken={authToken}
        />
    );
}
