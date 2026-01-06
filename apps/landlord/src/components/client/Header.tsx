"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube, User, LayoutDashboard, CreditCard, Settings, LogOut, Menu, X, Layers } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

// Mock Auth State (Temporary)
const isAuthenticated = false;
const user = {
    name: "John Doe",
    email: "john@example.com",
    image: null // or string URL
};
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const locale = useLocale();
    const t = useTranslations('Header');

    return (
        <header className="w-full sticky top-0 z-50">
            {/* Top Bar - Hidden on Mobile */}
            <div className="hidden md:block glass border-b">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            0105411110
                        </span>
                        <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            example@example.com
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Facebook className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Twitter className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Linkedin className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Youtube className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="glass border-b border-border/40 relative">
                <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-brand-orange/10 p-2 rounded-xl group-hover:bg-brand-orange/20 transition-colors">
                            <Layers className="h-6 w-6 text-brand-orange" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-brand-orange">
                            {locale === 'ar' ? 'واجهة' : 'Wajha'}
                        </span>
                    </Link>

                    {/* Desktop Navigation - Hidden on Mobile */}
                    <div className="hidden md:block">
                        <NavigationMenu className="text-md">
                            <NavigationMenuList className="text-base items-center">
                                <NavigationMenuItem value="home">
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/">{t('nav.home')}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem value="templates">
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/templates">{t('nav.templates')}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem value="blogs">
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/blogs">{t('nav.blogs')}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem value="pricing">
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/pricing">{t('nav.pricing')}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {/* Pages Dropdown - Using DropdownMenu for exact positioning */}
                                <NavigationMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className={navigationMenuTriggerStyle() + " group"}>
                                            {t('nav.pages')}
                                            <ChevronDown
                                                className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                                                aria-hidden="true"
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-52">
                                            <DropdownMenuItem asChild>
                                                <Link href="/terms" className="w-full cursor-pointer">{t('nav.terms')}</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/privacy" className="w-full cursor-pointer">{t('nav.privacy')}</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/about" className="w-full cursor-pointer">{t('nav.about')}</Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </NavigationMenuItem>

                                <NavigationMenuItem value="contact">
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/contact">{t('nav.contact')}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right Side - Desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        <ModeToggle />
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-5 w-5" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <Link href="/dashboard">{t('user.dashboard')}</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <Link href="/wallet">{t('user.wallet')}</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <Link href="/settings">{t('user.settings')}</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <Link href="/logout">{t('user.logout')}</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button>{t('user.login')}</Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden gap-4">
                        <ModeToggle />
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg md:hidden flex flex-col p-4 animate-in slide-in-from-top-2">
                        <nav className="flex flex-col gap-4">
                            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                {t('nav.home')}
                            </Link>
                            <Link href="/templates" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                {t('nav.templates')}
                            </Link>
                            <Link href="/blogs" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                {t('nav.blogs')}
                            </Link>
                            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                {t('nav.pricing')}
                            </Link>
                            <div className="flex flex-col gap-2 pl-4 border-l-2 border-border/50">
                                <span className="text-xs text-muted-foreground uppercase font-semibold">{t('nav.pages')}</span>
                                <Link href="/terms" className="text-sm hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.terms')}</Link>
                                <Link href="/privacy" className="text-sm hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.privacy')}</Link>
                                <Link href="/about" className="text-sm hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.about')}</Link>
                            </div>
                            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                {t('nav.contact')}
                            </Link>

                            <div className="my-2 border-t border-border" />

                            {isAuthenticated ? (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                <User className="h-6 w-6" />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                    <Link href="/dashboard" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <LayoutDashboard className="h-4 w-4" /> {t('user.dashboard')}
                                    </Link>
                                    <Link href="/wallet" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <CreditCard className="h-4 w-4" /> {t('user.wallet')}
                                    </Link>
                                    <Link href="/settings" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Settings className="h-4 w-4" /> {t('user.settings')}
                                    </Link>
                                    <Link href="/logout" className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <LogOut className="h-4 w-4" /> {t('user.logout')}
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full">{t('user.login')}</Button>
                                    </Link>
                                </div>
                            )}

                            <div className="my-2 border-t border-border" />

                            {/* Mobile Contact Info */}
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Phone className="h-3 w-3" />
                                    0105411110
                                </span>
                                <span className="flex items-center gap-2">
                                    <Mail className="h-3 w-3" />
                                    example@example.com
                                </span>
                            </div>

                            {/* Mobile Socials */}
                            <div className="flex gap-2 mt-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Facebook className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Youtube className="h-4 w-4" />
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
