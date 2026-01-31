import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AdminLayout } from '../../../../components/admin/layout';

export default async function AdminLayoutWrapper({
    params,
    children,
}: {
    params: Promise<{ domain: string; locale: string }>;
    children: React.ReactNode;
}) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider messages={messages}>
            <AdminLayout locale={locale}>
                {children}
            </AdminLayout>
        </NextIntlClientProvider>
    );
}