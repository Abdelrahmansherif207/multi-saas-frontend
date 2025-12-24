"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface TopbarSettingsFormProps {
    translations: {
        title: string;
        phone: string;
        email: string;
        facebook_url: string;
        instagram_url: string;
        linkedin_url: string;
        twitter_url: string;
        enable_contact_info: string;
        enable_language: string;
        enable_social_info: string;
        enable_full_topbar: string;
        update_settings: string;
    };
}

export function TopbarSettingsForm({ translations }: TopbarSettingsFormProps) {
    const [phone, setPhone] = useState("0155411110");
    const [email, setEmail] = useState("example@example.com");
    const [facebookUrl, setFacebookUrl] = useState("#");
    const [instagramUrl, setInstagramUrl] = useState("#");
    const [linkedinUrl, setLinkedinUrl] = useState("#");
    const [twitterUrl, setTwitterUrl] = useState("#");

    const [enableContact, setEnableContact] = useState(true);
    const [enableLanguage, setEnableLanguage] = useState(true);
    const [enableSocial, setEnableSocial] = useState(true);
    const [enableFullTopbar, setEnableFullTopbar] = useState(true);

    return (
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">{translations.title}</h2>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.phone}</Label>
                    <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.email}</Label>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.facebook_url}</Label>
                    <Input
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.instagram_url}</Label>
                    <Input
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.linkedin_url}</Label>
                    <Input
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold">{translations.twitter_url}</Label>
                    <Input
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                        className="rounded-lg bg-background/50 border-border/40"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-semibold">{translations.enable_contact_info}</Label>
                        <div className="flex items-center gap-2">
                            <Switch checked={enableContact} onCheckedChange={setEnableContact} className="data-[state=checked]:bg-primary" />
                            <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                {enableContact ? "YES" : "NO"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-semibold">{translations.enable_language}</Label>
                        <div className="flex items-center gap-2">
                            <Switch checked={enableLanguage} onCheckedChange={setEnableLanguage} className="data-[state=checked]:bg-primary" />
                            <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                {enableLanguage ? "YES" : "NO"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-semibold">{translations.enable_social_info}</Label>
                        <div className="flex items-center gap-2">
                            <Switch checked={enableSocial} onCheckedChange={setEnableSocial} className="data-[state=checked]:bg-primary" />
                            <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                {enableSocial ? "YES" : "NO"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-semibold">{translations.enable_full_topbar}</Label>
                        <div className="flex items-center gap-2">
                            <Switch checked={enableFullTopbar} onCheckedChange={setEnableFullTopbar} className="data-[state=checked]:bg-primary" />
                            <span className="text-sm font-medium px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                {enableFullTopbar ? "YES" : "NO"}
                            </span>
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
