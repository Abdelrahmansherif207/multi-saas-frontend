"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkle } from "lucide-react";
import { templates } from "@/lib/templates";
import { TemplateCard } from "@/components/client/TemplateCard";
import Link from "next/link";

export function Templates() {
    // Show only the first 3 templates on the home page as a preview, or all if preferred.
    // Usually "Explore" implies there are more. Let's show all 6 since the list is small, 
    // or limit if it grows. For now, showing all to match previous behavior.
    const displayedTemplates = templates;

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

                <Link href="/templates" passHref>
                    <Button size="lg" className="group">
                        Explore
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>
        </section>
    );
}
