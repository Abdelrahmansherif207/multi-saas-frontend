'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: `
        bg-gradient-to-r from-blue-500 to-blue-600 text-white
        hover:from-blue-600 hover:to-blue-700
        shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
        focus:ring-blue-500/50
    `,
    secondary: `
        bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200
        hover:bg-slate-200 dark:hover:bg-slate-600
        focus:ring-slate-500/50
    `,
    outline: `
        bg-transparent border-2 border-slate-200 dark:border-slate-700
        text-slate-700 dark:text-slate-200
        hover:bg-slate-50 dark:hover:bg-slate-800
        focus:ring-slate-500/50
    `,
    ghost: `
        bg-transparent text-slate-600 dark:text-slate-400
        hover:bg-slate-100 dark:hover:bg-slate-800
        hover:text-slate-900 dark:hover:text-white
        focus:ring-slate-500/50
    `,
    danger: `
        bg-gradient-to-r from-red-500 to-red-600 text-white
        hover:from-red-600 hover:to-red-700
        shadow-lg shadow-red-500/25 hover:shadow-red-500/40
        focus:ring-red-500/50
    `,
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
};

export function ActionButton({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}: ActionButtonProps) {
    return (
        <button
            className={`
                inline-flex items-center justify-center font-medium
                rounded-xl transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                icon && iconPosition === 'left' && icon
            )}
            {children}
            {!loading && icon && iconPosition === 'right' && icon}
        </button>
    );
}
