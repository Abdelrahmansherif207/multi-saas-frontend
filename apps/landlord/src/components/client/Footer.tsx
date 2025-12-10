"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
    community: [
        { label: "About", href: "/about" },
        { label: "Templates", href: "/templates" },
        { label: "Press", href: "/press" },
        { label: "FAQ", href: "/faq" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
    ],
    templates: [
        { label: "Donation", href: "/templates/donation" },
        { label: "Job Portal", href: "/templates/job" },
        { label: "Events", href: "/templates/events" },
        { label: "Support Ticket", href: "/templates/support" },
        { label: "Ecommerce", href: "/templates/ecommerce" },
        { label: "Knowledge Base", href: "/templates/knowledge" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="text-3xl font-bold inline-block">
                            <span className="text-primary">Multi</span>
                            <span className="text-white">Saas</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Build your dream website with our powerful multi-tenant SaaS platform.
                            Launch faster, scale easier.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" size="icon" className="rounded-full border-slate-600 hover:bg-primary hover:border-primary hover:text-white transition-all">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-slate-600 hover:bg-primary hover:border-primary hover:text-white transition-all">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-slate-600 hover:bg-primary hover:border-primary hover:text-white transition-all">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-slate-600 hover:bg-primary hover:border-primary hover:text-white transition-all">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Community Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Community</h3>
                        <ul className="space-y-3">
                            {footerLinks.community.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
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
                        <h3 className="text-lg font-semibold mb-6 text-white">Our Templates</h3>
                        <ul className="space-y-3">
                            {footerLinks.templates.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
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
                        <h3 className="text-lg font-semibold mb-6 text-white">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-slate-400">
                                    41/1, Hilton Mall, Boston
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-slate-400">
                                    +012-78901234
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-slate-400">
                                    example@example.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm">
                            © 2025 MultiSaas. All Rights Reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy" className="text-slate-400 hover:text-primary transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-slate-400 hover:text-primary transition-colors">
                                Terms
                            </Link>
                            <Link href="/cookies" className="text-slate-400 hover:text-primary transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
