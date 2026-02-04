'use client';

import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-muted text-foreground',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20',
    warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20',
    danger: 'bg-red-500/15 text-red-600 dark:text-red-400 ring-1 ring-red-500/20',
    info: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500/20',
    secondary: 'bg-muted text-muted-foreground ring-1 ring-border',
};

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    className = '',
}: BadgeProps) {
    return (
        <span
            className={`
                inline-flex items-center font-medium rounded-lg
                ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
                ${variantClasses[variant]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
