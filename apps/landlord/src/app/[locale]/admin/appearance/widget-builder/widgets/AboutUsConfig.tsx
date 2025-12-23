"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { WidgetConfig, WidgetConfigLabels, IconItem } from "./types";
import { LanguageTabs } from "./LanguageTabs";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";

interface AboutUsConfigProps {
    config: WidgetConfig;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function AboutUsConfig({ config, onChange, labels }: AboutUsConfigProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");
    const icons = config.icons || [];

    const addIcon = () => {
        const newIcon: IconItem = {
            id: Date.now().toString(),
            icon: "",
            iconUrl: "",
        };
        onChange("icons", [...icons, newIcon]);
    };

    const removeIcon = (id: string) => {
        onChange("icons", icons.filter((i) => i.id !== id));
    };

    const updateIcon = (id: string, field: keyof IconItem, value: string) => {
        onChange(
            "icons",
            icons.map((i) => (i.id === id ? { ...i, [field]: value } : i))
        );
    };

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

            <div className="space-y-2">
                <Label className="text-sm font-semibold">{labels.logo}</Label>
                <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-lg">
                    {labels.upload_image}
                </Button>
            </div>

            {/* Repeatable Icon Section */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                {icons.map((icon) => (
                    <div key={icon.id} className="flex items-start gap-3">
                        <div className="flex-1 space-y-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{labels.icon}</Label>
                                <Select
                                    value={icon.icon}
                                    onValueChange={(val) => updateIcon(icon.id, "icon", val)}
                                >
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue placeholder="Select icon..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="facebook">Facebook</SelectItem>
                                        <SelectItem value="twitter">Twitter</SelectItem>
                                        <SelectItem value="instagram">Instagram</SelectItem>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                        <SelectItem value="youtube">YouTube</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{labels.icon_url}</Label>
                                <Input
                                    value={icon.iconUrl}
                                    onChange={(e) => updateIcon(icon.id, "iconUrl", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 pt-6">
                            <Button
                                size="icon"
                                className="h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg"
                                onClick={addIcon}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8 rounded-lg"
                                onClick={() => removeIcon(icon.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {icons.length === 0 && (
                    <Button
                        variant="outline"
                        className="w-full rounded-lg"
                        onClick={addIcon}
                    >
                        <Plus className="h-4 w-4 mr-2" /> {labels.add} {labels.icon}
                    </Button>
                )}
            </div>

            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                {labels.save_changes}
            </Button>
        </div>
    );
}
