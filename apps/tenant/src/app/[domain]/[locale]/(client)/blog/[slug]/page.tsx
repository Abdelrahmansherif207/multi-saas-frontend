import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { getTenantData } from '@/mocks/real-estate';
import { ThemeRegistry, ThemeType } from '@/lib/theme-registry';

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ domain: string; locale: string; slug: string }>;
}) {
    const { domain, locale, slug } = await params;
    const { tenant } = getTenantData(domain);

    if (!tenant) {
        notFound();
    }

    const messages = await getMessages({ locale });

    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    if (!Theme || !Theme.Pages.BlogDetailPage) {
        notFound();
    }

    const BlogDetailPageComponent = Theme.Pages.BlogDetailPage;

    return (
        <BlogDetailPageComponent
            tenant={tenant}
            domain={domain}
            slug={slug}
            translations={messages as any}
        />
    );
}
