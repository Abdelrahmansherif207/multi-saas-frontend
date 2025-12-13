"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkle } from "lucide-react";
import Image from "next/image";

interface Template {
    id: string;
    title: string;
    description: string;
    image: string;
    isComingSoon?: boolean;
}

export function Templates() {
    const templates: Template[] = [
        {
            id: "agency",
            title: "Agency",
            description: "Agency description",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "article",
            title: "Article",
            description: "Article description",
            image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "barber",
            title: "Barber Shop",
            description: "Barber shop with appointment.",
            image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "construction",
            title: "Construction",
            description: "Construction description",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "consultancy",
            title: "Consultancy",
            description: "Consultancy description",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "course",
            title: "Course",
            description: "This is course theme",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
            isComingSoon: true,
        },
    ];

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Explore our <span className="text-brand-orange">templates</span>
                    </h2>
                    <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                </div>

                <Button size="lg" className="group">
                    Explore
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="group flex flex-col p-4 rounded-3xl bg-card border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[6/7] rounded-2xl overflow-hidden mb-6 bg-muted/50 group-hover:shadow-md transition-shadow">
                            <Image
                                src={template.image}
                                alt={template.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Overlay for Coming Soon */}
                            {template.isComingSoon && (
                                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                    <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg">
                                        Coming Soon....
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                {template.description}
                            </p>

                            {template.isComingSoon ? (
                                <Button disabled className="w-full bg-muted text-muted-foreground opacity-100 hover:bg-muted">
                                    Not Available
                                </Button>
                            ) : (
                                <Button className="w-fit">
                                    Live Preview
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
