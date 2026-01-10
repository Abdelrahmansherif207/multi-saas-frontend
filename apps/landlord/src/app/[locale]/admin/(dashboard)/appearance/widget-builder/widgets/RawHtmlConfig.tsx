"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WidgetConfig, WidgetConfigLabels } from "./types";

interface RawHtmlConfigProps {
    config: WidgetConfig;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function RawHtmlConfig({ config, onChange, labels }: RawHtmlConfigProps) {
    return (
        <div className="space-y-4">
            <Textarea
                value={config.html || ""}
                onChange={(e) => onChange("html", e.target.value)}
                placeholder="Enter raw HTML..."
                className="min-h-[150px] rounded-lg resize-none font-mono text-sm"
            />
            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                {labels.save_changes}
            </Button>
        </div>
    );
}
