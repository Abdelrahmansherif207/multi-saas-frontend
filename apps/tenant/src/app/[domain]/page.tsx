import { getTenantData } from '../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../lib/theme-registry';

export default async function TenantHomePage({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    const { tenant, hero, properties } = getTenantData(domain);

    // Resolve the theme from registry
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    if (!Theme) {
        return <div>Theme not found: {themeName}</div>;
    }

    return (
        <>
            <Theme.HeroSection
                title={hero.title}
                subtitle={hero.subtitle}
                backgroundImage={hero.backgroundImage}
            />
            <Theme.PropertyGrid properties={properties} columns={3} />
        </>
    );
}
