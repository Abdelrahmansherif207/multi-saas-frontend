import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/layout';
import { InquiryForm } from '@/components/admin/inquiries/InquiryForm';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';
import { customerAuthAxios } from '@/lib/auth/axios';
import { Inquiry } from '../../types';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function EditInquiryPage({ params }: PageProps) {
    const { locale, domain, id } = await params;
    const isRTL = locale === 'ar';
    const authToken = await getCustomerAuthCookie();

    let subdomain = domain;
    if (domain.includes('.')) {
        subdomain = domain.split('.')[0];
    }

    let inquiry: Inquiry | null = null;

    try {
        const response = await customerAuthAxios.get(`/tenant/${subdomain}/admin/realestate/inquiries/${id}`);
        if (response.data?.data) {
            inquiry = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching inquiry:', error);
    }

    if (!inquiry) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={isRTL ? 'تعديل استفسار' : 'Edit Inquiry'}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'الاستفسارات' : 'Inquiries', href: `/${locale}/dashboard/inquiries` },
                    { label: inquiry.name, href: `/${locale}/dashboard/inquiries/${id}` },
                    { label: isRTL ? 'تعديل' : 'Edit' },
                ]}
                locale={locale}
            />

            <InquiryForm
                inquiry={inquiry}
                locale={locale}
                mode="edit"
                subdomain={subdomain}
                authToken={authToken}
            />
        </div>
    );
}
