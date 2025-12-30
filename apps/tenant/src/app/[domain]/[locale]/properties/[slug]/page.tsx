import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { getTenantData } from '../../../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../../../lib/theme-registry';
import { PropertyDetailTranslations } from '@repo/themes/real-estate';

export default async function PropertyDetailRoute({
    params,
}: {
    params: Promise<{ domain: string; locale: string; slug: string }>;
}) {
    const { domain, locale, slug } = await params;
    const { tenant } = getTenantData(domain);

    // getMessages loads full JSON, but we extract only needed namespace
    // Note: next-intl tree-shakes unused keys at build time for production
    const messages = await getMessages({ locale });
    const translations = (messages as Record<string, unknown>).PropertyDetail as PropertyDetailTranslations;

    // Resolve Theme
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    // Resolve Page Component
    const PageComponent = Theme?.Pages?.PropertyDetailPage;

    // Handle Unsupported Routes
    if (!PageComponent) {
        return notFound();
    }

    // Delegate Rendering
    return <PageComponent tenant={tenant} slug={slug} translations={translations} />;
}
