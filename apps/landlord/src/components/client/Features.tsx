"use client";

import { cn } from "@/lib/utils";
import { Medal, Settings, Target, Globe, Layout, BadgeCheck, Sparkle } from "lucide-react";

export function Features() {
    const features = [
        {
            title: "Globally Recognize",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem sit accusantium doloremqueau dantium, totam rem aperiam.",
            icon: Medal,
        },
        {
            title: "Easily customize",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem sit accusantium doloremqueau dantium, totam rem aperiam.",
            icon: Settings,
        },
        {
            title: "Build for Impact",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem sit accusantium doloremqueau dantium, totam rem aperiam.",
            icon: Target,
        },
        {
            title: "Worldwide support",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem sit accusantium doloremqueau dantium, totam rem aperiam.",
            icon: Globe,
        },
        {
            title: "Awesome Design",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem sit accusantium doloremqueau dantium, totam rem aperiam.",
            icon: Layout,
        },
        {
            title: "Handle by Expert",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem sit accusantium doloremqueau dantium, totam rem aperiam.",
            icon: BadgeCheck,
        },
    ];

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Why <span className="text-brand-orange">choose</span> us
                    </h2>
                    <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden p-8 rounded-3xl bg-card border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                        {/* Hover Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-0 bg-black/5 dark:bg-white/5 transition-all duration-500 ease-in-out group-hover:h-full" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
