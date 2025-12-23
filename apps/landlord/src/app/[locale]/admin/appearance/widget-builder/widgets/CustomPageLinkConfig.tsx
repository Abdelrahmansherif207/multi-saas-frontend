"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { WidgetConfig, WidgetConfigLabels, LinkItem } from "./types";
import { LanguageTabs } from "./LanguageTabs";

interface CustomPageLinkConfigProps {
    config: WidgetConfig;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function CustomPageLinkConfig({ config, onChange, labels }: CustomPageLinkConfigProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");
    const links = config.links || [];

    const addLink = () => {
        const newLink: LinkItem = {
            id: Date.now().toString(),
            title_en: "",
            title_ar: "",
            url: "",
        };
        onChange("links", [...links, newLink]);
    };

    const removeLink = (id: string) => {
        onChange("links", links.filter((l) => l.id !== id));
    };

    const updateLink = (id: string, field: keyof LinkItem, value: string) => {
        onChange(
            "links",
            links.map((l) => (l.id === id ? { ...l, [field]: value } : l))
        );
    };

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

            {/* Repeatable Links Section */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                {links.map((link) => (
                    <div key={link.id} className="flex items-start gap-3">
                        <div className="flex-1 space-y-3">
                            <LanguageTabs
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                labels={labels}
                            />
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{labels.title}</Label>
                                <Input
                                    value={activeTab === "en" ? link.title_en : link.title_ar}
                                    onChange={(e) =>
                                        updateLink(link.id, activeTab === "en" ? "title_en" : "title_ar", e.target.value)
                                    }
                                    className="rounded-lg"
                                    dir={activeTab === "ar" ? "rtl" : "ltr"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{labels.title_url}</Label>
                                <Input
                                    value={link.url}
                                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 pt-6">
                            <Button
                                size="icon"
                                className="h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg"
                                onClick={addLink}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8 rounded-lg"
                                onClick={() => removeLink(link.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {links.length === 0 && (
                    <Button
                        variant="outline"
                        className="w-full rounded-lg"
                        onClick={addLink}
                    >
                        <Plus className="h-4 w-4 mr-2" /> {labels.add} Link
                    </Button>
                )}
            </div>

            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                {labels.save_changes}
            </Button>
        </div>
    );
}
