"use client";

import { cn } from "@/lib/utils";
import { Check, Sparkle } from "lucide-react";

export function Pricing() {
    const plans = [
        {
            name: "Premium Monthly",
            price: "0",
            period: "/Monthly",
            description: "You can easily create your website by Pica. We will provide all type of digital service for you.",
            features: [
                "Page 20", "Blog 20", "Donation 20", "Job 20",
                "Event 20", "Article 20", "Dashboard", "Admin"
            ],
            isPopular: false,
            buttonText: "Free Package"
        },
        {
            name: "Basic Monthly",
            price: "50",
            period: "/Monthly",
            description: "You can easily create your website by Pica. We will provide all type of digital service for you.",
            features: [
                "Page 20", "Blog 20", "Donation 20", "Job 30",
                "Event 14", "Article 28", "Dashboard", "Admin"
            ],
            isPopular: true,
            buttonText: "Buy Now"
        },
        {
            name: "Standard Monthly",
            price: "120",
            period: "/Monthly",
            description: "You can easily create your website by Pica. We will provide all type of digital service for you.",
            features: [
                "Page 20", "Appointment 20", "Blog 20", "Product 50",
                "Donation 20", "Event 20", "Article 20", "Portfolio 20"
            ],
            isPopular: false,
            buttonText: "Buy Now"
        }
    ];

    return (
        <section className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Our <span className="text-brand-orange">Pricing</span> Plan
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
                            <span className="text-5xl font-bold tracking-tight">$ {plan.price}</span>
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
                                View All Features
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
