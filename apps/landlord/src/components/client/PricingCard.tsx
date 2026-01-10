import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Plan } from "./Pricing";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface PricingCardProps {
    plan: Plan;
    noOfFeatures?: number;
    showViewFeatures?: boolean;
    showTryNow?: boolean;
}

export default async function PricingCard({
    plan,
    noOfFeatures = 8,
    showViewFeatures = true,
    showTryNow
}: PricingCardProps) {
    const t = await getTranslations('Pricing');
    const slugify = (text: string) =>
        text
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

    return (
        <div
            key={plan.id}
            className={cn(
                "relative flex flex-col p-8 rounded-3xl transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 border",
                // Styling logic:
                // Middle card (isPopular) gets the "active" style by default.
                // Hovering any card applies the active style.
                // "Different card color": Using bg-card for all but maybe different border/shadow for active?
                // Let's assume active = bg-card and shadow-lg, strict border.
                // Inactive = bg-transparent or subtle.
                plan.title === "Basic Monthly"
                    ? "bg-card border-brand-orange/20 shadow-xl z-10 md:scale-105"
                    : "bg-card/50 border-border shadow-sm hover:bg-card hover:border-brand-orange/20 hover:z-10 hover:scale-105"
            )}
        >
            {/* Plan Name - Orange if Popular OR on Hover */}
            <h3 className={cn(
                "text-xl font-bold mb-4 transition-colors",
                plan.title === "Basic Monthly" ? "text-brand-orange" : "text-foreground group-hover:text-brand-orange"
            )}>
                {plan.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold tracking-tight">{t('currency')} {plan.price}</span>
                <span className="text-muted-foreground ml-2 text-sm font-medium">{plan.type_label}</span>
            </div>

            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                {plan.subtitle}
            </p>

            {/* Features */}
            <ul className={cn(
                "mb-8 flex-1",
                noOfFeatures > 8
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : "space-y-4"
            )}>
                {plan.plan_features.slice(0, noOfFeatures).map((feature) => (
                    <li key={feature.id} className="flex items-center text-sm">
                        <div className="mr-3 shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-muted-foreground">{feature.feature_name}</span>
                    </li>
                ))}
            </ul>

            {/* View All Features Link */}
            {showViewFeatures && (
                <div className="text-center mb-6">
                    <Link href={`/plans/${slugify(plan.title)}`} className="inline-block text-sm font-semibold text-muted-foreground underline decoration-1 underline-offset-4 hover:text-foreground transition-colors">
                        view all features
                    </Link>
                </div>
            )}

            {/* Button - Primary Color (Not Orange) */}
            <div className="flex gap-2">
                <button className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition-opacity">
                    Buy Now
                </button>
                {/* Use showTryNow prop if provided, otherwise fall back to plan.has_trial from backend */}
                {(showTryNow ?? plan.has_trial) && (
                    <button className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition-opacity">
                        Try Now
                    </button>
                )}
            </div>
        </div>
    );
}