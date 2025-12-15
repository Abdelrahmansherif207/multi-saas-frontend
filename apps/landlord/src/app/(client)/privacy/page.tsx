import { PagesHeader } from "@/components/client/PagesHeader";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen">
            <PagesHeader
                title="Privacy Policy"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Privacy Policy" }
                ]}
            />

            <section className="container mx-auto px-4 pb-24">
                <article className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
                        How can I get a privacy policy on my website? A GDPR compliant privacy policy
                    </h1>

                    <p className="text-muted-foreground leading-relaxed">
                        The privacy policy can be written as an independent page on your website, and be made accessible as a link in the header or footer of your website, or on your ‘About’ page. It may also be hosted by a privacy policy-service with a link from your homepage.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                        Basically, it doesn’t matter where you choose to place it, as long as your users have access to it. The privacy policy is a legal text. The phrasing depends on which jurisdictions your website falls under and how website handles data.
                    </p>

                    <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 my-8">
                        <p className="text-muted-foreground leading-relaxed">
                            However, this might seem as a large expense if you are, for instance, a hobby blogger or small business.
                            What you should <a href="https://medium.com/@StartupPolicy/five-reasons-why-copying-someone-else-s-terms-of-use-and-privacy-policy-is-a-bad-idea-fd8d126ac0b3" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-medium">never do, is to copy a privacy policy from some other website.</a>
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                            That is also why using a privacy policy generator can be a hazardous thing, since you must be very careful to include all the specific information of your website, and not just have privacy policy generator spit out a default one that isn't aligned with your domain.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                        GDPR privacy policy templates & privacy policy generators
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                        There exists numerous tools for creating privacy policies, and privacy policy templates and privacy policy generators on the internet.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Some are free and others come at a price. Some are not GDPR compliant privacy policies.
                    </p>

                    <ul className="space-y-3 my-8 list-none pl-0">
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            1) Maintain all the content properly
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            2) Ensure your all input is right
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            3) if you can do multiple task that will be plus
                        </li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                        There policy is the numerous tools for creating privacy policies, and privacy policy templates and privacy policy generators on the internet. Some are free and others come at a price. Some are not GDPR compliant privacy policies.
                    </p>

                    <div className="bg-brand-orange/10 p-6 rounded-2xl border border-brand-orange/20 mt-8">
                        <p className="text-foreground font-medium">
                            <span className="font-bold">Note:</span> just have privacy policy generator spit out a default one that isn't aligned with your domain So it's very important loyal technical theury of our reservation.
                        </p>
                    </div>
                </article>
            </section>
        </main>
    );
}
