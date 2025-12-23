"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PlacedWidget, WidgetType, WidgetConfigLabels } from "./widgets";
import { DraggableWidgetItem, WidgetArea } from "./components";

// Available widget types
const WIDGET_TYPES: WidgetType[] = [
    { id: "raw_html", label: "Raw HTML" },
    { id: "text_editor", label: "Text Editor" },
    { id: "about_us", label: "About Us" },
    { id: "custom_page_link", label: "Custom Page Link" },
    { id: "contact_info", label: "Contact Info" },
    { id: "popular_blogs", label: "Popular Blogs" },
    { id: "blog_category_search", label: "Blog Category & Search" },
    { id: "popular_appointments", label: "Popular Appointments" },
    { id: "popular_sub_appointments", label: "Popular Sub Appointments" },
    { id: "google_map", label: "Google Map" },
];

interface WidgetBuilderProps {
    translations: {
        title: string;
        all_widgets: string;
        footer_area: string;
        sidebar_area: string;
        save_changes: string;
        widgets: Record<string, string>;
        widget_config: WidgetConfigLabels;
    };
}

export function WidgetBuilder({ translations }: WidgetBuilderProps) {
    const [footerWidgets, setFooterWidgets] = useState<PlacedWidget[]>([]);
    const [sidebarWidgets, setSidebarWidgets] = useState<PlacedWidget[]>([]);
    const [footerExpanded, setFooterExpanded] = useState(true);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [overAreaId, setOverAreaId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragOver = (event: any) => {
        const { over } = event;
        if (over?.id === "footer-area" || over?.id === "sidebar-area") {
            setOverAreaId(over.id);
        } else {
            setOverAreaId(null);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setOverAreaId(null);

        if (!over) return;

        const activeIdStr = active.id.toString();

        // Dropping from available widgets to an area
        if (activeIdStr.startsWith("available-")) {
            const widgetTypeId = activeIdStr.replace("available-", "");
            const widgetType = WIDGET_TYPES.find((w) => w.id === widgetTypeId);
            if (!widgetType) return;

            const newWidget: PlacedWidget = {
                instanceId: `${widgetTypeId}-${Date.now()}`,
                typeId: widgetTypeId,
                typeLabel: translations.widgets[widgetTypeId] || widgetType.label,
                isExpanded: false,
                config: {},
            };

            if (over.id === "footer-area") {
                setFooterWidgets((prev) => [...prev, newWidget]);
            } else if (over.id === "sidebar-area") {
                setSidebarWidgets((prev) => [...prev, newWidget]);
            }
            return;
        }

        // Reordering within the same area
        const isFooterWidget = footerWidgets.some((w) => w.instanceId === activeIdStr);
        const isSidebarWidget = sidebarWidgets.some((w) => w.instanceId === activeIdStr);

        if (isFooterWidget) {
            const oldIndex = footerWidgets.findIndex((w) => w.instanceId === activeIdStr);
            const newIndex = footerWidgets.findIndex((w) => w.instanceId === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                setFooterWidgets(arrayMove(footerWidgets, oldIndex, newIndex));
            }
        } else if (isSidebarWidget) {
            const oldIndex = sidebarWidgets.findIndex((w) => w.instanceId === activeIdStr);
            const newIndex = sidebarWidgets.findIndex((w) => w.instanceId === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                setSidebarWidgets(arrayMove(sidebarWidgets, oldIndex, newIndex));
            }
        }
    };

    const removeWidget = (area: "footer" | "sidebar", instanceId: string) => {
        if (area === "footer") {
            setFooterWidgets((prev) => prev.filter((w) => w.instanceId !== instanceId));
        } else {
            setSidebarWidgets((prev) => prev.filter((w) => w.instanceId !== instanceId));
        }
    };

    const toggleWidget = (area: "footer" | "sidebar", instanceId: string) => {
        const updateFn = (widgets: PlacedWidget[]) =>
            widgets.map((w) =>
                w.instanceId === instanceId ? { ...w, isExpanded: !w.isExpanded } : w
            );
        if (area === "footer") {
            setFooterWidgets(updateFn);
        } else {
            setSidebarWidgets(updateFn);
        }
    };

    const updateConfig = (area: "footer" | "sidebar", instanceId: string, key: string, value: any) => {
        const updateFn = (widgets: PlacedWidget[]) =>
            widgets.map((w) =>
                w.instanceId === instanceId
                    ? { ...w, config: { ...w.config, [key]: value } }
                    : w
            );
        if (area === "footer") {
            setFooterWidgets(updateFn);
        } else {
            setSidebarWidgets(updateFn);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Panel - Available Widgets */}
                <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-foreground mb-6">{translations.all_widgets}</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {WIDGET_TYPES.map((widget) => (
                            <DraggableWidgetItem
                                key={widget.id}
                                widget={widget}
                                label={translations.widgets[widget.id] || widget.label}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Panel - Widget Areas */}
                <div className="space-y-6">
                    <WidgetArea
                        id="footer-area"
                        title={translations.footer_area}
                        widgets={footerWidgets}
                        isExpanded={footerExpanded}
                        onToggle={() => setFooterExpanded(!footerExpanded)}
                        onRemoveWidget={(id) => removeWidget("footer", id)}
                        onToggleWidget={(id) => toggleWidget("footer", id)}
                        onConfigChange={(id, key, val) => updateConfig("footer", id, key, val)}
                        configLabels={translations.widget_config}
                        isOver={overAreaId === "footer-area"}
                    />
                    <WidgetArea
                        id="sidebar-area"
                        title={translations.sidebar_area}
                        widgets={sidebarWidgets}
                        isExpanded={sidebarExpanded}
                        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
                        onRemoveWidget={(id) => removeWidget("sidebar", id)}
                        onToggleWidget={(id) => toggleWidget("sidebar", id)}
                        onConfigChange={(id, key, val) => updateConfig("sidebar", id, key, val)}
                        configLabels={translations.widget_config}
                        isOver={overAreaId === "sidebar-area"}
                    />
                </div>
            </div>
        </DndContext>
    );
}
