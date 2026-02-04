export interface PropertyType {
    id: number;
    name: string;
    slug: string;
    icon: string;
    description: string;
    order: number;
    status: boolean;
    properties_count: number;
    created_at: string;
    updated_at: string;
}

export interface PropertyTypesResponse {
    data: PropertyType[];
}
