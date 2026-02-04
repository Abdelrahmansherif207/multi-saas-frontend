export interface Area {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    type: string; // governorate, city, district
    latitude: string | null;
    longitude: string | null;
    image: string | null;
    is_featured: boolean;
    status: boolean;
    order: number;
    meta_title: string | null;
    meta_description: string | null;
    url: string | null;
    compounds_count: number;
    properties_count: number;
    parent_id: number | null;
    parent?: Area | null;
    created_at: string;
    updated_at: string;
}

export interface AreaStatistics {
    total: number;
    active: number;
    featured: number;
    root_areas: number;
    with_compounds: number;
    with_properties: number;
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

export interface AreasResponse {
    data: Area[];
    meta: Meta;
}

export interface StatsResponse {
    data: AreaStatistics;
}
