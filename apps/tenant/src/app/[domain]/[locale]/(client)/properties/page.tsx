import { notFound } from 'next/navigation';
import { getTenantData } from '../../../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../../../lib/theme-registry';

export default async function PropertiesRoute({
    params,
}: {
    params: Promise<{ domain: string; locale: string }>;
}) {
    const { domain, locale } = await params;
    const { tenant, properties } = getTenantData(domain);

    // Resolve Theme
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    // Resolve Page Component
    const PageComponent = Theme?.Pages?.PropertiesListPage;

    // Handle Unsupported Routes
    if (!PageComponent) {
        return notFound();
    }

    // Delegate Rendering
    return <PageComponent tenant={tenant} properties={properties} />;
}
