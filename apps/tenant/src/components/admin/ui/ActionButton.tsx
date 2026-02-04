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
        bg-slate-900 text-white
        hover:bg-slate-800
        focus:ring-slate-900/20
    `,
    secondary: `
        bg-slate-100 text-slate-700
        hover:bg-slate-200
        focus:ring-slate-500/20
    `,
    outline: `
        bg-transparent border border-slate-200
        text-slate-700
        hover:bg-slate-50
        focus:ring-slate-500/20
    `,
    ghost: `
        bg-transparent text-slate-600
        hover:bg-slate-100 hover:text-slate-900
        focus:ring-slate-500/20
    `,
    danger: `
        bg-red-600 text-white
        hover:bg-red-700
        focus:ring-red-500/20
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
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
                disabled:opacity-50 disabled:cursor-not-allowed
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
