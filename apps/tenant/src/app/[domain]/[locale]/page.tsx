import { getMessages } from 'next-intl/server';
import { getTenantData } from '../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../lib/theme-registry';

export default async function TenantHomePage({
    params,
}: {
    params: Promise<{ domain: string; locale: string }>;
}) {
    const { domain, locale } = await params;
    const { tenant, hero, properties } = getTenantData(domain);
    const messages = await getMessages({ locale });

    // Resolve the theme from registry
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    if (!Theme) {
        return <div>Theme not found: {themeName}</div>;
    }

    return (
        <>
            <Theme.HeroSection
                {...hero}
                translations={(messages as any).Hero}
            />
            <Theme.PropertyGrid properties={properties} columns={3} />
        </>
    );
}
