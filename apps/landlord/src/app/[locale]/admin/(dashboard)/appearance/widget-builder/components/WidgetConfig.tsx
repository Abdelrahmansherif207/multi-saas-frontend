"use client";

import { PlacedWidget, WidgetConfigLabels } from "../widgets";
import {
    RawHtmlConfig,
    TextEditorConfig,
    AboutUsConfig,
    CustomPageLinkConfig,
    ContactInfoConfig,
    PopularBlogsConfig,
    BlogCategorySearchConfig,
    PopularSubAppointmentsConfig,
    GoogleMapConfig,
} from "../widgets";

interface WidgetConfigProps {
    widget: PlacedWidget;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function WidgetConfig({ widget, onChange, labels }: WidgetConfigProps) {
    switch (widget.typeId) {
        case "raw_html":
            return <RawHtmlConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "text_editor":
            return <TextEditorConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "about_us":
            return <AboutUsConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "custom_page_link":
            return <CustomPageLinkConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "contact_info":
            return <ContactInfoConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "popular_blogs":
            return <PopularBlogsConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "blog_category_search":
            return <BlogCategorySearchConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "popular_appointments":
            return <PopularBlogsConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "popular_sub_appointments":
            return <PopularSubAppointmentsConfig config={widget.config} onChange={onChange} labels={labels} />;
        case "google_map":
            return <GoogleMapConfig config={widget.config} onChange={onChange} labels={labels} />;
        default:
            return (
                <div className="py-4 text-center text-muted-foreground italic">
                    Configuration coming soon...
                </div>
            );
    }
}
