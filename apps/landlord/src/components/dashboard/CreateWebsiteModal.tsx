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
import { useState, useEffect } from "react";
import { tenantService } from "@/lib/services/tenants";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { PricePlan, ThemeOption } from "@/types/subscription";

interface CreateWebsiteModalProps {
    btnText: string;
    btnClassName?: string;
}

type SubscriptionStep = 'form' | 'processing' | 'success' | 'error';

interface FormState {
    plan_id: string;
    subdomain: string;
    theme: string;
    theme_code: string;
}

export function CreateWebsiteModal({ btnText, btnClassName }: CreateWebsiteModalProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [databaseCreating, setDatabaseCreating] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const t = useTranslations('Dashboard.CreateWebsite');

    // API data
    const [plans, setPlans] = useState<PricePlan[]>([]);
    const [themes, setThemes] = useState<ThemeOption[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Form state
    const [formData, setFormData] = useState<FormState>({
        plan_id: "",
        subdomain: "",
        theme: "default",
        theme_code: "#FF5733",
    });

    // Submission state
    const [step, setStep] = useState<SubscriptionStep>('form');
    const [error, setError] = useState<string | null>(null);
    const [tenantUrl, setTenantUrl] = useState<string | null>(null);
    const [createdSubdomain, setCreatedSubdomain] = useState<string | null>(null);

    // Payment gateways (could also be fetched from API)
    const gateways = [
        { id: "stripe", name: "Stripe" },
        { id: "paypal", name: "PayPal" },
        { id: "manual", name: t('options.gateways.manual') || "Manual Payment" },
    ];

    // Fetch plans and themes when modal opens
    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    async function fetchData() {
        setIsLoadingData(true);
        try {
            // Check if plans/themes API routes exist before fetching
            // Falling back to defaults if they don't
            const responses = await Promise.allSettled([
                fetch('/api/plans'),
                fetch('/api/themes'),
            ]);

            const plansRes = responses[0];
            const themesRes = responses[1];

            if (plansRes.status === 'fulfilled' && plansRes.value.ok) {
                const plansData = await plansRes.value.json();
                // API returns { success: true, data: { data: [...] } }
                // So we need to access plansData.data.data
                setPlans(plansData.data?.data || []);
            }

            if (themesRes.status === 'fulfilled' && themesRes.value.ok) {
                const themesData = await themesRes.value.json();
                setThemes(themesData.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setIsLoadingData(false);
        }
    }

    // Polling for database status
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (step === 'processing' && createdSubdomain) {
            intervalId = setInterval(async () => {
                try {
                    const response = await tenantService.getDatabaseStatus(createdSubdomain);
                    if (response.success && response.data.database_status === 'ready') {
                        clearInterval(intervalId);
                        setStep('success');
                        setIsLoading(false);
                        router.refresh();
                    }
                } catch (err) {
                    console.error('Error checking database status:', err);
                    // We don't stop polling on error as it might be transient
                }
            }, 3000); // Check every 3 seconds
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [step, createdSubdomain, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formData.subdomain || !formData.plan_id || !formData.theme) {
            setError("Please fill in all required fields");
            setStep('error');
            return;
        }

        setIsLoading(true);
        setStep('processing');
        setError(null);

        try {
            const result = await tenantService.create({
                subdomain: formData.subdomain,
                plan_id: parseInt(formData.plan_id) || 1, // Ensure integer plan_id
                theme: formData.theme,
                theme_code: formData.theme_code,
            });

            // Handle success based on API response structure
            if (result.success) {
                const tenantData = result.data;
                const domain = tenantData.tenant?.id || tenantData.tenant?.subdomain || tenantData.subdomain;
                setCreatedSubdomain(domain);

                if (domain) {
                    const baseUrl = process.env.NEXT_PUBLIC_TENANT_DOMAIN || 'localhost:3001';
                    setTenantUrl(`http://${domain}.${baseUrl}`);
                }

                if (tenantData.database_status === 'pending') {
                    setStep('processing');
                    // Polling useEffect will take over
                } else {
                    setStep('success');
                    setIsLoading(false);
                }
                router.refresh();
            }
        } catch (error: any) {
            console.error("Failed to create website:", error);
            const errorMessage = error.response?.data?.message || "Failed to create website. Please try again.";
            setError(errorMessage);
            setStep('error');
        } finally {
            setIsLoading(false);
        }
    }


    function handleClose() {
        setOpen(false);
        // Reset state after close animation
        setTimeout(() => {
            setStep('form');
            setError(null);
            setTenantUrl(null);
            setCreatedSubdomain(null);
            setFormData({
                plan_id: "",
                subdomain: "",
                theme: "default",
                theme_code: "#FF5733",
            });
        }, 200);
    }

    function handleRetry() {
        setStep('form');
        setError(null);
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => isOpen ? setOpen(true) : handleClose()}>
            <DialogTrigger asChild>
                <Button className={btnClassName}>
                    {btnText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {step === 'success' ? t('success_title') || 'Website Created!' : t('title')}
                    </DialogTitle>
                </DialogHeader>

                {/* Loading State */}
                {isLoadingData && step === 'form' && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                {/* Form */}
                {!isLoadingData && step === 'form' && (
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">

                        {/* Package Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="plan_id">{t('labels.plan_id')}</Label>
                            <Select
                                value={formData.plan_id}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, plan_id: value }))}
                                required
                            >
                                <SelectTrigger id="plan_id">
                                    <SelectValue placeholder={t('placeholders.plan_id')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {plans.map((plan) => (
                                        <SelectItem key={plan.id} value={plan.id.toString()}>
                                            {plan.title || plan.type_label} - {plan.formatted_price}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Subdomain Input */}
                        <div className="space-y-2">
                            <Label htmlFor="subdomain">{t('labels.subdomain')}</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="subdomain"
                                    placeholder={t('placeholders.subdomain')}
                                    value={formData.subdomain}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                                    }))}
                                    required
                                    pattern="^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$"
                                    className="flex-1"
                                />
                                <span className="text-muted-foreground text-sm">.example.com</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {t('hints.subdomain') || 'Lowercase letters, numbers, and hyphens only'}
                            </p>
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
                                        <SelectItem key={theme.id} value={theme.id}>
                                            {theme.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Theme Primary Color Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="theme_code">{t('labels.theme_code')}</Label>
                            <div className="flex items-center gap-3">
                                <Input
                                    id="theme_code"
                                    type="text"
                                    placeholder={t('placeholders.theme_code')}
                                    value={formData.theme_code}
                                    onChange={(e) => setFormData(prev => ({ ...prev, theme_code: e.target.value }))}
                                    className="flex-1"
                                />
                                <div
                                    className="w-10 h-10 rounded border shadow-sm"
                                    style={{ backgroundColor: formData.theme_code }}
                                />
                                <Input
                                    type="color"
                                    value={formData.theme_code}
                                    onChange={(e) => setFormData(prev => ({ ...prev, theme_code: e.target.value }))}
                                    className="w-12 h-10 p-1 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <Button type="button" variant="secondary" onClick={handleClose}>
                                {t('buttons.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                                disabled={isLoading || !formData.plan_id || !formData.subdomain}
                            >
                                {isLoading ? "Creating..." : t('buttons.create')}
                            </Button>
                        </div>
                    </form>
                )}

                {/* Processing State */}
                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-brand-orange" />
                        <p className="text-lg font-medium">
                            {t('processing.title') || 'Creating your website...'}
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                            {t('processing.description') || 'This may take a few moments. Please wait.'}
                        </p>
                    </div>
                )}

                {/* Success State */}
                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <p className="text-lg font-medium text-center">
                            {t('success.message') || 'Your website has been created successfully!'}
                        </p>
                        {tenantUrl && (
                            <a
                                href={tenantUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                            >
                                {tenantUrl}
                            </a>
                        )}
                        <div className="flex gap-3 pt-4">
                            <Button variant="secondary" onClick={handleClose}>
                                {t('buttons.close') || 'Close'}
                            </Button>
                            {tenantUrl && (
                                <Button
                                    className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                                    onClick={() => window.open(tenantUrl, '_blank')}
                                >
                                    {t('buttons.visit') || 'Visit Website'}
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Error State */}
                {step === 'error' && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="h-10 w-10 text-red-600" />
                        </div>
                        <p className="text-lg font-medium text-center">
                            {t('error.title') || 'Something went wrong'}
                        </p>
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button variant="secondary" onClick={handleClose}>
                                {t('buttons.cancel')}
                            </Button>
                            <Button
                                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                                onClick={handleRetry}
                            >
                                {t('buttons.retry') || 'Try Again'}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
