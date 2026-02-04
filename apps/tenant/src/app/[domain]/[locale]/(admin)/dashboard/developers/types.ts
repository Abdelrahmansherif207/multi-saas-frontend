export interface Developer {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    website: string | null;
    phone: string | null;
    email: string | null;
    status: boolean;
    order: number;
    is_featured: boolean;
    meta_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
    compounds_count: number;
    properties_count: number;
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

export interface DevelopersResponse {
    data: Developer[];
    meta: Meta;
}
