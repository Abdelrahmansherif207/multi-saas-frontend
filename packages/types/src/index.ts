/**
 * @repo/types - Shared TypeScript Types
 * 
 * This package contains all shared type definitions used across
 * the landlord and tenant applications.
 */

// Tenant types
export type {
    TenantConfig,
    TenantSummary,
    TenantSocialLinks,
    TenantContactInfo,
    ThemeConfig,
} from './tenant';

// API response types
export type {
    ApiResponse,
    PaginatedResponse,
    PaginationMeta,
    PaginationLinks,
    ApiError,
    ValidationError,
} from './api';

// User types
export type {
    User,
    UserRole,
    SuperAdmin,
    TenantAdmin,
    Customer,
    CustomerAddress,
    AuthResponse,
    LoginCredentials,
    RegisterData,
} from './user';
