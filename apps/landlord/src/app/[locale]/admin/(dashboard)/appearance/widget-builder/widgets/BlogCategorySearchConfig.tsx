"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WidgetConfig, WidgetConfigLabels } from "./types";
import { LanguageTabs } from "./LanguageTabs";

interface BlogCategorySearchConfigProps {
    config: WidgetConfig;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function BlogCategorySearchConfig({ config, onChange, labels }: BlogCategorySearchConfigProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    return (
        <div className="space-y-4">
            <LanguageTabs activeTab={activeTab} onTabChange={setActiveTab} labels={labels} />

            <div className="space-y-2">
                <Label className="text-sm font-semibold">{labels.category_title}</Label>
                <Input
                    value={activeTab === "en" ? config.category_title_en || "" : config.category_title_ar || ""}
                    onChange={(e) => onChange(activeTab === "en" ? "category_title_en" : "category_title_ar", e.target.value)}
                    className="rounded-lg"
                    dir={activeTab === "ar" ? "rtl" : "ltr"}
                />
            </div>

            <div className="space-y-2">
                <Label className="text-sm font-semibold">{labels.category_items}</Label>
                <Input
                    type="number"
                    min="1"
                    max="20"
                    value={config.items_count || ""}
                    onChange={(e) => onChange("items_count", parseInt(e.target.value) || 0)}
                    className="rounded-lg"
                />
            </div>

            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                {labels.save_changes}
            </Button>
        </div>
    );
}
