import { cn } from "@/lib/utils";
import { Check, Sparkle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import PricingCard from "./PricingCard";
export interface Plan {
    id: number;
    title: string;
    subtitle: string;
    features_text: string;
    type: string;
    type_label: string;
    status: boolean;
    price: number;
    formatted_price: string;
    has_trial: boolean;
    trial_days: number;
    zero_price: number;
    permissions: any[];
    plan_features: any[];
    faq: any;
    created_at: string;
    updated_at: string;
}


export async function Pricing() {
    const t = await getTranslations('Pricing');

    // const plans = [
    //     {
    //         name: t('plans.premium.name'),
    //         price: "0",
    //         period: t('period'),
    //         description: t('plans.premium.description'),
    //         features: [
    //             `${t('features.page')} 20`, `${t('features.blog')} 20`, `${t('features.donation')} 20`, `${t('features.job')} 20`,
    //             `${t('features.event')} 20`, `${t('features.article')} 20`, t('features.dashboard'), t('features.admin')
    //         ],
    //         isPopular: false,
    //         buttonText: t('plans.premium.button')
    //     },
    //     {
    //         name: t('plans.basic.name'),
    //         price: "50",
    //         period: t('period'),
    //         description: t('plans.basic.description'),
    //         features: [
    //             `${t('features.page')} 20`, `${t('features.blog')} 20`, `${t('features.donation')} 20`, `${t('features.job')} 30`,
    //             `${t('features.event')} 14`, `${t('features.article')} 28`, t('features.dashboard'), t('features.admin')
    //         ],
    //         isPopular: true,
    //         buttonText: t('plans.basic.button')
    //     },
    //     {
    //         name: t('plans.standard.name'),
    //         price: "120",
    //         period: t('period'),
    //         description: t('plans.standard.description'),
    //         features: [
    //             `${t('features.page')} 20`, `${t('features.appointment')} 20`, `${t('features.blog')} 20`, `${t('features.product')} 50`,
    //             `${t('features.donation')} 20`, `${t('features.event')} 20`, `${t('features.article')} 20`, `${t('features.portfolio')} 20`
    //         ],
    //         isPopular: false,
    //         buttonText: t('plans.standard.button')
    //     }
    // ];

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans`);
    const { data } = await res.json();
    const plans: Plan[] = data.data;
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        {t('header.prefix')} <span className="text-brand-orange">{t('header.highlight')}</span> {t('header.suffix')}
                    </h2>
                    <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} noOfFeatures={8} />
                ))}
            </div>
        </section>
    );
}
