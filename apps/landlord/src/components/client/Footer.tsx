"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations('Footer');

    const footerLinks = {
        community: [
            { label: t('links.about'), href: "/about" },
            { label: t('links.templates'), href: "/templates" },
            { label: t('links.press'), href: "/press" },
            { label: t('links.faq'), href: "/faq" },
            { label: t('links.privacy'), href: "/privacy" },
            { label: t('links.terms'), href: "/terms" },
        ],
        templates: [
            { label: t('links.donation'), href: "/templates/donation" },
            { label: t('links.job'), href: "/templates/job" },
            { label: t('links.events'), href: "/templates/events" },
            { label: t('links.support'), href: "/templates/support" },
            { label: t('links.ecommerce'), href: "/templates/ecommerce" },
            { label: t('links.knowledge'), href: "/templates/knowledge" },
        ],
    };

    return (
        <footer className="bg-primary text-primary-foreground dark:bg-black/30 dark:text-muted-foreground border-t border-border overflow-hidden">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="text-3xl font-bold inline-block">
                            <span className="text-inverse dark:text-primary">Multi</span>
                            <span className="text-primary-foreground dark:text-foreground">Saas</span>
                        </Link>
                        <p className="text-primary-foreground/70 dark:text-muted-foreground leading-relaxed">
                            {t('description')}
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 text-primary-foreground dark:border-border dark:text-muted-foreground hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all bg-transparent">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 text-primary-foreground dark:border-border dark:text-muted-foreground hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all bg-transparent">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 text-primary-foreground dark:border-border dark:text-muted-foreground hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all bg-transparent">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 text-primary-foreground dark:border-border dark:text-muted-foreground hover:bg-primary-foreground hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all bg-transparent">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Community Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-primary-foreground dark:text-foreground">{t('headers.community')}</h3>
                        <ul className="space-y-3">
                            {footerLinks.community.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-primary-foreground/70 dark:text-muted-foreground hover:text-primary-foreground dark:hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Templates Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-primary-foreground dark:text-foreground">{t('headers.templates')}</h3>
                        <ul className="space-y-3">
                            {footerLinks.templates.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-primary-foreground/70 dark:text-muted-foreground hover:text-primary-foreground dark:hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-primary-foreground dark:text-foreground">{t('headers.contact')}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary-foreground/10 dark:bg-primary/10 rounded-lg">
                                    <MapPin className="h-5 w-5 text-primary-foreground dark:text-primary" />
                                </div>
                                <span className="text-primary-foreground/70 dark:text-muted-foreground">
                                    41/1, Hilton Mall, Boston
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-primary-foreground/10 dark:bg-primary/10 rounded-lg">
                                    <Phone className="h-5 w-5 text-primary-foreground dark:text-primary" />
                                </div>
                                <span className="text-primary-foreground/70 dark:text-muted-foreground">
                                    +012-78901234
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-primary-foreground/10 dark:bg-primary/10 rounded-lg">
                                    <Mail className="h-5 w-5 text-primary-foreground dark:text-primary" />
                                </div>
                                <span className="text-primary-foreground/70 dark:text-muted-foreground">
                                    example@example.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-foreground/20 dark:border-border">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-primary-foreground/50 dark:text-muted-foreground text-sm">
                            {t('bottom.rights')}
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy" className="text-primary-foreground/70 dark:text-muted-foreground hover:text-primary-foreground dark:hover:text-primary transition-colors">
                                {t('bottom.privacy')}
                            </Link>
                            <Link href="/terms" className="text-primary-foreground/70 dark:text-muted-foreground hover:text-primary-foreground dark:hover:text-primary transition-colors">
                                {t('bottom.terms')}
                            </Link>
                            <Link href="/cookies" className="text-primary-foreground/70 dark:text-muted-foreground hover:text-primary-foreground dark:hover:text-primary transition-colors">
                                {t('bottom.cookies')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
