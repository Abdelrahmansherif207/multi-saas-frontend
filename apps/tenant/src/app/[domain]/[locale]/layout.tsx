import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function DomainLayout({
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
            {children}
        </NextIntlClientProvider>
    );
}
