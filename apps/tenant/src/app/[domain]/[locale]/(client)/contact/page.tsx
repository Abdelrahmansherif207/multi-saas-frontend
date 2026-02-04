import React from 'react';
import { getTenantData } from '../../../../../mocks/real-estate';
import { ThemeRegistry, ThemeType } from '../../../../../lib/theme-registry';

export default async function ContactRoute({
    params,
}: {
    params: Promise<{ domain: string; locale: string }>;
}) {
    const { domain, locale } = await params;
    const { tenant } = getTenantData(domain);

    // Resolve the theme from registry
    const themeName = (tenant.theme || 'real-estate') as ThemeType;
    const Theme = ThemeRegistry[themeName];

    if (!Theme || !Theme.Pages.ContactPage) {
        return (
            <div className="p-10 text-center">
                Contact page not implemented for theme: {themeName}
            </div>
        );
    }

    const ContactPage = Theme.Pages.ContactPage;

    return <ContactPage tenant={tenant} />;
}
