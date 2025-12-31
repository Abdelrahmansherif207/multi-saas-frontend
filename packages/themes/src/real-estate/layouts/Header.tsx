"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { TenantConfig, MenuItem, LocalizationProps, ThemeTranslations } from '../types';
import { Menu, X, Phone, Mail, Home, Building2, Newspaper, Info, MessageSquare, Users, Heart } from 'lucide-react';

interface HeaderProps {
    config: TenantConfig;
    menu?: MenuItem[];
    localization?: LocalizationProps;
    translations?: ThemeTranslations['Header'];
}

export function Header({ config, menu = [], localization, translations }: HeaderProps) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if a nav item is active
    const isActiveLink = (href: string) => {
        if (!pathname) return false;

        // Handle home link (usually just /[domain]/[locale])
        // It should only be active if it's an exact match
        const homePath = getHomePath();
        if (href === homePath) {
            return pathname === homePath;
        }

        // For other links, check if pathname starts with href
        // But ensure we don't match partial words (e.g. /properties vs /properties-list)
        return pathname === href || pathname.startsWith(href + '/');
    };

    // Get base path for home link
    const getHomePath = () => {
        if (localization?.availableLocales[0]?.href) {
            const domain = localization.availableLocales[0].href.split('/')[1];
            return `/${domain}/${localization.currentLocale}`;
        }
        return '/';
    };

    // Helper to get icon based on label or href
    const getIcon = (item: MenuItem) => {
        const label = item.label.toLowerCase();


        if (label.includes('home')) return <Home size={16} />;
        if (label.includes('prop')) return <Building2 size={16} />;
        if (label.includes('blog')) return <Newspaper size={16} />;
        if (label.includes('about')) return <Users size={16} />;
        if (label.includes('contact')) return <Phone size={16} />;

        return null;
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="sticky top-0 z-50 w-full"
            >
                {/* Top Bar */}
                <div className="hidden md:block bg-gradient-to-r from-primary to-zinc-700 text-white">
                    <div className="container mx-auto px-4 py-2.5">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-6">
                                {config.contactPhone && (
                                    <a href={`tel:${config.contactPhone}`} className="flex items-center gap-2">
                                        <Phone size={14} />
                                        <span className="font-medium">{config.contactPhone}</span>
                                    </a>
                                )}
                                {config.contactEmail && (
                                    <a href={`mailto:${config.contactEmail}`} className="flex items-center gap-2">
                                        <Mail size={14} />
                                        <span className="font-medium">{config.contactEmail}</span>
                                    </a>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                {config.socialLinks?.facebook && (
                                    <a href={config.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                    </a>
                                )}
                                {config.socialLinks?.twitter && (
                                    <a href={config.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                    </a>
                                )}
                                {config.socialLinks?.instagram && (
                                    <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex h-18 items-center justify-between py-3">
                            {/* Logo */}
                            <Link href={getHomePath()} className="flex items-center gap-2 shrink-0">
                                {config.logo ? (
                                    <img src={config.logo} alt={config.name} className="h-10 w-auto" />
                                ) : (
                                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                        {config.name}
                                    </span>
                                )}
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-1">
                                {menu.map((item) => {
                                    const isActive = isActiveLink(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`relative px-4 py-2 text-sm font-bold transition-colors flex items-center gap-2 ${isActive
                                                ? 'rounded-lg bg-primary/10 text-gray-900'
                                                : 'text-gray-500 hover:text-gray-900'
                                                }`}
                                        >
                                            {getIcon(item)}
                                            {item.label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNavIndicator"
                                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-1/2 bg-primary rounded-full shadow-lg"
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Right Section */}
                            <div className="flex items-center gap-3">
                                {/* Language Switcher */}
                                {localization && (
                                    <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-full p-1">
                                        {localization.availableLocales.map((locale) => {
                                            let href = locale.href;
                                            if (pathname) {
                                                const currentBase = localization.availableLocales.find(l => l.code === localization.currentLocale)?.href;
                                                if (currentBase && pathname.startsWith(currentBase)) {
                                                    href = pathname.replace(currentBase, locale.href);
                                                }
                                            }
                                            const isCurrentLocale = localization.currentLocale === locale.code;

                                            return (
                                                <Link
                                                    key={locale.code}
                                                    href={href}
                                                    className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${isCurrentLocale
                                                        ? 'bg-white text-primary shadow-sm'
                                                        : 'text-gray-500 hover:text-gray-700'
                                                        }`}
                                                >
                                                    {locale.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* CTA Button */}
                                <Link
                                    href={`${getHomePath()}/favorites`}
                                    className="hidden sm:block rounded-full hover:bg-primary/20 p-2 transition-colors duration-300"
                                >
                                    <Heart size={18} />
                                </Link>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-50 lg:hidden shadow-2xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Menu Header */}
                                <div className="flex items-center justify-between p-4 border-b">
                                    <span className="text-lg font-bold text-gray-900">{config.name}</span>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Mobile Navigation */}
                                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                                    {menu.map((item) => {
                                        const isActive = isActiveLink(item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center gap-3 ${isActive
                                                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {getIcon(item)}
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Mobile Menu Footer */}
                                <div className="p-4 border-t space-y-4">
                                    {/* Language Switcher */}
                                    {localization && (
                                        <div className="flex items-center gap-2">
                                            {localization.availableLocales.map((locale) => {
                                                let href = locale.href;
                                                if (pathname) {
                                                    const currentBase = localization.availableLocales.find(l => l.code === localization.currentLocale)?.href;
                                                    if (currentBase && pathname.startsWith(currentBase)) {
                                                        href = pathname.replace(currentBase, locale.href);
                                                    }
                                                }
                                                const isCurrentLocale = localization.currentLocale === locale.code;

                                                return (
                                                    <Link
                                                        key={locale.code}
                                                        href={href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={`flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${isCurrentLocale
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {locale.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <Link
                                        href={`${getHomePath()}/favorites`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-bold text-white shadow-lg shadow-primary/25"
                                    >
                                        <Heart size={50} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
