"use client";

import { Sparkle } from "lucide-react";
import { useTranslations } from "next-intl";

export function Newsletter() {
    const t = useTranslations('Newsletter');

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-primary text-primary-foreground px-6 py-16 md:px-12 md:py-20 text-center shadow-2xl">

                {/* Grid Pattern Background */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                        backgroundSize: "40px 40px"
                    }}
                />

                {/* Decorative Sparkles */}
                <Sparkle className="absolute top-12 left-8 md:left-20 w-16 h-16 text-primary-foreground/10 rotate-12" />
                <Sparkle className="absolute bottom-12 right-8 md:right-20 w-24 h-24 text-primary-foreground/10 -rotate-12" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground">
                            {t('title')}
                        </h2>
                        <p className="text-primary-foreground/80 leading-relaxed max-w-lg mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    <div className="bg-white p-2 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-lg max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder={t('placeholder')}
                            className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400"
                        />
                        <button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 px-8 rounded-xl transition-colors sm:w-auto w-full">
                            {t('button')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
