'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    options: SelectOption[];
    error?: string;
    helperText?: string;
    placeholder?: string;
    locale?: string;
}

export function FormSelect({
    label,
    options,
    error,
    helperText,
    placeholder,
    locale = 'en',
    className = '',
    id,
    ...props
}: FormSelectProps) {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    className={`
                        w-full px-4 py-2.5 rounded-xl appearance-none
                        bg-white dark:bg-slate-800
                        border border-slate-200 dark:border-slate-700
                        text-slate-900 dark:text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800/50
                        ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
                        ${!props.value && placeholder ? 'text-slate-400' : ''}
                        ${className}
                    `}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
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
