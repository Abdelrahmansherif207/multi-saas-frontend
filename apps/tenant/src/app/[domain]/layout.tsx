import { getTenantData } from '../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../lib/theme-registry';

export default async function DomainLayout({
    params,
    children,
}: {
    params: Promise<{ domain: string }>;
    children: React.ReactNode;
}) {
    const { domain } = await params;
    const { tenant, menu } = getTenantData(domain);

    // Resolve the theme from registry
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    if (!Theme) {
        return <div className="p-10 text-center">Theme configuration error: {themeName} not found</div>;
    }

    return (
        <Theme.Layout config={tenant} menu={menu}>
            {children}
        </Theme.Layout>
    );
}
