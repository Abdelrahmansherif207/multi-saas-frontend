"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface CreateWebsiteModalProps {
    btnText: string;
    btnClassName?: string;
}

export function CreateWebsiteModal({ btnText, btnClassName }: CreateWebsiteModalProps) {
    const [open, setOpen] = useState(false);
    const t = useTranslations('Dashboard.CreateWebsite');

    const [formData, setFormData] = useState({
        package: "",
        domain: "",
        theme: "",
        paymentGateway: "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // console.log(formData);
        // TODO: Handle submission
        setOpen(false);
    }

    // Mock data
    const packages = ["basic", "standard", "premium"];
    const themes = ["modern", "classic", "minimal"];
    const gateways = ["stripe", "paypal", "cod"];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={btnClassName}>
                    {btnText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">

                    {/* Package Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="package">{t('labels.package')}</Label>
                        <Select
                            value={formData.package}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, package: value }))}
                        >
                            <SelectTrigger id="package">
                                <SelectValue placeholder={t('placeholders.package')} />
                            </SelectTrigger>
                            <SelectContent>
                                {packages.map((pkg) => (
                                    <SelectItem key={pkg} value={pkg}>
                                        {t(`options.packages.${pkg}`)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Domain Input */}
                    <div className="space-y-2">
                        <Label htmlFor="domain">{t('labels.domain')}</Label>
                        <Input
                            id="domain"
                            placeholder={t('placeholders.domain')}
                            value={formData.domain}
                            onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                        />
                    </div>

                    {/* Theme Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="theme">{t('labels.theme')}</Label>
                        <Select
                            value={formData.theme}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
                        >
                            <SelectTrigger id="theme">
                                <SelectValue placeholder={t('placeholders.theme')} />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map((theme) => (
                                    <SelectItem key={theme} value={theme}>
                                        {t(`options.themes.${theme}`)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Payment Gateway Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="gateway">{t('labels.payment_gateway')}</Label>
                        <Select
                            value={formData.paymentGateway}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, paymentGateway: value }))}
                        >
                            <SelectTrigger id="gateway">
                                <SelectValue placeholder={t('placeholders.payment_gateway')} />
                            </SelectTrigger>
                            <SelectContent>
                                {gateways.map((gw) => (
                                    <SelectItem key={gw} value={gw}>
                                        {t(`options.gateways.${gw}`)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                            {t('buttons.cancel')}
                        </Button>
                        <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                            {t('buttons.create')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
