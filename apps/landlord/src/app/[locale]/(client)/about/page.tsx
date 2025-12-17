
import { PagesHeader } from "@/components/client/PagesHeader";
import { Stats } from "@/components/client/Stats";
import { Team } from "@/components/client/Team";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return {
        title: t('meta_title'),
        description: t('meta_description'),
        openGraph: {
            title: t('meta_title'),
            description: t('meta_description'),
            type: "website",
            siteName: "Wajha",
        },
        twitter: {
            card: "summary_large_image",
            title: t('meta_title'),
            description: t('meta_description'),
        },
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'About' });

    return (
        <main className="min-h-screen">
            <PagesHeader
                title={t('title')}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: t('title') }
                ]}
            />

            <section className="container mx-auto px-4 pb-24">
                {/* Introduction Section */}
                <div className="flex flex-col items-start text-left space-y-12 mx-auto">

                    {/* Title */}
                    <div className="relative inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            {t('hero.title_start')} <span className="text-brand-orange">{t('hero.title_highlight')}</span>
                        </h2>
                        <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                    </div>

                    {/* Text Blocks */}
                    <div className="space-y-6 text-muted-foreground leading-loose text-lg max-w-none">
                        <p>
                            {t('content.p1')}
                        </p>
                        <p>
                            {t('content.p2')}
                        </p>
                    </div>

                    {/* Illustration */}
                    <div className="relative w-full max-w-5xl aspect-[16/9] my-8 self-center">
                        <Image
                            src="/assets/aboutus.png"
                            alt="Team collaboration illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Footer Text */}
                    <p className="text-muted-foreground leading-loose text-lg">
                        {t('content.p3')}
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <Stats />

            {/* Team Section */}
            <Team />
        </main>
    );
}
