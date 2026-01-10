"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageTabs } from "../widget-builder/widgets/LanguageTabs";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface NotFoundSettingsFormProps {
    translations: {
        title: string;
        page_title: string;
        button_text: string;
        site_logo: string;
        update_settings: string;
        change: string;
        image_alt: string;
    };
}

export function NotFoundSettingsForm({ translations }: NotFoundSettingsFormProps) {
    const [activeLang, setActiveLang] = useState<"en" | "ar">("en");
    const [titleEn, setTitleEn] = useState("Opps page not found");
    const [titleAr, setTitleAr] = useState("عذراً، الصفحة غير موجودة");
    const [btnTextEn, setBtnTextEn] = useState("Go Back");
    const [btnTextAr, setBtnTextAr] = useState("رجوع");

    // Mock image state
    const [image, setImage] = useState<string | null>("/assets/images/404.png");

    const handleImageUpload = () => {
        // Find input
        const input = document.getElementById('logo-upload') as HTMLInputElement;
        if (input) input.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result as string) {
                    setImage(e.target!.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
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
                    <Label className="text-sm font-semibold">{translations.button_text}</Label>
                    <Input
                        value={activeLang === 'en' ? btnTextEn : btnTextAr}
                        onChange={(e) => activeLang === 'en' ? setBtnTextEn(e.target.value) : setBtnTextAr(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.site_logo}</Label>
                    <div className="flex flex-col gap-3">
                        {image ? (
                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border/40 group">
                                <Image
                                    src={image}
                                    alt={translations.image_alt}
                                    fill
                                    className="object-contain bg-muted/20"
                                />
                                <button
                                    onClick={handleRemoveImage}
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

                        <input
                            type="file"
                            id="logo-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <Button
                            type="button"
                            onClick={handleImageUpload}
                            size="sm"
                            className="w-fit bg-primary hover:bg-primary/90 rounded-lg"
                        >
                            {image ? translations.change : "Upload"}
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
