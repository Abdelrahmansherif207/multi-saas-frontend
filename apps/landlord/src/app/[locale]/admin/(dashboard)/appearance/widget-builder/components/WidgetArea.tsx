"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlacedWidget, WidgetConfigLabels } from "../widgets";
import { SortablePlacedWidget } from "./SortablePlacedWidget";

interface WidgetAreaProps {
    id: string;
    title: string;
    widgets: PlacedWidget[];
    isExpanded: boolean;
    onToggle: () => void;
    onRemoveWidget: (instanceId: string) => void;
    onToggleWidget: (instanceId: string) => void;
    onConfigChange: (instanceId: string, key: string, value: any) => void;
    configLabels: WidgetConfigLabels;
    isOver: boolean;
}

export function WidgetArea({
    id,
    title,
    widgets,
    isExpanded,
    onToggle,
    onRemoveWidget,
    onToggleWidget,
    onConfigChange,
    configLabels,
    isOver,
}: WidgetAreaProps) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-sm">
            {/* Area Header */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
            >
                <span className="font-semibold text-foreground">{title}</span>
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
            </button>

            {/* Area Content */}
            {isExpanded && (
                <div
                    ref={setNodeRef}
                    className={cn(
                        "p-4 border-t border-border/40 min-h-[120px] transition-colors",
                        isOver && "bg-primary/5 border-2 border-dashed border-primary/40"
                    )}
                >
                    {widgets.length === 0 ? (
                        <div className="flex items-center justify-center h-20 text-muted-foreground text-sm">
                            Drag widgets here
                        </div>
                    ) : (
                        <SortableContext
                            items={widgets.map((w) => w.instanceId)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-3">
                                {widgets.map((widget) => (
                                    <SortablePlacedWidget
                                        key={widget.instanceId}
                                        widget={widget}
                                        onRemove={onRemoveWidget}
                                        onToggle={onToggleWidget}
                                        onConfigChange={onConfigChange}
                                        configLabels={configLabels}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    )}
                </div>
            )}
        </div>
    );
}
