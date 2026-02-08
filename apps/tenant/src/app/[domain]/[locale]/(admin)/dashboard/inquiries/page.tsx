import { customerAuthAxios } from '@/lib/auth/axios';
import InquiriesClient from './InquiriesClient';
import { InquiriesResponse, StatisticsResponse } from './types';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{ domain: string; locale: string }>;
}

export default async function InquiriesPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const authToken = await getCustomerAuthCookie();

    let data: InquiriesResponse['data'] = [];
    let meta: InquiriesResponse['meta'] = {
        current_page: 1,
        from: 0,
        last_page: 1,
        links: [],
        path: '',
        per_page: 15,
        to: 0,
        total: 0
    };
    let stats = {
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        closed: 0,
        conversion_rate: 0,
        today: 0,
        this_week: 0,
        this_month: 0
    };

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const [listResponse, statsResponse] = await Promise.all([
            customerAuthAxios.get<InquiriesResponse>(`/tenant/${subdomain}/admin/realestate/inquiries`),
            customerAuthAxios.get<StatisticsResponse>(`/tenant/${subdomain}/admin/realestate/inquiries/statistics`)
        ]);

        if (listResponse.data && listResponse.data.data) {
            data = listResponse.data.data;
            meta = listResponse.data.meta;
        }

        if (statsResponse.data && statsResponse.data.data) {
            stats = statsResponse.data.data;
        }
    } catch (error) {
        console.error('Error fetching inquiries:', error);
    }

    return (
        <InquiriesClient
            initialData={data}
            meta={meta}
            stats={stats}
            locale={locale}
            subdomain={params.domain}
            authToken={authToken}
        />
    );
}
