export interface Area {
    id: number;
    name: string;
    type: string;
    parent_id: number | null;
    status: boolean;
    created_at: string;
    updated_at: string;
    parent?: Area; // Optional parent object if included
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
