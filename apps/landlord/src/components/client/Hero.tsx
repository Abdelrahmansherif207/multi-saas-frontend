"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Timer, Lightbulb, Sparkle } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
    const t = useTranslations('Hero');
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 50) * -1; // Reduced sensitivity (was 20)
        const rotateY = (x - centerX) / 50;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32 perspective-1000">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8 relative">
                    <div className="absolute -top-12 left-0 hidden lg:block animate-float">
                        <Lightbulb className="w-12 h-12 text-yellow-500 rotate-12" />
                        <Sparkle className="absolute -top-2 -right-4 w-6 h-6 text-yellow-500 animate-pulse fill-yellow-500" />
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground/80 leading-tight">
                        {t('title_line1')} <br />
                        {t('title_line2')} <br />
                        <span className="flex items-center gap-3">
                            <span className="bg-gradient-to-r from-primary via-brand-orange to-primary bg-clip-text text-transparent animate-gradient bg-300%">
                                {t('highlight')}
                            </span>
                            <Timer className="w-10 h-10 md:w-16 md:h-16 text-primary animate-[spin_3s_linear_infinite]" />
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-[600px]">
                        {t('description')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12">
                            {t('cta')}
                        </Button>
                        <span className="text-muted-foreground text-sm">
                            {t('trial_text')}
                        </span>
                    </div>
                </div>

                {/* Illustration with Tilt Effect */}
                <div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative w-full aspect-square lg:aspect-[4/3] transition-transform duration-500 ease-out"
                    style={{
                        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
                    }}
                >
                    {/* Placeholder for the user-provided image */}
                    <div className="relative w-full h-full transform-style-3d">
                        <Image
                            src="/assets/heroo.png"
                            alt="Website Builder Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
