import { Hero } from "@/components/client/Hero";
import { CompanyLogos } from "@/components/client/CompanyLogos";
import { Features } from "@/components/client/Features";
import { Templates } from "@/components/client/Templates";

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-8">
            <Hero />
            <CompanyLogos />
            <Features />
            <Templates />
        </div>
    );
}
