import { PagesHeader } from "@/components/client/PagesHeader";
import { TemplateCard } from "@/components/client/TemplateCard";
import { templates } from "@/lib/templates";
import PricingCard from "@/components/client/PricingCard";
import { Plan } from "@/components/client/Pricing";
export default async function PlanDetailsPage({
    params,
}: {
    params: { locale: string; slug: string };
}) {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/${slug}`);
    const data = await res.json();
    const plan: Plan = data.data;
    console.log(plan);

    return (
        <main className="min-h-screen pb-20">
            <PagesHeader
                title={slug}
                breadcrumbs={[
                    { label: "plans", href: "/plans" },
                    { label: slug }
                ]}
            />
            <div className="container mx-auto px-4 space-y-24">
                {/* Select Theme Section */}
                <section className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {/* {t("select_theme")} */}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={{
                                    ...template,
                                    // title: tTemplates(`items.${template.id}.title`),
                                    // description: tTemplates(`items.${template.id}.description`),
                                    // category: tTemplates(`items.categories.${template.category}` as any)
                                }}
                            />
                        ))}
                    </div>
                </section>

                <PricingCard
                    plan={plan}
                    noOfFeatures={plan.plan_features.length}
                    showViewFeatures={false}
                />
            </div>
        </main>
    );
}
