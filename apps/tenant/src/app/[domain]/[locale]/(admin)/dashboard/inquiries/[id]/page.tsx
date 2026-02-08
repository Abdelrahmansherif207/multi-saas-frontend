import { AdminPageHeader } from '@/components/admin';
import { InquiryDetailView } from '@/components/admin/inquiries';
import { customerAuthAxios } from '@/lib/auth/axios';
import { Inquiry } from '../types';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function ViewInquiryPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain, id } = params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let inquiry: Inquiry | undefined;
    let subdomain = domain;

    try {
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<{ data: Inquiry }>(`/tenant/${subdomain}/admin/realestate/inquiries/${id}`);
        if (response.data?.data) {
            inquiry = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching inquiry:', error);
    }

    if (!inquiry) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">{isRTL ? 'الطلب غير موجود' : 'Inquiry not found'}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? `طلب #${inquiry.id}` : `Inquiry #${inquiry.id}`}
                description={inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString(locale) : ''}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'الطلبات' : 'Inquiries', href: `/${locale}/dashboard/inquiries` },
                    { label: `#${inquiry.id}` },
                ]}
                locale={locale}
            />

            <InquiryDetailView
                inquiry={inquiry}
                locale={locale}
                subdomain={params.domain}
                authToken={authToken}
            />
        </div>
    );
}
