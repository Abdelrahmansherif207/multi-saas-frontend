"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkle, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Faq() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const t = useTranslations('Faq');

    const faqs = [
        {
            question: t('questions.q1'),
            answer: t('questions.a1')
        },
        {
            question: t('questions.q2'),
            answer: t('questions.a2')
        },
        {
            question: t('questions.q3'),
            answer: t('questions.a3')
        },
        {
            question: t('questions.q4'),
            answer: t('questions.a4')
        }
    ];

    return (
        <section className="container mx-auto px-4 py-16 md:py-24 relative">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        {t('header.prefix')} <span className="text-brand-orange">{t('header.highlight')}</span>
                    </h2>
                    <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                    <Sparkle className="absolute top-0 -left-10 w-6 h-6 text-foreground/20 -rotate-12" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Illustration */}
                <div className="relative flex justify-center lg:justify-end">
                    {/* Decorative Elements around image can go here if needed */}
                    <Image
                        src="/assets/faq.png"
                        alt="FAQ Illustration"
                        width={800}
                        height={800}
                        className="w-full max-w-md lg:max-w-xl h-auto object-contain"
                    />
                </div>

                {/* Right Side - Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "border rounded-2xl overflow-hidden transition-all duration-300",
                                activeIndex === index
                                    ? "bg-card border-brand-orange/50 shadow-md"
                                    : "bg-card/50 border-border/60 hover:border-brand-orange/30 hover:bg-card hover:shadow-sm"
                            )}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={cn(
                                    "font-bold text-lg",
                                    activeIndex === index ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {faq.question}
                                </span>
                                <div className={cn(
                                    "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                                    activeIndex === index ? "text-brand-orange" : "text-brand-orange bg-brand-orange/10"
                                )}>
                                    {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <div
                                className={cn(
                                    "grid transition-all duration-300 ease-in-out",
                                    activeIndex === index ? "grid-rows-[1fr] opacity-100 pb-6 px-6" : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
