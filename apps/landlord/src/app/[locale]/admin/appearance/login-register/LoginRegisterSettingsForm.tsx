"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LanguageTabs } from "../widget-builder/widgets/LanguageTabs";
import { X } from "lucide-react";
import Image from "next/image";

interface LoginRegisterSettingsFormProps {
    translations: {
        title: string;
        login_title: string;
        register_title: string;
        feature_title_one: string;
        feature_desc_one: string;
        feature_title_two: string;
        feature_desc_two: string;
        feature_title_three: string;
        feature_desc_three: string;
        feature_image_one: string;
        feature_image_two: string;
        feature_image_three: string;
        enable_facebook_login: string;
        enable_google_login: string;
        enable_recaptcha: string;
        update_settings: string;
        change: string;
        remove: string;
    };
}

export function LoginRegisterSettingsForm({ translations }: LoginRegisterSettingsFormProps) {
    const [activeLang, setActiveLang] = useState<"en" | "ar">("en");

    // Login/Register Titles
    const [loginTitleEn, setLoginTitleEn] = useState("Login to your Account");
    const [loginTitleAr, setLoginTitleAr] = useState("تسجيل الدخول إلى حسابك");
    const [registerTitleEn, setRegisterTitleEn] = useState("Register new Account");
    const [registerTitleAr, setRegisterTitleAr] = useState("تسجيل حساب جديد");

    // Feature One
    const [featTitleOneEn, setFeatTitleOneEn] = useState("Create your account");
    const [featTitleOneAr, setFeatTitleOneAr] = useState("أنشئ حسابك");
    const [featDescOneEn, setFeatDescOneEn] = useState("Sed sit perspiciatis unde omnis iste natus error sit voluptatem.");
    const [featDescOneAr, setFeatDescOneAr] = useState("ولكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة.");

    // Feature Two
    const [featTitleTwoEn, setFeatTitleTwoEn] = useState("Easily Customized");
    const [featTitleTwoAr, setFeatTitleTwoAr] = useState("سهولة التخصيص");
    const [featDescTwoEn, setFeatDescTwoEn] = useState("Sed sit perspiciatis unde omnis iste natus error sit voluptatem.");
    const [featDescTwoAr, setFeatDescTwoAr] = useState("ولكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة.");

    // Feature Three
    const [featTitleThreeEn, setFeatTitleThreeEn] = useState("Build for Impact");
    const [featTitleThreeAr, setFeatTitleThreeAr] = useState("بنيت للتأثير");
    const [featDescThreeEn, setFeatDescThreeEn] = useState("Sed sit perspiciatis unde omnis iste natus error sit voluptatem.");
    const [featDescThreeAr, setFeatDescThreeAr] = useState("ولكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة.");

    // Toggles
    const [enableFb, setEnableFb] = useState(true);
    const [enableGoogle, setEnableGoogle] = useState(true);
    const [enableRecaptcha, setEnableRecaptcha] = useState(false);

    // Images
    const [img1, setImg1] = useState<string | null>("/assets/images/feat1.png");
    const [img2, setImg2] = useState<string | null>("/assets/images/feat2.png");
    const [img3, setImg3] = useState<string | null>("/assets/images/feat3.png");

    const handleFileUpload = (index: 1 | 2 | 3) => {
        const input = document.getElementById(`img-upload-${index}`) as HTMLInputElement;
        if (input) input.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: 1 | 2 | 3) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result as string) {
                    if (index === 1) setImg1(e.target!.result as string);
                    if (index === 2) setImg2(e.target!.result as string);
                    if (index === 3) setImg3(e.target!.result as string);
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
                {/* Titles */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.login_title}</Label>
                    <Input
                        value={activeLang === 'en' ? loginTitleEn : loginTitleAr}
                        onChange={(e) => activeLang === 'en' ? setLoginTitleEn(e.target.value) : setLoginTitleAr(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.register_title}</Label>
                    <Input
                        value={activeLang === 'en' ? registerTitleEn : registerTitleAr}
                        onChange={(e) => activeLang === 'en' ? setRegisterTitleEn(e.target.value) : setRegisterTitleAr(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                {/* Feature One */}
                <div className="pt-4 border-t border-border/20">
                    <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Feature One</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">{translations.feature_title_one}</Label>
                            <Input
                                value={activeLang === 'en' ? featTitleOneEn : featTitleOneAr}
                                onChange={(e) => activeLang === 'en' ? setFeatTitleOneEn(e.target.value) : setFeatTitleOneAr(e.target.value)}
                                className="rounded-lg bg-background/50 border-border/40"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">{translations.feature_desc_one}</Label>
                            <Input
                                value={activeLang === 'en' ? featDescOneEn : featDescOneAr}
                                onChange={(e) => activeLang === 'en' ? setFeatDescOneEn(e.target.value) : setFeatDescOneAr(e.target.value)}
                                className="rounded-lg bg-background/50 border-border/40"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Two */}
                <div className="pt-4 border-t border-border/20">
                    <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Feature Two</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">{translations.feature_title_two}</Label>
                            <Input
                                value={activeLang === 'en' ? featTitleTwoEn : featTitleTwoAr}
                                onChange={(e) => activeLang === 'en' ? setFeatTitleTwoEn(e.target.value) : setFeatTitleTwoAr(e.target.value)}
                                className="rounded-lg bg-background/50 border-border/40"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">{translations.feature_desc_two}</Label>
                            <Input
                                value={activeLang === 'en' ? featDescTwoEn : featDescTwoAr}
                                onChange={(e) => activeLang === 'en' ? setFeatDescTwoEn(e.target.value) : setFeatDescTwoAr(e.target.value)}
                                className="rounded-lg bg-background/50 border-border/40"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Three */}
                <div className="pt-4 border-t border-border/20">
                    <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Feature Three</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">{translations.feature_title_three}</Label>
                            <Input
                                value={activeLang === 'en' ? featTitleThreeEn : featTitleThreeAr}
                                onChange={(e) => activeLang === 'en' ? setFeatTitleThreeEn(e.target.value) : setFeatTitleThreeAr(e.target.value)}
                                className="rounded-lg bg-background/50 border-border/40"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">{translations.feature_desc_three}</Label>
                            <Input
                                value={activeLang === 'en' ? featDescThreeEn : featDescThreeAr}
                                onChange={(e) => activeLang === 'en' ? setFeatDescThreeEn(e.target.value) : setFeatDescThreeAr(e.target.value)}
                                className="rounded-lg bg-background/50 border-border/40"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">{translations.feature_image_one}</Label>
                        <div className="flex flex-col gap-3">
                            {img1 ? (
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border/40 group">
                                    <Image src={img1} alt="Feature 1" fill className="object-cover bg-muted/20" />
                                    <button onClick={() => setImg1(null)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/10 text-muted-foreground">
                                    <span className="text-xs">No Image</span>
                                </div>
                            )}
                            <input type="file" id="img-upload-1" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 1)} />
                            <Button type="button" onClick={() => handleFileUpload(1)} size="sm" className="w-fit bg-primary hover:bg-primary/90 rounded-lg">{img1 ? translations.change : "Upload"}</Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">{translations.feature_image_two}</Label>
                        <div className="flex flex-col gap-3">
                            {img2 ? (
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border/40 group">
                                    <Image src={img2} alt="Feature 2" fill className="object-cover bg-muted/20" />
                                    <button onClick={() => setImg2(null)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/10 text-muted-foreground">
                                    <span className="text-xs">No Image</span>
                                </div>
                            )}
                            <input type="file" id="img-upload-2" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 2)} />
                            <Button type="button" onClick={() => handleFileUpload(2)} size="sm" className="w-fit bg-primary hover:bg-primary/90 rounded-lg">{img2 ? translations.change : "Upload"}</Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">{translations.feature_image_three}</Label>
                        <div className="flex flex-col gap-3">
                            {img3 ? (
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border/40 group">
                                    <Image src={img3} alt="Feature 3" fill className="object-cover bg-muted/20" />
                                    <button onClick={() => setImg3(null)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/10 text-muted-foreground">
                                    <span className="text-xs">No Image</span>
                                </div>
                            )}
                            <input type="file" id="img-upload-3" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 3)} />
                            <Button type="button" onClick={() => handleFileUpload(3)} size="sm" className="w-fit bg-primary hover:bg-primary/90 rounded-lg">{img3 ? translations.change : "Upload"}</Button>
                        </div>
                    </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-semibold">{translations.enable_facebook_login}</Label>
                        <div className="flex items-center gap-2">
                            <Switch checked={enableFb} onCheckedChange={setEnableFb} className="data-[state=checked]:bg-primary" />
                            <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{enableFb ? "YES" : "NO"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-semibold">{translations.enable_google_login}</Label>
                        <div className="flex items-center gap-2">
                            <Switch checked={enableGoogle} onCheckedChange={setEnableGoogle} className="data-[state=checked]:bg-primary" />
                            <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{enableGoogle ? "YES" : "NO"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-semibold">{translations.enable_recaptcha}</Label>
                        <div className="flex items-center gap-2">
                            <Switch checked={enableRecaptcha} onCheckedChange={setEnableRecaptcha} className="data-[state=checked]:bg-primary" />
                            <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{enableRecaptcha ? "YES" : "NO"}</span>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <Button className="bg-primary hover:bg-primary/90 rounded-lg w-full sm:w-auto px-8">
                        {translations.update_settings}
                    </Button>
                </div>
            </div>
        </div>
    );
}
