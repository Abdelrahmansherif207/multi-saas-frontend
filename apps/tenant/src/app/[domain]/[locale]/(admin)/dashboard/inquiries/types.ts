export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    message: string | null;
    status: 'new' | 'contacted' | 'qualified' | 'converted';
    status_label: string;
    admin_notes: string | null;
    property?: PropertyContext | null;
    compound?: CompoundContext | null;
    user?: UserContext | null;
    agent?: AgentContext | null;
    created_at: string;
    updated_at: string;
}

export interface PropertyContext {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    price_formatted: string;
    currency: string;
    area: number;
    area_formatted: string;
    bedrooms: number;
    bathrooms: number;
    compound_address: string;
    is_featured: boolean;
    is_published: boolean;
    is_available: boolean;
    url: string;
    primary_image?: {
        id: number;
        image_path: string;
        urls: {
            small: string;
            medium: string;
            large: string;
        }
    };
}

export interface CompoundContext {
    id: number;
    name: string;
    slug: string;
    description: string;
    min_price: number;
    max_price: number;
    price_range: string;
    total_units: number;
    is_featured: boolean;
    url: string;
}

export interface UserContext {
    id: number;
    name: string;
    email: string;
}

export interface AgentContext {
    id: number;
    name: string;
    email: string;
}

export interface InquiryStatistics {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    closed: number;
    conversion_rate: number;
    today: number;
    this_week: number;
    this_month: number;
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

export interface StatisticsResponse {
    data: InquiryStatistics;
}
