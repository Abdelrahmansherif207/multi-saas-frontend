"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetType } from "../widgets";

interface DraggableWidgetItemProps {
    widget: WidgetType;
    label: string;
}

export function DraggableWidgetItem({ widget, label }: DraggableWidgetItemProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `available-${widget.id}`,
        data: { type: "available", widget },
    });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                "flex items-center gap-2 px-4 py-3 bg-background border border-border/40 rounded-xl cursor-grab active:cursor-grabbing hover:border-primary/40 transition-all group",
                isDragging && "opacity-50 shadow-lg"
            )}
        >
            <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-primary">{label}</span>
        </div>
    );
}
