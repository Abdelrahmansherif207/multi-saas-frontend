"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WidgetConfig, WidgetConfigLabels } from "./types";
import { LanguageTabs } from "./LanguageTabs";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";

interface TextEditorConfigProps {
    config: WidgetConfig;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function TextEditorConfig({ config, onChange, labels }: TextEditorConfigProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    return (
        <div className="space-y-4">
            <LanguageTabs activeTab={activeTab} onTabChange={setActiveTab} labels={labels} />

            <div className="space-y-2">
                <Label className="text-sm font-semibold">{labels.description}</Label>
                <RichTextEditor
                    content={activeTab === "en" ? config.description_en || "" : config.description_ar || ""}
                    onChange={(value) => onChange(activeTab === "en" ? "description_en" : "description_ar", value)}
                />
            </div>

            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                {labels.save_changes}
            </Button>
        </div>
    );
}
