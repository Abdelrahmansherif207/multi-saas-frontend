"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TicketSettingsFormProps {
    translations: {
        title: string;
        login_notice: string;
        form_title: string;
        button_text: string;
        success_message: string;
        update: string;
    }
}

export function TicketSettingsForm({ translations }: TicketSettingsFormProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    const tabs = [
        { id: "en", label: "English (UK)" },
        { id: "ar", label: "العربية" },
    ];

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Language Tabs */}
            <div className="flex items-center gap-2 border-b border-border/40 pb-0 shadow-sm bg-card/40 backdrop-blur-sm rounded-t-2xl px-4 pt-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as "en" | "ar")}
                        className={cn(
                            "px-6 py-3 text-sm font-semibold transition-all relative",
                            activeTab === tab.id
                                ? "text-brand-orange"
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
                <h2 className="text-xl font-bold text-foreground mb-4">{translations.title}</h2>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground/80">
                        {translations.login_notice} ({activeTab === "en" ? "English" : "Arabic"})
                    </Label>
                    <Input
                        className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-brand-orange/20 focus:border-brand-orange"
                        placeholder={activeTab === "en" ? "Login to create support ticket land" : "سجل الدخول لإنشاء تذكرة دعم"}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground/80">
                        {translations.form_title} ({activeTab === "en" ? "English" : "Arabic"})
                    </Label>
                    <Input
                        className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-brand-orange/20 focus:border-brand-orange"
                        placeholder={activeTab === "en" ? "Create New Support Ticket" : "إنشاء تذكرة دعم جديدة"}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground/80">
                        {translations.button_text} ({activeTab === "en" ? "English" : "Arabic"})
                    </Label>
                    <Input
                        className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-brand-orange/20 focus:border-brand-orange"
                        placeholder={activeTab === "en" ? "Submit Ticket" : "إرسال التذكرة"}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground/80">
                        {translations.success_message} ({activeTab === "en" ? "English" : "Arabic"})
                    </Label>
                    <Textarea
                        className="min-h-[120px] rounded-xl bg-background/50 border-border/40 focus:ring-brand-orange/20 focus:border-brand-orange resize-none"
                        placeholder={activeTab === "en" ? "Thanks for contact us, we will reply soon" : "شكراً لتواصلك معنا، سنرد عليك قريباً"}
                    />
                </div>

                <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-10 h-12 font-bold transition-all duration-300 transform hover:translate-y-[-2px]">
                        {translations.update}
                    </Button>
                </div>
            </div>
        </div>
    );
}
