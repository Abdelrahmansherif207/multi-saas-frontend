'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Pencil,
    Trash2,
    MoreVertical,
    Search,
} from 'lucide-react';

// Column Definition
export interface ColumnDef<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: any, row: T, index: number) => React.ReactNode;
}

// Pagination Props
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}

// Empty State Props
export interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

// Table Props
export interface DataTableProps<T extends { id: string | number }> {
    columns: ColumnDef<T>[];
    data: T[];
    isLoading?: boolean;
    emptyState?: EmptyStateProps;
    pagination?: PaginationProps;
    selectable?: boolean;
    selectedIds?: (string | number)[];
    onSelectionChange?: (ids: (string | number)[]) => void;
    onRowAction?: (action: 'view' | 'edit' | 'delete', row: T) => void;
    showRowActions?: boolean;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    onSort?: (column: string, direction: 'asc' | 'desc') => void;
    locale?: string;
}

// Skeleton Row Component
function SkeletonRow({ columns }: { columns: number }) {
    return (
        <tr className="border-b border-slate-100 dark:border-slate-700/50">
            <td className="p-4">
                <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </td>
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="p-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
                </td>
            ))}
            <td className="p-4">
                <div className="w-20 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </td>
        </tr>
    );
}

// Empty State Component
function TableEmptyState({ emptyState, locale }: { emptyState?: EmptyStateProps; locale?: string }) {
    const isRTL = locale === 'ar';

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            {emptyState?.icon || (
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                </div>
            )}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {emptyState?.title || (isRTL ? 'لا توجد بيانات' : 'No data available')}
            </h3>
            {emptyState?.description && (
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-4">
                    {emptyState.description}
                </p>
            )}
            {emptyState?.action}
        </div>
    );
}

