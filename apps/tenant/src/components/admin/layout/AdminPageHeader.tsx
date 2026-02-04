'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    actions?: React.ReactNode;
    locale?: string;
}

export function AdminPageHeader({
    title,
    description,
    breadcrumbs = [],
    actions,
    locale = 'en',
}: AdminPageHeaderProps) {
    const isRTL = locale === 'ar';
    const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

    return (
        <div className="mb-8">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {index > 0 && <ChevronIcon className="w-3.5 h-3.5 text-muted-foreground/60" />}
                            {crumb.href ? (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-primary transition-colors duration-200"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-foreground font-medium">
                                    {crumb.label}
                                </span>
                            )}
                        </div>
                    ))}
                </nav>
            )}

            {/* Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1.5 text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-3 shrink-0">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
