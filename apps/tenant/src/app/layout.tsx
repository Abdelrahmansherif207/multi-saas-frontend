import React from 'react';
import '@repo/ui/src/global.scss';
import { QueryProvider } from '../providers/QueryProvider';

export const metadata = {
    title: 'Tenant Portal',
    description: 'Multi-tenant SaaS Tenant Application',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
