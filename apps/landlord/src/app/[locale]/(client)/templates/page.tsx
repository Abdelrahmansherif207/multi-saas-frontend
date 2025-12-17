import { PagesHeader } from "@/components/client/PagesHeader";
import { TemplateCard } from "@/components/client/TemplateCard";
import { templates, categories } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { Search, Sparkle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Templates | Wajha",
    description: "Explore our wide range of professional templates for your websites.",
    openGraph: {
        title: "Templates | Wajha",
        description: "Explore our wide range of professional templates for your websites.",
        type: "website",
        siteName: "Wajha",
    },
    twitter: {
        card: "summary_large_image",
        title: "Templates | Wajha",
        description: "Explore our wide range of professional templates for your websites.",
    },
};

export default function TemplatesPage() {



    return (
        <main className="min-h-screen">
            <PagesHeader
                title="All Templates"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "All Templates" }
                ]}
            />

            <section className="container mx-auto px-4 pb-24">
                {/* Secondary Heading for Search Section */}
                <div className="flex flex-col items-center text-center mb-12 space-y-2">
                    <div className="relative inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Explore our <span className="text-brand-orange">templates</span>
                        </h2>
                        <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                    </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="max-w-4xl mx-auto mb-16 space-y-8">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            disabled
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card/50 focus:outline-none cursor-not-allowed opacity-60"
                        />
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full bg-brand-orange text-white border-brand-orange hover:bg-brand-orange/90 hover:text-white"
                        >
                            All Categories
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant="outline"
                                className="rounded-full hover:border-brand-orange hover:text-brand-orange bg-transparent transition-all duration-300"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </div>
            </section>
        </main>
    );
}
