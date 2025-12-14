"use client";

import { Sparkle, Play } from "lucide-react";

export function DemoVideo() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 relative">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        How to <span className="text-brand-orange">get started</span> demo video
                    </h2>
                    <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                    <Sparkle className="absolute -bottom-4 -left-8 w-6 h-6 text-brand-orange/50 fill-brand-orange/50 animate-bounce delay-700" />
                </div>
            </div>

            {/* Video Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card aspect-video group cursor-pointer">
                {/* Placeholder Dark Gradient Background - mimicking a video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">

                    {/* Optional: Add an image here if available, for now using a subtle pattern/gradient */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                </div>

                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                {/* Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>

                        <div className="w-20 h-20 md:w-24 md:h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <Play className="w-8 h-8 md:w-10 md:h-10 ml-1 fill-current" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
