import { PagesHeader } from "@/components/client/PagesHeader";
import { Stats } from "@/components/client/Stats";
import { Team } from "@/components/client/Team";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Wajha",
    description: "Learn more about Wajha and our mission to provide the best multi-SaaS solutions for businesses.",
    openGraph: {
        title: "About Us | Wajha",
        description: "Learn more about Wajha and our mission to provide the best multi-SaaS solutions for businesses.",
        type: "website",
        siteName: "Wajha",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Wajha",
        description: "Learn more about Wajha and our mission to provide the best multi-SaaS solutions for businesses.",
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <PagesHeader
                title="About Us"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "About Us" }
                ]}
            />

            <section className="container mx-auto px-4 pb-24">
                {/* Introduction Section */}
                <div className="flex flex-col items-start text-left space-y-12 mx-auto">

                    {/* Title - Kept centered or left? User said "text lines", usually implies body text. But "start from same" implies global alignment. I will align Title Left too for consistency. */}
                    <div className="relative inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Easily make your <span className="text-brand-orange">Website</span>
                        </h2>
                        <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                    </div>

                    {/* Text Blocks */}
                    <div className="space-y-6 text-muted-foreground leading-loose text-lg max-w-none">
                        <p>
                            In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.
                        </p>
                        <p>
                            In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.
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
                        In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.
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
