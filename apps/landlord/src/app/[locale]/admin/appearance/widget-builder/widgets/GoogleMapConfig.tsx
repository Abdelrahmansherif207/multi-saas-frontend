"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { WidgetConfig, WidgetConfigLabels } from "./types";
import { LanguageTabs } from "./LanguageTabs";

interface GoogleMapConfigProps {
    config: WidgetConfig;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function GoogleMapConfig({ config, onChange, labels }: GoogleMapConfigProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    return (
        <div className="space-y-4">
            <LanguageTabs activeTab={activeTab} onTabChange={setActiveTab} labels={labels} />

            <div className="space-y-2">
                <Label className="text-sm font-semibold">{labels.title}</Label>
                <Input
                    value={activeTab === "en" ? config.title_en || "" : config.title_ar || ""}
                    onChange={(e) => onChange(activeTab === "en" ? "title_en" : "title_ar", e.target.value)}
                    className="rounded-lg"
                    dir={activeTab === "ar" ? "rtl" : "ltr"}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{labels.latitude}</Label>
                    <Input
                        type="number"
                        step="any"
                        placeholder="e.g. 24.7136"
                        value={config.latitude || ""}
                        onChange={(e) => onChange("latitude", e.target.value)}
                        className="rounded-lg"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{labels.longitude}</Label>
                    <Input
                        type="number"
                        step="any"
                        placeholder="e.g. 46.6753"
                        value={config.longitude || ""}
                        onChange={(e) => onChange("longitude", e.target.value)}
                        className="rounded-lg"
                    />
                </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                {labels.save_changes}
            </Button>
        </div>
    );
}
