"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface CustomDomainSettingsFormProps {
    translations: {
        title: string;
        field_title: string;
        description: string;
        table_info_title: string;
        type_one: string;
        host_one: string;
        value_one: string;
        ttl_one: string;
        type_two: string;
        host_two: string;
        value_two: string;
        ttl_two: string;
        ip_address: string;
        screenshot: string;
        screenshot_hint: string;
        upload: string;
        update: string;
    }
}

export function CustomDomainSettingsForm({ translations }: CustomDomainSettingsFormProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar" | "tr">("en");

    const tabs = [
        { id: "en", label: "English (UK)" },
        { id: "ar", label: "العربية" },
        { id: "tr", label: "Türkçe" },
    ];

    return (
        <div className="space-y-6">
            {/* Language Tabs */}
            <div className="flex items-center gap-2 border-b border-border/40 pb-0 bg-card/40 backdrop-blur-sm rounded-t-2xl px-4 pt-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as "en" | "ar" | "tr")}
                        className={cn(
                            "px-6 py-3 text-sm font-semibold transition-all relative",
                            activeTab === tab.id
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Title */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-primary">
                        {translations.field_title}
                    </Label>
                    <Input
                        className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-brand-orange/20 focus:border-brand-orange"
                        placeholder=""
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-primary">
                        {translations.description}
                    </Label>
                    <Textarea
                        className="min-h-[100px] rounded-xl bg-background/50 border-border/40 focus:ring-brand-orange/20 focus:border-brand-orange resize-none"
                    />
                </div>

                {/* Table Info Data Title */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-primary">
                        {translations.table_info_title}
                    </Label>
                    <Input
                        className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-brand-orange/20 focus:border-brand-orange"
                    />
                </div>

                {/* Row One: Type, Host, Value, TTL */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.type_one}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-muted/50 border-border/40"
                            defaultValue="CNAME Record"
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">
                            {translations.host_one}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-background/50 border-border/40"
                            defaultValue="www"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.value_one}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-muted/50 border-border/40"
                            defaultValue="localhost"
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.ttl_one}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-muted/50 border-border/40"
                            defaultValue="Automatic"
                            readOnly
                        />
                    </div>
                </div>

                {/* Row Two: Type, Host, Value, TTL */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.type_two}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-muted/50 border-border/40"
                            defaultValue="CNAME Record"
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">
                            {translations.host_two}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-background/50 border-border/40"
                            defaultValue="@"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.value_two}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-muted/50 border-border/40"
                            defaultValue="localhost"
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-primary">
                            {translations.ttl_two}
                        </Label>
                        <Input
                            className="h-12 rounded-xl bg-muted/50 border-border/40"
                            defaultValue="Automatic"
                            readOnly
                        />
                    </div>
                </div>

                {/* IP Address */}
                <div className="space-y-2 max-w-xs">
                    <Label className="text-sm font-semibold text-primary">
                        {translations.ip_address}
                    </Label>
                    <Input
                        className="h-12 rounded-xl bg-muted/50 border-border/40"
                        defaultValue="127.0.0.1"
                    />
                </div>

                {/* Screenshot Upload */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-primary">
                        {translations.screenshot}
                    </Label>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="rounded-xl h-10 px-4 font-semibold bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            <Upload className="h-4 w-4 mr-2" />
                            {translations.upload}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{translations.screenshot_hint}</p>
                </div>

                {/* Update Button */}
                <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary/90 rounded-xl px-10 h-12 font-bold transition-all duration-300">
                        {translations.update}
                    </Button>
                </div>
            </div>
        </div>
    );
}
