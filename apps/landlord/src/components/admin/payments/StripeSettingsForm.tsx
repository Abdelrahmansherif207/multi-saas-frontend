"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import Image from "next/image";

import { useTranslations } from "next-intl";

export function StripeSettingsForm() {
    const t = useTranslations("Admin.PaymentManage.form");
    const ts = useTranslations("Admin.PaymentManage.form.stripe");
    const [logo, setLogo] = useState<string | null>("/assets/images/stripe-logo.png");

    const [publicKey, setPublicKey] = useState("pk_test_YOUR_PUBLIC_KEY");
    const [secretKey, setSecretKey] = useState("sk_test_YOUR_SECRET_KEY");

    const handleFileUpload = () => {
        const input = document.getElementById("logo-upload") as HTMLInputElement;
        if (input) input.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setLogo(ev.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium text-muted-foreground">{ts("gateway_settings")}</h2>
                <h1 className="text-2xl font-bold">Stripe</h1>
            </div>

            {/* Enable/Disable Stripe */}
            <div className="border border-border/40 p-4 rounded-2xl">
                <div className="flex flex-col gap-2">
                    <label htmlFor="stripeStatus">{ts("enable_stripe")}</label>
                    <Switch id="stripeStatus" className="data-[state=unchecked]:dark:bg-white/40" defaultChecked />
                </div>
            </div>

            {/* Enable Test Mode Stripe */}
            <div className="border border-border/40 p-4 rounded-2xl">
                <div className="flex flex-col gap-2">
                    <label htmlFor="stripeTestMode">{ts("enable_test_mode")}</label>
                    <Switch id="stripeTestMode" className="data-[state=unchecked]:dark:bg-white/40" defaultChecked />
                </div>
            </div>

            {/* Logo Stripe */}
            <div className="flex flex-col gap-2">
                <label>{ts("logo_stripe")}</label>
                <div className="flex flex-col gap-3">
                    {logo ? (
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-border/40 group bg-white p-2">
                            <Image
                                src={logo}
                                alt="Stripe Logo"
                                fill
                                className="object-contain"
                            />
                            <button
                                onClick={() => setLogo(null)}
                                className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ) : (
                        <div className="w-24 h-16 rounded-lg border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/10 text-muted-foreground">
                            <span className="text-xs">{t("no_image")}</span>
                        </div>
                    )}
                    <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                    <Button
                        type="button"
                        onClick={handleFileUpload}
                        size="sm"
                        className="w-fit bg-primary hover:bg-primary/90 rounded-lg text-xs h-8"
                    >
                        {t("change_image")}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        {t("allowed_image_format")}<br />
                        {t("allowed_image_size")}
                    </p>
                </div>
            </div>

            {/* Public key */}
            <div className="flex flex-col gap-2">
                <label htmlFor="publicKey">{ts("public_key")}</label>
                <Input
                    id="publicKey"
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Secret key */}
            <div className="flex flex-col gap-2">
                <label htmlFor="secretKey">{ts("secret_key")}</label>
                <Input
                    id="secretKey"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    type="text"
                    className="rounded-lg"
                />
            </div>

            <Button className="mt-4">{t("update_changes")}</Button>
        </div>
    );
}
