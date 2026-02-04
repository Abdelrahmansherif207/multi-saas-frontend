import { customerAuthAxios } from '@/lib/auth/axios';
import { InquiriesResponse } from './types';
import InquiriesClient from './InquiriesClient';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function InquiriesPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;

    // Fetch data directly from API
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

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<InquiriesResponse>(`/tenant/${subdomain}/admin/realestate/inquiries`);

        if (response.data && response.data.data) {
            data = response.data.data;
            meta = response.data.meta;
        }
    } catch (error) {
        console.error('Error fetching inquiries:', error);
    }

    return (
        <InquiriesClient
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={params.domain}
        />
    );
}
