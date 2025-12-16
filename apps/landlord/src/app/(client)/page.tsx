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

export const metadata: Metadata = {
    title: "Wajha – Your Unified SaaS Interface",
    description: "Experience the ultimate multi-SaaS platform. Manage your business, tenants, and services from one unified interface.",
    robots: "index, follow",
    openGraph: {
        title: "Wajha – Your Unified SaaS Interface",
        description: "Experience the ultimate multi-SaaS platform. Manage your business, tenants, and services from one unified interface.",
        type: "website",
        siteName: "Wajha",
    },
    twitter: {
        card: "summary_large_image",
        title: "Wajha – Your Unified SaaS Interface",
        description: "Experience the ultimate multi-SaaS platform. Manage your business, tenants, and services from one unified interface.",
    },
};

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-8">
            <Hero />
            <CompanyLogos />
            <Features />
            <Templates />
            <Pricing />
            <DemoVideo />
            <ClientReviews />
            <Faq />
            <Newsletter />
        </div>
    );
}
