import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Template } from "@/lib/templates";
import { getTranslations } from "next-intl/server";

interface TemplateCardProps {
    template: Template;
}

export async function TemplateCard({ template }: TemplateCardProps) {
    const t = await getTranslations('TemplateCard');

    return (
        <div className="group flex flex-col p-4 rounded-3xl bg-card border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300">
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
                            {t('coming_soon')}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{template.title}</h3>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                        {template.category}
                    </span>
                </div>

                <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {template.description}
                </p>

                {template.isComingSoon ? (
                    <Button disabled className="w-full bg-muted text-muted-foreground opacity-100 hover:bg-muted">
                        {t('not_available')}
                    </Button>
                ) : (
                    <Button className="w-fit">
                        {t('live_preview')}
                    </Button>
                )}
            </div>
        </div>
    );
}
