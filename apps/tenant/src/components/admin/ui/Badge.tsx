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
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    secondary: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
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
                inline-flex items-center font-medium rounded-full
                ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
                ${variantClasses[variant]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
