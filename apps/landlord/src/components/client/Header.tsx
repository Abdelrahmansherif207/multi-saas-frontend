"use client";

import Link from "next/link";
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
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

export function Header() {
    return (
        <header className="w-full sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-muted border-b">
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
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem value="language-selector">
                                    <NavigationMenuTrigger className="bg-muted">English</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-48 gap-1 p-2">
                                            <li>
                                                <NavigationMenuLink className="block p-2 hover:bg-muted rounded">
                                                    English
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink className="block p-2 hover:bg-muted rounded">
                                                    العربية
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
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
            <div className="glass border-b border-border/40">
                <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-bold">
                        <span className="text-primary">Multi</span>
                        <span>Saas</span>
                    </Link>

                    {/* Navigation */}
                    <NavigationMenu className="text-md">
                        <NavigationMenuList className="text-base">
                            <NavigationMenuItem value="home">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem value="pages">
                                <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-48 gap-1 p-2">
                                        <li>
                                            <NavigationMenuLink asChild className="block p-2 hover:bg-muted rounded">
                                                <Link href="/about">About Us</Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild className="block p-2 hover:bg-muted rounded">
                                                <Link href="/contact">Contact</Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem value="pricing">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pricing">Pricing Plan</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem value="blogs">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/blogs">Blogs</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
