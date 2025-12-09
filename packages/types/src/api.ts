/**
 * API Response Types
 * 
 * Standard response wrappers used across all API endpoints.
 * These match the Laravel API response structure.
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: 'success' | 'error';
}

/**
 * Paginated response wrapper for list endpoints
 */
export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
    path: string;
}

/**
 * Pagination navigation links
 */
export interface PaginationLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

/**
 * API Error response
 */
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status: 'error';
    code?: string;
}

/**
 * Validation error structure
 */
export interface ValidationError {
    field: string;
    message: string;
}
