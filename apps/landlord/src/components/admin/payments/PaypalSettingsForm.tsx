"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import Image from "next/image";

import { useTranslations } from "next-intl";

export function PaypalSettingsForm() {
    const t = useTranslations("Admin.PaymentManage.form");
    const tp = useTranslations("Admin.PaymentManage.form.paypal");
    const [logo, setLogo] = useState<string | null>("/assets/images/paypal-logo.png");

    // Sandbox credentials
    const [sandboxClientId, setSandboxClientId] = useState("YOUR_SANDBOX_CLIENT_ID");
    const [sandboxClientSecret, setSandboxClientSecret] = useState("YOUR_SANDBOX_CLIENT_SECRET");
    const [sandboxAppId, setSandboxAppId] = useState("");

    // Live credentials
    const [liveClientId, setLiveClientId] = useState("");
    const [liveClientSecret, setLiveClientSecret] = useState("");
    const [liveAppId, setLiveAppId] = useState("");

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
            {/* Info Banner */}
            <div className="bg-brand-orange/10 border-l-4 border-brand-orange px-4 py-3 rounded-r-lg">
                <p className="text-sm text-foreground/80">
                    {tp("info_banner")}
                </p>
            </div>

            {/* Enable/Disable PayPal */}
            <div className="border border-border/40 p-4 rounded-2xl">
                <div className="flex flex-col gap-2">
                    <label htmlFor="paypalStatus">{tp("enable_paypal")}</label>
                    <Switch id="paypalStatus" className="data-[state=unchecked]:dark:bg-white/40" defaultChecked />
                </div>
            </div>

            {/* Enable Test Mode PayPal */}
            <div className="border border-border/40 p-4 rounded-2xl">
                <div className="flex flex-col gap-2">
                    <label htmlFor="paypalTestMode">{tp("enable_test_mode")}</label>
                    <Switch id="paypalTestMode" className="data-[state=unchecked]:dark:bg-white/40" defaultChecked />
                </div>
            </div>

            {/* Logo PayPal */}
            <div className="flex flex-col gap-2">
                <label>{tp("logo_paypal")}</label>
                <div className="flex flex-col gap-3">
                    {logo ? (
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-border/40 group bg-white p-2">
                            <Image
                                src={logo}
                                alt="PayPal Logo"
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

            {/* Sandbox client id */}
            <div className="flex flex-col gap-2">
                <label htmlFor="sandboxClientId">{tp("sandbox_client_id")}</label>
                <Input
                    id="sandboxClientId"
                    value={sandboxClientId}
                    onChange={(e) => setSandboxClientId(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Sandbox client secret */}
            <div className="flex flex-col gap-2">
                <label htmlFor="sandboxClientSecret">{tp("sandbox_client_secret")}</label>
                <Input
                    id="sandboxClientSecret"
                    value={sandboxClientSecret}
                    onChange={(e) => setSandboxClientSecret(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Sandbox app id */}
            <div className="flex flex-col gap-2">
                <label htmlFor="sandboxAppId">{tp("sandbox_app_id")}</label>
                <Input
                    id="sandboxAppId"
                    value={sandboxAppId}
                    onChange={(e) => setSandboxAppId(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Live client id */}
            <div className="flex flex-col gap-2">
                <label htmlFor="liveClientId">{tp("live_client_id")}</label>
                <Input
                    id="liveClientId"
                    value={liveClientId}
                    onChange={(e) => setLiveClientId(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Live client secret */}
            <div className="flex flex-col gap-2">
                <label htmlFor="liveClientSecret">{tp("live_client_secret")}</label>
                <Input
                    id="liveClientSecret"
                    value={liveClientSecret}
                    onChange={(e) => setLiveClientSecret(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Live app id */}
            <div className="flex flex-col gap-2">
                <label htmlFor="liveAppId">{tp("live_app_id")}</label>
                <Input
                    id="liveAppId"
                    value={liveAppId}
                    onChange={(e) => setLiveAppId(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            <Button className="mt-4">{t("update_changes")}</Button>
        </div>
    );
}
