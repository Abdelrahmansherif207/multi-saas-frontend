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
import { WidgetConfig, WidgetConfigLabels, ContactInfoItem } from "./types";
import { LanguageTabs } from "./LanguageTabs";

interface ContactInfoConfigProps {
    config: WidgetConfig;
    onChange: (key: string, value: any) => void;
    labels: WidgetConfigLabels;
}

export function ContactInfoConfig({ config, onChange, labels }: ContactInfoConfigProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");
    const contactInfos = config.contactInfos || [];

    const addContactInfo = () => {
        const newItem: ContactInfoItem = {
            id: Date.now().toString(),
            info: "",
            icon: "",
        };
        onChange("contactInfos", [...contactInfos, newItem]);
    };

    const removeContactInfo = (id: string) => {
        onChange("contactInfos", contactInfos.filter((i) => i.id !== id));
    };

    const updateContactInfo = (id: string, field: keyof ContactInfoItem, value: string) => {
        onChange(
            "contactInfos",
            contactInfos.map((i) => (i.id === id ? { ...i, [field]: value } : i))
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

            {/* Repeatable Contact Info Section */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                {contactInfos.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                        <div className="flex-1 space-y-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{labels.info}</Label>
                                <Input
                                    value={item.info}
                                    onChange={(e) => updateContactInfo(item.id, "info", e.target.value)}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{labels.icon}</Label>
                                <Select
                                    value={item.icon}
                                    onValueChange={(val) => updateContactInfo(item.id, "icon", val)}
                                >
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue placeholder="Select icon..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="phone">Phone</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="location">Location</SelectItem>
                                        <SelectItem value="clock">Clock</SelectItem>
                                        <SelectItem value="globe">Globe</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 pt-6">
                            <Button
                                size="icon"
                                className="h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg"
                                onClick={addContactInfo}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8 rounded-lg"
                                onClick={() => removeContactInfo(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {contactInfos.length === 0 && (
                    <Button
                        variant="outline"
                        className="w-full rounded-lg"
                        onClick={addContactInfo}
                    >
                        <Plus className="h-4 w-4 mr-2" /> {labels.add} {labels.info}
                    </Button>
                )}
            </div>

            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                {labels.save_changes}
            </Button>
        </div>
    );
}
