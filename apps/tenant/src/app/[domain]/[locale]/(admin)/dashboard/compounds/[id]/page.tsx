import { customerAuthAxios } from '@/lib/auth/axios';
import { Compound } from '../types';
import { Card } from '@/components/admin/ui/Card';
import { AdminPageHeader } from '@/components/admin';
import Link from 'next/link';
import { ActionButton } from '@/components/admin/ui';
import { Edit } from 'lucide-react';

interface PageProps {
    params: Promise<{
        domain: string;
        locale: string;
        id: string;
    }>;
}

export default async function CompoundDetailPage(props: PageProps) {
    const params = await props.params;
    const { locale, domain, id } = params;
    const isRTL = locale === 'ar';

    let compound: Compound | null = null;

    try {
        let subdomain = domain;
        if (domain.includes('.')) {
            subdomain = domain.split('.')[0];
        }

        const response = await customerAuthAxios.get<{ data: Compound }>(`/tenant/${subdomain}/admin/realestate/compounds/${id}`);
        compound = response.data?.data;
    } catch (error) {
        console.error('Error fetching compound:', error);
    }

    if (!compound) {
        return (
            <div className="space-y-6">
                <AdminPageHeader
                    title={isRTL ? 'المجمع غير موجود' : 'Compound Not Found'}
                    breadcrumbs={[
                        { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                        { label: isRTL ? 'المجمعات السكنية' : 'Compounds', href: `/${locale}/dashboard/compounds` },
                    ]}
                    locale={locale}
                />
                <Card>
                    <p className="text-slate-600 dark:text-slate-400">
                        {isRTL ? 'المجمع المطلوب غير موجود' : 'The requested compound was not found'}
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminPageHeader
                title={compound.name}
                description={compound.slug}
                breadcrumbs={[
                    { label: isRTL ? 'لوحة التحكم' : 'Dashboard', href: `/${locale}/dashboard` },
                    { label: isRTL ? 'المجمعات السكنية' : 'Compounds', href: `/${locale}/dashboard/compounds` },
                    { label: compound.name },
                ]}
                actions={
                    <Link href={`/${locale}/dashboard/compounds/${id}/edit`}>
                        <ActionButton variant="primary" icon={<Edit className="w-4 h-4" />}>
                            {isRTL ? 'تعديل' : 'Edit'}
                        </ActionButton>
                    </Link>
                }
                locale={locale}
            />

            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                            {isRTL ? 'الاسم' : 'Name'}
                        </h3>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">{compound.name}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                            {isRTL ? 'الرابط' : 'Slug'}
                        </h3>
                        <p className="text-sm font-mono text-slate-600 dark:text-slate-400">{compound.slug}</p>
                    </div>

                    {compound.area && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                {isRTL ? 'المنطقة' : 'Area'}
                            </h3>
                            <p className="text-slate-900 dark:text-white">{compound.area.name}</p>
                        </div>
                    )}

                    {compound.developer && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                {isRTL ? 'المطور' : 'Developer'}
                            </h3>
                            <p className="text-slate-900 dark:text-white">{compound.developer.name}</p>
                        </div>
                    )}

                    {compound.construction_status && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                {isRTL ? 'حالة الإنشاء' : 'Construction Status'}
                            </h3>
                            <p className="capitalize text-slate-900 dark:text-white">{compound.construction_status.replace('_', ' ')}</p>
                        </div>
                    )}

                    {compound.total_units && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                {isRTL ? 'عدد الوحدات' : 'Total Units'}
                            </h3>
                            <p className="text-slate-900 dark:text-white">{compound.total_units}</p>
                        </div>
                    )}

                    {compound.min_price && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                {isRTL ? 'أقل سعر' : 'Min Price'}
                            </h3>
                            <p className="text-slate-900 dark:text-white">{compound.min_price}</p>
                        </div>
                    )}

                    {compound.max_price && (
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                {isRTL ? 'أعلى سعر' : 'Max Price'}
                            </h3>
                            <p className="text-slate-900 dark:text-white">{compound.max_price}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                            {isRTL ? 'منشور' : 'Published'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            compound.is_published
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                            {compound.is_published ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                            {isRTL ? 'مميز' : 'Featured'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            compound.is_featured
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                            {compound.is_featured ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}
                        </span>
                    </div>
                </div>

                {compound.description && (
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                            {isRTL ? 'الوصف' : 'Description'}
                        </h3>
                        <p className="text-slate-900 dark:text-white whitespace-pre-wrap">{compound.description}</p>
                    </div>
                )}

                {compound.address && (
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                            {isRTL ? 'العنوان' : 'Address'}
                        </h3>
                        <p className="text-slate-900 dark:text-white">{compound.address}</p>
                    </div>
                )}

                {(compound.latitude || compound.longitude) && (
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        {compound.latitude && (
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                    {isRTL ? 'خط العرض' : 'Latitude'}
                                </h3>
                                <p className="text-slate-900 dark:text-white font-mono">{compound.latitude}</p>
                            </div>
                        )}
                        {compound.longitude && (
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                                    {isRTL ? 'خط الطول' : 'Longitude'}
                                </h3>
                                <p className="text-slate-900 dark:text-white font-mono">{compound.longitude}</p>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}
