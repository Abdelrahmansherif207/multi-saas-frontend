import { notFound } from 'next/navigation';
import { getTenantData, mockMenu } from '../../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../../lib/theme-registry';
import { getMessages } from 'next-intl/server';
import { ThemeTranslations } from '@repo/themes/real-estate';

export default async function BlogRoute({
    params,
}: {
    params: Promise<{ domain: string; locale: string }>;
}) {
    const { domain, locale } = await params;
    const { tenant } = getTenantData(domain);
    const messages = await getMessages({ locale });
    const translations = messages as unknown as ThemeTranslations;

    // Resolve Theme
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    // Resolve Page Component
    // Accessing BlogPage via explicit check or dynamic access if typed
    // Ideally Theme.Pages.BlogPage exists
    const PageComponent = Theme?.Pages?.BlogPage;

    // Handle Unsupported Routes
    if (!PageComponent) {
        return notFound();
    }

    // Delegate Rendering
    return <PageComponent tenant={tenant} menu={mockMenu} translations={translations} />;
}
