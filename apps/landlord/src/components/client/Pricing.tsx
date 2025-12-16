"use client";

import { cn } from "@/lib/utils";
import { Check, Sparkle } from "lucide-react";
import { useTranslations } from "next-intl";

export function Pricing() {
    const t = useTranslations('Pricing');

    const plans = [
        {
            name: t('plans.premium.name'),
            price: "0",
            period: t('period'),
            description: t('plans.premium.description'),
            features: [
                `${t('features.page')} 20`, `${t('features.blog')} 20`, `${t('features.donation')} 20`, `${t('features.job')} 20`,
                `${t('features.event')} 20`, `${t('features.article')} 20`, t('features.dashboard'), t('features.admin')
            ],
            isPopular: false,
            buttonText: t('plans.premium.button')
        },
        {
            name: t('plans.basic.name'),
            price: "50",
            period: t('period'),
            description: t('plans.basic.description'),
            features: [
                `${t('features.page')} 20`, `${t('features.blog')} 20`, `${t('features.donation')} 20`, `${t('features.job')} 30`,
                `${t('features.event')} 14`, `${t('features.article')} 28`, t('features.dashboard'), t('features.admin')
            ],
            isPopular: true,
            buttonText: t('plans.basic.button')
        },
        {
            name: t('plans.standard.name'),
            price: "120",
            period: t('period'),
            description: t('plans.standard.description'),
            features: [
                `${t('features.page')} 20`, `${t('features.appointment')} 20`, `${t('features.blog')} 20`, `${t('features.product')} 50`,
                `${t('features.donation')} 20`, `${t('features.event')} 20`, `${t('features.article')} 20`, `${t('features.portfolio')} 20`
            ],
            isPopular: false,
            buttonText: t('plans.standard.button')
        }
    ];

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
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={cn(
                            "relative flex flex-col p-8 rounded-3xl transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 border",
                            // Styling logic:
                            // Middle card (isPopular) gets the "active" style by default.
                            // Hovering any card applies the active style.
                            // "Different card color": Using bg-card for all but maybe different border/shadow for active?
                            // Let's assume active = bg-card and shadow-lg, strict border.
                            // Inactive = bg-transparent or subtle.
                            plan.isPopular
                                ? "bg-card border-brand-orange/20 shadow-xl z-10 md:scale-105"
                                : "bg-card/50 border-border shadow-sm hover:bg-card hover:border-brand-orange/20 hover:z-10 hover:scale-105"
                        )}
                    >
                        {/* Plan Name - Orange if Popular OR on Hover */}
                        <h3 className={cn(
                            "text-xl font-bold mb-4 transition-colors",
                            plan.isPopular ? "text-brand-orange" : "text-foreground group-hover:text-brand-orange"
                        )}>
                            {plan.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-baseline mb-6">
                            <span className="text-5xl font-bold tracking-tight">{t('currency')} {plan.price}</span>
                            <span className="text-muted-foreground ml-2 text-sm font-medium">{plan.period}</span>
                        </div>

                        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                            {plan.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-sm">
                                    <div className="mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    </div>
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* View All Features Link */}
                        <div className="text-center mb-6">
                            <a href="#" className="inline-block text-sm font-semibold text-muted-foreground underline decoration-1 underline-offset-4 hover:text-foreground transition-colors">
                                {t('view_all')}
                            </a>
                        </div>

                        {/* Button - Primary Color (Not Orange) */}
                        <button className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition-opacity">
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
