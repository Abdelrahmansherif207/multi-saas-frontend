import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getTenantData } from '../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../lib/theme-registry';
import { tenantService } from '../../../lib/services/tenant';

export default async function DomainLayout({
    params,
    children,
}: {
    params: Promise<{ domain: string; locale: string }>;
    children: React.ReactNode;
}) {
    const { domain, locale } = await params;

    // Fetch real tenant info from API
    const tenantInfo = await tenantService.getInfo(domain);

    const { tenant: mockTenant, menu } = getTenantData(domain);

    const messages = await getMessages({ locale });

    // Use theme from API with fallback to mock or 'real-estate'
    const themeName = (tenantInfo?.data.settings.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    // Construct final tenant config using API data + mock fallbacks
    const tenantConfig = {
        ...mockTenant,
        id: tenantInfo?.data.tenant_id || mockTenant.id,
        theme: themeName,
        primaryColor: tenantInfo?.data.settings.theme_code || mockTenant.primaryColor,
    };

    if (!Theme) {
        return <div className="p-10 text-center">Theme configuration error: {themeName} not found</div>;
    }

    // Localization Data
    const localization = {
        currentLocale: locale,
        availableLocales: [
            { code: 'en', label: 'English', href: `/${domain}/en` },
            { code: 'ar', label: 'العربية', href: `/${domain}/ar` }
        ]
    };

    // Dynamic and Translated Menu
    const translatedMenu = menu.map(item => {
        const key = item.label.toLowerCase() as keyof typeof messages.Menu;
        return {
            ...item,
            label: (messages as any).Menu?.[key] || item.label,
            href: `/${domain}/${locale}${item.href === '/' ? '' : item.href}`
        };
    });

    return (
        <NextIntlClientProvider messages={messages}>
            <Theme.Layout config={tenantConfig as any} menu={translatedMenu} localization={localization} translations={messages as any}>
                {children}
            </Theme.Layout>
        </NextIntlClientProvider>
    );
}
