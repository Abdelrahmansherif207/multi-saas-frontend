
import { PagesHeader } from "@/components/client/PagesHeader";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Privacy' });

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

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Privacy' });

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
                <article className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
                        {t('content.h1')}
                    </h1>

                    <p className="text-muted-foreground leading-relaxed">
                        {t('content.p1')}
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                        {t('content.p2')}
                    </p>

                    <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 my-8">
                        <p className="text-muted-foreground leading-relaxed">
                            {t('content.box1.p1')} <a href="https://medium.com/@StartupPolicy/five-reasons-why-copying-someone-else-s-terms-of-use-and-privacy-policy-is-a-bad-idea-fd8d126ac0b3" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-medium">{t('content.box1.link')}</a>
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                            {t('content.box1.p2')}
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                        {t('content.h2')}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                        {t('content.p3')}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        {t('content.p4')}
                    </p>

                    <ul className="space-y-3 my-8 list-none pl-0">
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            {t('content.list.item1')}
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            {t('content.list.item2')}
                        </li>
                        <li className="flex items-center gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            {t('content.list.item3')}
                        </li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                        {t('content.p5')}
                    </p>

                    <div className="bg-brand-orange/10 p-6 rounded-2xl border border-brand-orange/20 mt-8">
                        <p className="text-foreground font-medium">
                            <span className="font-bold">{t('content.note.label')}</span> {t('content.note.text')}
                        </p>
                    </div>
                </article>
            </section>
        </main>
    );
}
