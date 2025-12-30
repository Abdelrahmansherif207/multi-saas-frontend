import { notFound } from 'next/navigation';
import { getTenantData } from '../../../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../../../lib/theme-registry';

export default async function PropertyDetailRoute({
    params,
}: {
    params: Promise<{ domain: string; locale: string; slug: string }>;
}) {
    const { domain, slug } = await params;
    const { tenant } = getTenantData(domain);

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
    return <PageComponent tenant={tenant} slug={slug} />;
}
