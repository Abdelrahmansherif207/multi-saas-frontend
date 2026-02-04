export interface Amenity {
    id: number;
    name: string;
    slug: string;
    icon: string;
    category: 'property' | 'compound' | 'both';
    order: number;
    status: boolean;
    created_at: string;
    updated_at: string;
}

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

export interface AmenitiesResponse {
    data: Amenity[];
    meta?: Meta; // Meta might be optional if all data is returned in one go without pagination metadata in some cases, but sticking to standard structure
}
