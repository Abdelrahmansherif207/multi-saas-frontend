import { Hero } from "@/components/client/Hero";
import { CompanyLogos } from "@/components/client/CompanyLogos";
import { Features } from "@/components/client/Features";
import { Templates } from "@/components/client/Templates";
import { Pricing } from "@/components/client/Pricing";
import { DemoVideo } from "@/components/client/DemoVideo";
import { ClientReviews } from "@/components/client/ClientReviews";
import { Faq } from "@/components/client/Faq";
import { Newsletter } from "@/components/client/Newsletter";
import type { Metadata } from "next";

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'HomePage' });

    return {
        title: t('meta_title'),
        description: t('meta_description'),
        robots: "index, follow",
        openGraph: {
            title: t('meta_title'),
            description: t('meta_description'),
            type: "website",
            siteName: "Wajha",
            locale: locale,
        },
        twitter: {
            card: "summary_large_image",
            title: t('meta_title'),
            description: t('meta_description'),
        },
    };
}

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-8">
            <Hero />
            <CompanyLogos />
            <Features />
            <Templates />
            <Pricing />
            <DemoVideo />
            {/* <ClientReviews /> */}
            <Faq />
            <Newsletter />
        </div>
    );
}
