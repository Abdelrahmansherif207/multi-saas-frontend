"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LanguageTabs } from "../widget-builder/widgets/LanguageTabs";
import { X } from "lucide-react";
import Image from "next/image";

interface MaintenanceSettingsFormProps {
    translations: {
        title: string;
        page_title: string;
        description: string;
        coming_back_date: string;
        maintenance_logo: string;
        maintenance_bg_image: string;
        update_settings: string;
        change: string;
        remove: string;
    };
}

export function MaintenanceSettingsForm({ translations }: MaintenanceSettingsFormProps) {
    const [activeLang, setActiveLang] = useState<"en" | "ar">("en");
    const [titleEn, setTitleEn] = useState("We are on Scheduled Maintenance");
    const [titleAr, setTitleAr] = useState("نحن في صيانة مجدولة");
    const [descEn, setDescEn] = useState("We will be back shortly. Thank you for your patience.");
    const [descAr, setDescAr] = useState("سنعود قريبا. شكرا لصبركم.");
    const [date, setDate] = useState("2025-01-15");

    // Mock image states
    const [logo, setLogo] = useState<string | null>("/assets/images/maintenance-logo.png");
    const [bgImage, setBgImage] = useState<string | null>("/assets/images/maintenance-bg.png");

    const handleFileUpload = (type: "logo" | "bg") => {
        const inputId = type === "logo" ? "logo-upload" : "bg-upload";
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) input.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "bg") => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result as string) {
                    if (type === "logo") setLogo(ev.target!.result as string);
                    else setBgImage(ev.target!.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">{translations.title}</h2>

            <LanguageTabs
                activeTab={activeLang}
                onTabChange={setActiveLang}
                labels={{ english: "English (UK)", arabic: "العربية" }}
            />

            <div className="space-y-6 mt-6">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.page_title}</Label>
                    <Input
                        value={activeLang === 'en' ? titleEn : titleAr}
                        onChange={(e) => activeLang === 'en' ? setTitleEn(e.target.value) : setTitleAr(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.description}</Label>
                    <Textarea
                        value={activeLang === 'en' ? descEn : descAr}
                        onChange={(e) => activeLang === 'en' ? setDescEn(e.target.value) : setDescAr(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40 min-h-[100px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.coming_back_date}</Label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40 w-full max-w-xs"
                    />
                </div>

                {/* Maintenance Logo */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.maintenance_logo}</Label>
                    <div className="flex flex-col gap-3">
                        {logo ? (
                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border/40 group">
                                <Image
                                    src={logo}
                                    alt="Maintenance Logo"
                                    fill
                                    className="object-contain bg-muted/20"
                                />
                                <button
                                    onClick={() => setLogo(null)}
                                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-40 h-24 rounded-lg border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/10 text-muted-foreground">
                                <span className="text-xs">No Image</span>
                            </div>
                        )}
                        <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, "logo")} />
                        <Button
                            type="button"
                            onClick={() => handleFileUpload("logo")}
                            size="sm"
                            className="w-fit bg-primary hover:bg-primary/90 rounded-lg"
                        >
                            {logo ? translations.change : "Upload"}
                        </Button>
                    </div>
                </div>

                {/* Maintenance Background Image */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.maintenance_bg_image}</Label>
                    <div className="flex flex-col gap-3">
                        {bgImage ? (
                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border/40 group">
                                <Image
                                    src={bgImage}
                                    alt="Maintenance Background"
                                    fill
                                    className="object-cover bg-muted/20"
                                />
                                <button
                                    onClick={() => setBgImage(null)}
                                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-40 h-24 rounded-lg border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/10 text-muted-foreground">
                                <span className="text-xs">No Image</span>
                            </div>
                        )}
                        <input type="file" id="bg-upload" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, "bg")} />
                        <Button
                            type="button"
                            onClick={() => handleFileUpload("bg")}
                            size="sm"
                            className="w-fit bg-primary hover:bg-primary/90 rounded-lg"
                        >
                            {bgImage ? translations.change : "Upload"}
                        </Button>
                    </div>
                </div>

                <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary/90 rounded-lg w-full sm:w-auto px-8">
                        {translations.update_settings}
                    </Button>
                </div>
            </div>
        </div>
    );
}
