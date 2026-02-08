/**
 * Real Estate Area Types
 * Follows API contract from: /api/v1/tenant/{tenant}/admin/realestate/areas
 */

export type AreaType = 'area' | 'sub_area' | 'super_area';

export interface Area {
    id: number;
    name: string;
    type: AreaType;
    status: boolean;
    description?: string;
    latitude?: number;
    longitude?: number;
    image?: string;
    is_featured?: boolean;
    meta_title?: string;
    meta_description?: string;
    order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface AreaCreateRequest {
    name: string;
    type: AreaType;
    status: boolean;
    description?: string;
    latitude?: number;
    longitude?: number;
    image?: string;
    is_featured?: boolean;
    meta_title?: string;
    meta_description?: string;
    order?: number;
}

export type AreaUpdateRequest = AreaCreateRequest;

export interface AreaResponse {
    message: string;
    data: Area;
}

export interface AreasListResponse {
    message: string;
    data: Area[];
}

export interface AreaApiError {
    message: string;
    errors?: Record<string, string[]>;
}

// Valid area types for form/API validation
export const VALID_AREA_TYPES: readonly AreaType[] = ['area', 'sub_area', 'super_area'];

export const isValidAreaType = (value: string): value is AreaType => {
    return VALID_AREA_TYPES.includes(value as AreaType);
};
