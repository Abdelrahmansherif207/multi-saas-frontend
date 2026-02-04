export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: string; // e.g., 'new', 'read', 'contacted'
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

export interface InquiriesResponse {
    data: Inquiry[];
    meta: Meta;
}
