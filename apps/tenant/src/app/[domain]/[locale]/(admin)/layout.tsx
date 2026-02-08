import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AdminLayout } from '../../../../components/admin/layout';
import { getCustomerAuthCookie } from '@/lib/auth/cookies';

export default async function AdminLayoutWrapper({
    params,
    children,
}: {
    params: Promise<{ domain: string; locale: string }>;
    children: React.ReactNode;
}) {
    const { locale } = await params;

    // Check authentication
    const authToken = await getCustomerAuthCookie();

    if (!authToken) {
        // Show not found page if not authenticated
        notFound();
    }

    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider messages={messages}>
            <AdminLayout locale={locale}>
                {children}
            </AdminLayout>
        </NextIntlClientProvider>
    );
}