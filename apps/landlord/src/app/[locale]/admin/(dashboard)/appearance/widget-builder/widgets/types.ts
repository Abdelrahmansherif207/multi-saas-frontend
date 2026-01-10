export interface IconItem {
    id: string;
    icon: string;
    iconUrl: string;
}

export interface LinkItem {
    id: string;
    title_en: string;
    title_ar: string;
    url: string;
}

export interface ContactInfoItem {
    id: string;
    info: string;
    icon: string;
}

export interface WidgetConfig {
    description_en?: string;
    description_ar?: string;
    icons?: IconItem[];
    links?: LinkItem[];
    contactInfos?: ContactInfoItem[];
    html?: string;
    title_en?: string;
    title_ar?: string;
    heading_en?: string;
    heading_ar?: string;
    items_count?: number;
    category_title_en?: string;
    category_title_ar?: string;
    latitude?: string;
    longitude?: string;
}

export interface PlacedWidget {
    instanceId: string;
    typeId: string;
    typeLabel: string;
    isExpanded: boolean;
    config: WidgetConfig;
}

export interface WidgetConfigLabels {
    description: string;
    logo: string;
    upload_image: string;
    icon: string;
    icon_url: string;
    title: string;
    title_url: string;
    add: string;
    remove: string;
    save_changes: string;
    english: string;
    arabic: string;
    info: string;
    heading_text: string;
    blog_items: string;
    category_title: string;
    category_items: string;
    latitude: string;
    longitude: string;
}

export interface WidgetType {
    id: string;
    label: string;
}
