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
                <nav className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-1">
                            {index > 0 && <ChevronIcon className="w-4 h-4" />}
                            {crumb.href ? (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-blue-500 transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-slate-900 dark:text-white font-medium">
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
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
