'use client';

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
    children,
    title,
    description,
    actions,
    className = '',
    padding = 'md',
}: CardProps) {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`
                bg-white dark:bg-slate-800 rounded-2xl
                border border-slate-200 dark:border-slate-700
                shadow-sm
                ${className}
            `}
        >
            {(title || actions) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                    <div>
                        {title && (
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                {description}
                            </p>
                        )}
                    </div>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}
            <div className={paddingClasses[padding]}>{children}</div>
        </div>
    );
}
