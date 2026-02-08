'use client';

import React, { useId } from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    locale?: string;
}

export function FormTextarea({
    label,
    error,
    helperText,
    locale = 'en',
    className = '',
    id,
    rows = 4,
    ...props
}: FormTextareaProps) {
    const generatedId = useId();
    const textareaId = id || generatedId;

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={textareaId}
                rows={rows}
                className={`
                    w-full px-4 py-2.5 rounded-xl resize-none
                    bg-white dark:bg-slate-800
                    border border-slate-200 dark:border-slate-700
                    text-slate-900 dark:text-white
                    placeholder-slate-400 dark:placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800/50
                    ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p className="text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
            )}
        </div>
    );
}
