import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin';
import { ActionButton } from '@/components/admin/ui';
import { DeveloperDetailView } from '@/components/admin/developers';
import { customerAuthAxios } from '@/lib/auth/axios';
import { Developer } from '../../types';
import { Edit } from 'lucide-react';

interface PageProps {
    params: Promise<{ domain: string; locale: string; id: string }>;
}

export default async function ViewDeveloperPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain, id } = params;
    const isRTL = locale === 'ar';

    let developer: Developer | undefined;

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<{ data: Developer }>(`/tenant/${subdomain}/admin/realestate/developers/${id}`);
        if (response.data?.data) {
            developer = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching developer:', error);
    }

    if (!developer) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">{isRTL ? 'المطور غير موجود' : 'Developer not found'}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={developer.name}
                description={developer.slug}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المطورين' : 'Developers', href: `/${locale}/dashboard/developers` },
                    { label: developer.name },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/developers/${id}/edit`}>
                        <ActionButton variant="primary" icon={<Edit className="w-4 h-4" />}>
                            {isRTL ? 'تعديل' : 'Edit'}
                        </ActionButton>
                    </Link>
                }
                locale={locale}
            />

            <DeveloperDetailView
                developer={developer}
                locale={locale}
            />
        </div>
    );
}
