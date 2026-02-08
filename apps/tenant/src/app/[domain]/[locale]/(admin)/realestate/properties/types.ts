
export interface CompoundInProperty {
    id: number;
    name: string | null;
    slug: string;
    description: string;
    address: string;
}

export interface PropertyTypeInProperty {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

export interface PropertyImage {
    id: number;
    title: string;
    image_url: string;
    urls: {
        original: string;
        small: string;
        medium: string;
        large: string;
    };
}

export interface Property {
    id: number;
    title: string;
    name?: string; // Adding optional name for compatibility if needed elsewhere
    slug: string;
    price_formatted: string;
    price: string;
    area_formatted: string;
    bedrooms: number;
    bathrooms: number;
    status: string | null;
    compound: CompoundInProperty | null;
    property_type: PropertyTypeInProperty | null;
    primary_image: PropertyImage | null;
    created_at: string;
    updated_at: string;

    // legacy fields that might be used in the component
    type?: string;
    area?: string;
    developerPrice?: string;
}

export interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
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

export interface PropertiesResponse {
    data: Property[];
    links: Links;
    meta: RawMeta;
}