// Row Actions Dropdown
function RowActions<T extends { id: string | number }>({
    row,
    onAction,
    locale,
}: {
    row: T;
    onAction?: (action: 'view' | 'edit' | 'delete', row: T) => void;
    locale?: string;
}) {
    const [open, setOpen] = useState(false);
    const t = useTranslations('Admin.table');
    const isRTL = locale === 'ar';

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
                <MoreVertical className="w-4 h-4" />
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                            transition={{ duration: 0.1 }}
                            className={`
                                absolute z-50 mt-1 w-40
                                bg-white dark:bg-slate-800 rounded-xl shadow-xl
                                border border-slate-200 dark:border-slate-700
                                overflow-hidden py-1
                                ${isRTL ? 'left-0' : 'right-0'}
                            `}
                        >
                            <button
                                onClick={() => {
                                    onAction?.('view', row);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                {t('view')}
                            </button>
                            <button
                                onClick={() => {
                                    onAction?.('edit', row);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Pencil className="w-4 h-4" />
                                {t('edit')}
                            </button>
                            <button
                                onClick={() => {
                                    onAction?.('delete', row);
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                {t('delete')}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// Main DataTable Component
export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    isLoading = false,
    emptyState,
    pagination,
    selectable = false,
    selectedIds = [],
    onSelectionChange,
    onRowAction,
    showRowActions = true,
    sortColumn,
    sortDirection = 'asc',
    onSort,
    locale = 'en',
}: DataTableProps<T>) {
    const t = useTranslations('Admin.table');
    const isRTL = locale === 'ar';

    const allSelected = data.length > 0 && selectedIds.length === data.length;
    const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

    const toggleAll = () => {
        if (allSelected) {
            onSelectionChange?.([]);
        } else {
            onSelectionChange?.(data.map(row => row.id));
        }
    };

    const toggleRow = (id: string | number) => {
        if (selectedIds.includes(id)) {
            onSelectionChange?.(selectedIds.filter(s => s !== id));
        } else {
            onSelectionChange?.([...selectedIds, id]);
        }
    };

    const handleSort = (column: string) => {
        if (!onSort) return;
        const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        onSort(column, newDirection);
    };

    const getValue = (row: T, key: keyof T | string): any => {
        if (typeof key === 'string' && key.includes('.')) {
            return key.split('.').reduce((obj: any, k) => obj?.[k], row);
        }
        return row[key as keyof T];
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            {/* Selected Count Banner */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-blue-50 dark:bg-blue-500/10 border-b border-blue-100 dark:border-blue-500/20 px-4 py-2 overflow-hidden"
                    >
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            {selectedIds.length} {t('selected')}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            {selectable && (
                                <th className="p-4 w-12">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        ref={(el) => {
                                            if (el) el.indeterminate = someSelected;
                                        }}
                                        onChange={toggleAll}
                                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className={`
                                        p-4 text-xs font-semibold uppercase tracking-wider
                                        text-slate-500 dark:text-slate-400
                                        ${col.align === 'center' ? 'text-center' : col.align === 'right' ? (isRTL ? 'text-left' : 'text-right') : (isRTL ? 'text-right' : 'text-left')}
                                        ${col.sortable ? 'cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200' : ''}
                                    `}
                                    style={{ width: col.width }}
                                    onClick={() => col.sortable && handleSort(String(col.key))}
                                >
                                    <div className={`flex items-center gap-1 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : ''}`}>
                                        {col.header}
                                        {col.sortable && (
                                            <span className="flex flex-col">
                                                <ChevronUp
                                                    className={`w-3 h-3 -mb-1 ${sortColumn === col.key && sortDirection === 'asc' ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'}`}
                                                />
                                                <ChevronDown
                                                    className={`w-3 h-3 ${sortColumn === col.key && sortDirection === 'desc' ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'}`}
                                                />
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {showRowActions && (
                                <th className="p-4 w-16 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {t('actions')}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <SkeletonRow key={i} columns={columns.length} />
                            ))
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0) + (showRowActions ? 1 : 0)}>
                                    <TableEmptyState emptyState={emptyState} locale={locale} />
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <motion.tr
                                    key={row.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: rowIndex * 0.03 }}
                                    className={`
                                        border-b border-slate-100 dark:border-slate-700/50
                                        hover:bg-slate-50 dark:hover:bg-slate-700/30
                                        transition-colors
                                        ${selectedIds.includes(row.id) ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''}
                                    `}
                                >
                                    {selectable && (
                                        <td className="p-4 w-12">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(row.id)}
                                                onChange={() => toggleRow(row.id)}
                                                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td
                                            key={String(col.key)}
                                            className={`
                                                p-4 text-sm text-slate-700 dark:text-slate-300
                                                ${col.align === 'center' ? 'text-center' : col.align === 'right' ? (isRTL ? 'text-left' : 'text-right') : (isRTL ? 'text-right' : 'text-left')}
                                            `}
                                        >
                                            {col.render
                                                ? col.render(getValue(row, col.key), row, rowIndex)
                                                : getValue(row, col.key)}
                                        </td>
                                    ))}
                                    {showRowActions && (
                                        <td className="p-4 w-16">
                                            <RowActions row={row} onAction={onRowAction} locale={locale} />
                                        </td>
                                    )}
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && !isLoading && data.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            {t('page')} {pagination.currentPage} {t('of')} {pagination.totalPages}
                            {pagination.totalItems && (
                                <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-slate-400 dark:text-slate-500`}>
                                    ({pagination.totalItems} {isRTL ? 'عنصر' : 'items'})
                                </span>
                            )}
                        </div>

                        {pagination.onPageSizeChange && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                    {isRTL ? 'لكل صفحة:' : 'Per page:'}
                                </span>
                                <select
                                    value={pagination.pageSize}
                                    onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                                    className="bg-transparent border-none text-sm text-slate-600 dark:text-slate-400 focus:ring-0 cursor-pointer"
                                >
                                    {[5, 10, 15, 20, 30, 50].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => pagination.onPageChange?.(pagination.currentPage - 1)}
                            disabled={pagination.currentPage <= 1}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </button>

                        {Array.from({ length: pagination.totalPages }).map((_, i) => {
                            const page = i + 1;
                            // Basic pagination logic: show first, last, and pages around current
                            const shouldShow =
                                page === 1 ||
                                page === pagination.totalPages ||
                                Math.abs(page - pagination.currentPage) <= 1;

                            if (!shouldShow) {
                                // Add ellipsis logic here if needed, for now just skip
                                if (page === 2 || page === pagination.totalPages - 1) {
                                    return <span key={page} className="px-1 text-slate-400">...</span>;
                                }
                                return null;
                            }

                            return (
                                <button
                                    key={page}
                                    onClick={() => pagination.onPageChange?.(page)}
                                    className={`
                                        w-8 h-8 rounded-lg text-sm font-medium transition-colors
                                        ${page === pagination.currentPage
                                            ? 'bg-blue-500 text-white'
                                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }
                                    `}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => pagination.onPageChange?.(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
