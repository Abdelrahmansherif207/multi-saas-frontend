"use client";

import Link from "next/link";
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube, User, LayoutDashboard, CreditCard, Settings, LogOut } from "lucide-react";

// Mock Auth State (Temporary)
const isAuthenticated = true;
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

export function Header() {
    return (
        <header className="w-full sticky top-0 z-50">
            {/* Top Bar */}
            <div className="glass border-b">
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
                        <NavigationMenuList className="text-base items-center">
                            <NavigationMenuItem value="home">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem value="templates">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/templates">Templates</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem value="blogs">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/blogs">Blogs</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem value="pricing">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/pricing">Pricing Plans</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* Pages Dropdown - Using DropdownMenu for exact positioning */}
                            <NavigationMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className={navigationMenuTriggerStyle() + " group"}>
                                        Pages
                                        <ChevronDown
                                            className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                                            aria-hidden="true"
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-52">
                                        <DropdownMenuItem asChild>
                                            <Link href="/terms" className="w-full cursor-pointer">Terms & Conditions</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/privacy" className="w-full cursor-pointer">Privacy Policy</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/about" className="w-full cursor-pointer">About Us</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavigationMenuItem>

                            <NavigationMenuItem value="contact">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/contact">Contact</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
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
                                        <span>Dashboard</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>My Wallet</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button>Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
