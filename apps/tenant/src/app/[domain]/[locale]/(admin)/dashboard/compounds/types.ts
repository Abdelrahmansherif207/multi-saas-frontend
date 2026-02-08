export interface Compound {
    id: number;
    name: string;
    slug: string;
    area_id?: number;
    developer_id?: number;
    area?: { id: number; name: string };
    developer?: { id: number; name: string };
    title: string;
    description?: string;
    address?: string;
    latitude?: number | string;
    longitude?: number | string;
    construction_status?: 'planning' | 'under_construction' | 'completed';
    is_featured?: boolean;
    is_published?: boolean;
    total_units?: number;
    min_price?: number | string;
    max_price?: number | string;
    status?: boolean;
    created_at?: string;
    updated_at?: string;
}

// Standard Meta for Client Component
export interface MetaLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Meta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: MetaLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

// Raw Meta matching the weird API response (arrays)
export interface RawMeta {
    current_page: number[];
    from: number | null;
    last_page: number[];
    links: MetaLink[];
    path: string;
    per_page: number[];
    to: number | null;
    total: number[];
}

export interface CompoundsResponse {
    data: Compound[];
    meta: RawMeta;
}
