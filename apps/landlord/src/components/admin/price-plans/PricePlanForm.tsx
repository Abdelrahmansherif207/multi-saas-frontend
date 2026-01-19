'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { useTranslations } from "next-intl";

const featuresList = [
    "Dashboard", "Admin", "User", "Brand", "Newsletter", "Custom Domain",
    "Testimonial", "Form Builder", "Own Order Manage", "Page", "Blog",
    "Service", "Donation", "Job", "Appointment", "Events", "Support Ticket",
    "Knowledgebase", "FAQ", "Gallery", "Video", "Portfolio", "ECommerce",
    "Storage", "Advertisement", "Wedding Price Plan", "Appearance Settings",
    "General Settings", "Language", "Payment Gateways", "Themes", "Hotel Booking"
];

interface PricePlanFormProps {
    initialData?: any;
    submitAction: (data: any) => Promise<{ success: boolean; message: string }>;
    locale: string;
}

export function PricePlanForm({ initialData, submitAction, locale }: PricePlanFormProps) {
    const t = useTranslations("Admin.PricePlanManage.NewPlan");
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        title: initialData?.title ?? '',
        subtitle: initialData?.subtitle ?? '',
        price: initialData?.price ?? 0,
        type: initialData?.type ?? 'monthly',
        features: initialData?.features ?? [],
        has_trial: initialData?.has_trial ?? false,
        has_price: initialData?.has_price ?? true,
        limit: initialData?.limit ?? 'basic',
        faq_title: initialData?.faq_title ?? '',
        faq_description: initialData?.faq_description ?? '',
        status: initialData?.status ?? 'active',
    });

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleFeatureChange = (feature: string, checked: boolean) => {
        setFormData(prev => {
            const newFeatures = checked
                ? [...prev.features, feature]
                : prev.features.filter((f: string) => f !== feature);
            return { ...prev, features: newFeatures };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        startTransition(async () => {
            const result = await submitAction(formData);
            if (result.success) {
                setMessage({ type: 'success', text: result.message || t("form.success") });
                router.refresh();
                if (!initialData) {
                    // Redirect on create
                    setTimeout(() => router.push(`/${locale}/admin/price-plans`), 1000);
                }
            } else {
                setMessage({ type: 'error', text: result.message || t("form.error") });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm p-6 space-y-6">
            {message && (
                <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'}`}>
                    {message.text}
                </div>
            )}

            {/* Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="title">{t("form.title")}</Label>
                    <Input
                        id="title"
                        value={formData.title ?? ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder={t("form.title_placeholder")}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subtitle">{t("form.subtitle")}</Label>
                    <Input
                        id="subtitle"
                        value={formData.subtitle ?? ''}
                        onChange={(e) => handleChange('subtitle', e.target.value)}
                        placeholder={t("form.subtitle_placeholder")}
                    />
                </div>
            </div>

            {/* Price & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="price">{t("form.price")}</Label>
                    <Input
                        id="price"
                        type="number"
                        value={formData.price ?? 0}
                        onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                        disabled={!formData.has_price}
                    />
                </div>
                <div className="space-y-2">
                    <Label>{t("form.type")}</Label>
                    <Select value={formData.type} onValueChange={(val) => handleChange('type', val)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t("form.type_placeholder")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="lifetime">Lifetime</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Switches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label>{t("form.has_price")}</Label>
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={formData.has_price}
                            onCheckedChange={(checked) => handleChange('has_price', checked)}
                        />
                        <span className="text-sm text-muted-foreground">{formData.has_price ? t("form.yes") : t("form.no")}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>{t("form.has_trial")}</Label>
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={formData.has_trial}
                            onCheckedChange={(checked) => handleChange('has_trial', checked)}
                        />
                        <span className="text-sm text-muted-foreground">{formData.has_trial ? t("form.yes") : t("form.no")}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Status (Active)</Label>
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={formData.status === 'active'}
                            onCheckedChange={(checked) => handleChange('status', checked ? 'active' : 'inactive')}
                        />
                        <span className="text-sm text-muted-foreground">{formData.status === 'active' ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
            </div>

            {/* Limit */}
            <div className="space-y-2">
                <Label>{t("form.limit")}</Label>
                <Select value={formData.limit} onValueChange={(val) => handleChange('limit', val)}>
                    <SelectTrigger>
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

            {/* Features */}
            <div className="space-y-3">
                <Label>{t("form.select_features")}</Label>
                <div className="flex flex-wrap gap-3 bg-muted/20 p-4 rounded-lg border border-border/50">
                    {featuresList.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 bg-card p-2 rounded border border-border/50">
                            <Checkbox
                                id={feature}
                                checked={formData.features.includes(feature)}
                                onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                            />
                            <Label htmlFor={feature} className="text-sm cursor-pointer font-normal">
                                {feature}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="faq-title">{t("form.faq_title")}</Label>
                    <Input
                        id="faq-title"
                        value={formData.faq_title ?? ''}
                        onChange={(e) => handleChange('faq_title', e.target.value)}
                        placeholder={t("form.faq_title_placeholder")}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="faq-description">{t("form.faq_description")}</Label>
                    <Textarea
                        id="faq-description"
                        value={formData.faq_description ?? ''}
                        onChange={(e) => handleChange('faq_description', e.target.value)}
                        placeholder={t("form.faq_description_placeholder")}
                        rows={4}
                    />
                </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("form.saving")}
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        {t("form.submit")}
                    </>
                )}
            </Button>
        </form>
    );
}
