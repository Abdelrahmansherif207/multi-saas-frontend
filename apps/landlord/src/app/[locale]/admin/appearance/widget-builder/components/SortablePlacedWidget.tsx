"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlacedWidget, WidgetConfigLabels } from "../widgets";
import { WidgetConfig } from "./WidgetConfig";

interface SortablePlacedWidgetProps {
    widget: PlacedWidget;
    onRemove: (id: string) => void;
    onToggle: (id: string) => void;
    onConfigChange: (id: string, key: string, value: any) => void;
    configLabels: WidgetConfigLabels;
}

export function SortablePlacedWidget({
    widget,
    onRemove,
    onToggle,
    onConfigChange,
    configLabels,
}: SortablePlacedWidgetProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: widget.instanceId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "bg-card border border-border/40 rounded-xl overflow-hidden",
                isDragging && "opacity-50 shadow-lg z-50"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                <div className="flex items-center gap-3">
                    <button
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                    >
                        <GripVertical className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-foreground">{widget.typeLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onToggle(widget.instanceId)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                    >
                        {widget.isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                    </button>
                    <button
                        onClick={() => onRemove(widget.instanceId)}
                        className="p-1 hover:bg-destructive/10 rounded transition-colors"
                    >
                        <X className="h-4 w-4 text-destructive" />
                    </button>
                </div>
            </div>

            {/* Expanded Config Form */}
            {widget.isExpanded && (
                <div className="p-4 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
                    <WidgetConfig
                        widget={widget}
                        onChange={(key, value) => onConfigChange(widget.instanceId, key, value)}
                        labels={configLabels}
                    />
                </div>
            )}
        </div>
    );
}
