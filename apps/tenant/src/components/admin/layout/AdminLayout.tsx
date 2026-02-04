'use client';

import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
    children: React.ReactNode;
    locale: string;
}

export function AdminLayout({ children, locale }: AdminLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const isRTL = locale === 'ar';

    const sidebarWidth = sidebarCollapsed ? 88 : 300;

    return (
        <div className={`min-h-screen bg-background overflow-x-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Sidebar */}
            <AdminSidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                locale={locale}
            />

            {/* Header */}
            <AdminHeader
                sidebarCollapsed={sidebarCollapsed}
                onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                locale={locale}
            />

            {/* Main Content */}
            <main
                className="pt-16 min-h-screen transition-all duration-200 ease-out"
                style={{
                    [isRTL ? 'marginRight' : 'marginLeft']: sidebarWidth,
                }}
            >
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
