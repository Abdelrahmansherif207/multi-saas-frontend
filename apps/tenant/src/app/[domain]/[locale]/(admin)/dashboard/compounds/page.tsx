import { customerAuthAxios } from '@/lib/auth/axios';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { CompoundsResponse, Meta } from './types';
import CompoundsClient from './CompoundsClient';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
    }>;
}

export default async function CompoundsPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain } = params;
    const authToken = await getCustomerAuthCookie();

    // Fetch data directly from API
    let data: CompoundsResponse['data'] = [];
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

        const response = await customerAuthAxios.get<CompoundsResponse>(`/tenant/${subdomain}/admin/realestate/compounds`);

        if (response.data && response.data.data) {
            data = response.data.data;
            const rawMeta = response.data.meta;

            // Adapt RawMeta (arrays) to Meta (numbers)
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
        // Handle error silently
    }

    return (
        <CompoundsClient
            initialData={data}
            meta={meta}
            locale={locale}
            subdomain={params.domain}
            authToken={authToken}
        />
    );
}
