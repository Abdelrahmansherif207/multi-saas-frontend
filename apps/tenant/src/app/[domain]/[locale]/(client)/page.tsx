import { getMessages } from 'next-intl/server';
import { getTenantData } from '../../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../../lib/theme-registry';
import { tenantService } from '../../../../lib/services/tenant';

export default async function TenantHomePage({
    params,
}: {
    params: Promise<{ domain: string; locale: string }>;
}) {
    const { domain, locale } = await params;

    // Fetch real tenant info from API
    const tenantInfo = await tenantService.getInfo(domain);

    const { tenant: mockTenant, hero, properties, compounds, areas, launches } = getTenantData(domain);
    const messages = await getMessages({ locale });

    // Use theme from API with fallback to mock or 'real-estate'
    const themeName = (tenantInfo?.data?.settings?.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    // Construct final tenant config
    const tenantConfig = {
        ...mockTenant,
        id: tenantInfo?.data?.tenant_id || mockTenant.id,
        theme: themeName,
        primaryColor: tenantInfo?.data?.settings?.theme_code || mockTenant.primaryColor,
    };

    if (!Theme) {
        return <div className="p-10 text-center">Theme not found: {themeName}</div>;
    }
    const TopAreas = Theme.TopAreas;
    const NewLaunches = Theme.NewLaunches;
    const TopCompounds = Theme.TopCompounds;
    const SellPropertyBanner = Theme.SellPropertyBanner;
    const ExpertAdviceForm = Theme.ExpertAdviceForm;

    return (
        <>
            <Theme.HeroSection
                {...hero}
                translations={(messages as any).Hero}
            />
            {launches && launches.length > 0 && NewLaunches && (
                <NewLaunches launches={launches} />
            )}
            <Theme.PropertyGrid properties={properties} columns={3} />
            {areas && areas.length > 0 && TopAreas && (
                <TopAreas areas={areas} />
            )}
            {compounds && compounds.length > 0 && TopCompounds && (
                <TopCompounds compounds={compounds} />
            )}
            {SellPropertyBanner && <SellPropertyBanner />}
            {ExpertAdviceForm && <ExpertAdviceForm />}
        </>
    );
}
