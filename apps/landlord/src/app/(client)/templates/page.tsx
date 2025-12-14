"use client";

import { useState } from "react";
import { templates, categories } from "@/lib/templates";
import { TemplateCard } from "@/components/client/TemplateCard";
import { Sparkle, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PagesHeader } from "@/components/client/PagesHeader";

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filter Logic
    const filteredTemplates = templates.filter((template) => {
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? template.category === selectedCategory : true;

        return matchesSearch && matchesCategory;
    });

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card/50 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                !selectedCategory
                                    ? "bg-brand-orange text-white border-brand-orange hover:bg-brand-orange/90 hover:text-white"
                                    : "hover:border-brand-orange hover:text-brand-orange bg-transparent"
                            )}
                        >
                            All Categories
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant="outline"
                                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    selectedCategory === category
                                        ? "bg-brand-orange text-white border-brand-orange hover:bg-brand-orange/90 hover:text-white"
                                        : "hover:border-brand-orange hover:text-brand-orange bg-transparent"
                                )}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                {filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold mb-4">No templates found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filters to find what you&apos;re looking for.
                        </p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchQuery(""); setSelectedCategory(null) }}
                            className="mt-4 text-brand-orange"
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </section>
        </main>
    );
}
