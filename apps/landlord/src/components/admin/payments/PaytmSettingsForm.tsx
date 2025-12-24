"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import Image from "next/image";

import { useTranslations } from "next-intl";

export function PaytmSettingsForm() {
    const t = useTranslations("Admin.PaymentManage.form");
    const tp = useTranslations("Admin.PaymentManage.form.paytm");
    const [logo, setLogo] = useState<string | null>("/assets/images/paytm-logo.png");

    const [merchantKey, setMerchantKey] = useState("YOUR_MERCHANT_KEY");
    const [merchantMid, setMerchantMid] = useState("YOUR_MERCHANT_MID");
    const [merchantWebsite, setMerchantWebsite] = useState("WEBSTAGING");
    const [channel, setChannel] = useState("");
    const [industryType, setIndustryType] = useState("");

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
            <h1 className="text-2xl font-bold">Paytm</h1>

            {/* Info Banner */}
            <div className="bg-brand-orange/10 border-l-4 border-brand-orange px-4 py-3 rounded-r-lg">
                <p className="text-sm text-foreground/80">
                    {tp("info_banner")}
                </p>
            </div>

            {/* Enable/Disable Paytm */}
            <div className="border border-border/40 p-4 rounded-2xl">
                <div className="flex flex-col gap-2">
                    <label htmlFor="paytmStatus">{tp("enable_paytm")}</label>
                    <Switch id="paytmStatus" className="data-[state=unchecked]:dark:bg-white/40" defaultChecked />
                </div>
            </div>

            {/* Enable Test Mode Paytm */}
            <div className="border border-border/40 p-4 rounded-2xl">
                <div className="flex flex-col gap-2">
                    <label htmlFor="paytmTestMode">{tp("enable_test_mode")}</label>
                    <Switch id="paytmTestMode" className="data-[state=unchecked]:dark:bg-white/40" defaultChecked />
                </div>
            </div>

            {/* Logo Paytm */}
            <div className="flex flex-col gap-2">
                <label>{tp("logo_paytm")}</label>
                <div className="flex flex-col gap-3">
                    {logo ? (
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-border/40 group bg-white p-2">
                            <Image
                                src={logo}
                                alt="Paytm Logo"
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

            {/* Merchant key */}
            <div className="flex flex-col gap-2">
                <label htmlFor="merchantKey">{tp("merchant_key")}</label>
                <Input
                    id="merchantKey"
                    value={merchantKey}
                    onChange={(e) => setMerchantKey(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Merchant mid */}
            <div className="flex flex-col gap-2">
                <label htmlFor="merchantMid">{tp("merchant_mid")}</label>
                <Input
                    id="merchantMid"
                    value={merchantMid}
                    onChange={(e) => setMerchantMid(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Merchant website */}
            <div className="flex flex-col gap-2">
                <label htmlFor="merchantWebsite">{tp("merchant_website")}</label>
                <Input
                    id="merchantWebsite"
                    value={merchantWebsite}
                    onChange={(e) => setMerchantWebsite(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Channel */}
            <div className="flex flex-col gap-2">
                <label htmlFor="channel">{tp("channel")}</label>
                <Input
                    id="channel"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            {/* Industry type */}
            <div className="flex flex-col gap-2">
                <label htmlFor="industryType">{tp("industry_type")}</label>
                <Input
                    id="industryType"
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            <Button className="mt-4">{t("update_changes")}</Button>
        </div>
    );
}
