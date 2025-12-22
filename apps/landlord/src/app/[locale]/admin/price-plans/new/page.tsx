"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useState } from "react";

const features = [
    "Dashboard", "Admin", "User", "Brand", "Newsletter", "Custom Domain",
    "Testimonial", "Form Builder", "Own Order Manage", "Page", "Blog",
    "Service", "Donation", "Job", "Appointment", "Events", "Support Ticket",
    "Knowledgebase", "FAQ", "Gallery", "Video", "Portfolio", "ECommerce",
    "Storage", "Advertisement", "Wedding Price Plan", "Appearance Settings",
    "General Settings", "Language", "Payment Gateways", "Themes", "Hotel Booking"
];

export default function NewPricePlanPage() {
    const t = useTranslations("Admin.PricePlanManage.NewPlan");
    const tMenu = useTranslations("Admin.PricePlanManage.menu");

    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [hasTrial, setHasTrial] = useState(false);
    const [hasPrice, setHasPrice] = useState(false);

    const toggleFeature = (feature: string) => {
        setSelectedFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("new_plan"), href: "/admin/price-plans/new" }
            ]}
        >
            <div className="space-y-6">
                {/* Warning Banners */}
                <div className="space-y-3">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-amber-600 dark:text-amber-400 text-sm">
                        {t("warning_features")}
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-600 dark:text-blue-400 text-sm">
                        {t("warning_trial")}
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6 space-y-6">
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title" className="text-sm font-medium text-foreground">
                            {t("form.title")}
                        </Label>
                        <Input id="title" placeholder={t("form.title_placeholder")} />
                    </div>

                    {/* Subtitle */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="subtitle" className="text-sm font-medium text-foreground">
                            {t("form.subtitle")}
                        </Label>
                        <Input id="subtitle" placeholder={t("form.subtitle_placeholder")} />
                    </div>

                    {/* Select Features */}
                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-medium text-foreground">
                            {t("form.select_features")}
                        </Label>
                        <div className="flex flex-wrap gap-3">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                    <Checkbox
                                        id={feature}
                                        checked={selectedFeatures.includes(feature)}
                                        onCheckedChange={() => toggleFeature(feature)}
                                    />
                                    <Label htmlFor={feature} className="text-sm cursor-pointer">
                                        {feature}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Type */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-foreground">
                            {t("form.type")}
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full max-w-xs">
                                <SelectValue placeholder={t("form.type_placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                                <SelectItem value="lifetime">Lifetime</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Has Trial */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-foreground">
                            {t("form.has_trial")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Switch checked={hasTrial} onCheckedChange={setHasTrial} />
                            <span className="text-sm text-muted-foreground">
                                {hasTrial ? t("form.yes") : t("form.no")}
                            </span>
                        </div>
                    </div>

                    {/* Has Price */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-foreground">
                            {t("form.has_price")}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Switch checked={hasPrice} onCheckedChange={setHasPrice} />
                            <span className="text-sm text-muted-foreground">
                                {hasPrice ? t("form.yes") : t("form.no")}
                            </span>
                        </div>
                        {hasPrice && (
                            <div className="flex flex-col gap-2 mt-2">
                                <Label htmlFor="price" className="text-sm font-medium text-foreground">
                                    {t("form.price")}
                                </Label>
                                <Input id="price" type="number" placeholder="0" className="max-w-xs" />
                            </div>
                        )}
                    </div>

                    {/* Limit */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-foreground">
                            {t("form.limit")}
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full max-w-xs">
                                <SelectValue placeholder={t("form.limit_placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="starter">Starter</SelectItem>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="unlimited">Unlimited</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* FAQ Title */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="faq-title" className="text-sm font-medium text-foreground">
                            {t("form.faq_title")}
                        </Label>
                        <Input id="faq-title" placeholder={t("form.faq_title_placeholder")} />
                    </div>

                    {/* FAQ Description */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="faq-description" className="text-sm font-medium text-foreground">
                            {t("form.faq_description")}
                        </Label>
                        <Textarea
                            id="faq-description"
                            placeholder={t("form.faq_description_placeholder")}
                            rows={4}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                        {t("form.save_changes")}
                    </Button>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
