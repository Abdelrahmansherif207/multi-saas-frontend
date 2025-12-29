import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getTenantData } from '../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../lib/theme-registry';
// ... imports

export default async function DomainLayout({
    params,
    children,
}: {
    params: Promise<{ domain: string; locale: string }>;
    children: React.ReactNode;
}) {
    const { domain, locale } = await params;
    const { tenant, menu } = getTenantData(domain);

    if (!tenant) {
        notFound();
    }

    const messages = await getMessages({ locale });

    // Resolve the theme from registry
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

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

    return (
        <Theme.Layout config={tenant} menu={menu} localization={localization} translations={messages as any}>
            {children}
        </Theme.Layout>
    );
}
