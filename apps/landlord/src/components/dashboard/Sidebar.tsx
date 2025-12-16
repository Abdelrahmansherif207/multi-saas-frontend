"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import {
    LayoutDashboard,
    CreditCard,
    FileText,
    Ticket,
    ShieldCheck,
    User,
    LogOut,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Mock User for Sidebar
const user = {
    name: "abdelrahman",
    image: null,
};

type NavigationItem = {
    name: string;
    translationKey: string;
    href: string;
    icon: any;
    children?: { name: string; translationKey: string; href: string }[];
};

export function Sidebar() {
    const pathname = usePathname();
    const [openDropdowns, setOpenDropdowns] = useState<string[]>(["wallet"]);
    const t = useTranslations('Sidebar');

    const navigation: NavigationItem[] = [
        { name: "dashboard", translationKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
        {
            name: "wallet",
            translationKey: "nav.wallet",
            href: "#",
            icon: CreditCard,
            children: [
                { name: "wallet", translationKey: "nav.wallet", href: "/wallet" },
                { name: "wallet_settings", translationKey: "nav.wallet_settings", href: "/wallet/settings" },
            ],
        },
        { name: "payments", translationKey: "nav.payments", href: "/payments", icon: FileText },
        { name: "tickets", translationKey: "nav.tickets", href: "/tickets", icon: Ticket },
        { name: "security", translationKey: "nav.security", href: "/security", icon: ShieldCheck },
        { name: "profile", translationKey: "nav.profile", href: "/profile", icon: User },
        { name: "password", translationKey: "nav.password", href: "/password", icon: ShieldCheck }, // Placeholder link as requested
    ];

    const toggleDropdown = (name: string) => {
        setOpenDropdowns((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        );
    };

    return (
        <div className="flex w-full flex-col bg-primary text-primary-foreground rounded-xl overflow-hidden shadow-lg h-full">
            {/* User Profile Header */}
            <div className="flex flex-col items-center justify-center py-8 border-b border-primary-foreground/10">
                <div className="h-20 w-20 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-4">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <User className="h-10 w-10 text-primary-foreground" />
                    )}
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const isDropdownOpen = openDropdowns.includes(item.name);
                    const hasChildren = item.children && item.children.length > 0;

                    if (hasChildren) {
                        const isChildActive = item.children?.some(child => pathname === child.href);

                        return (
                            <div key={item.name} className="flex flex-col">
                                <button
                                    onClick={() => toggleDropdown(item.name)}
                                    className={cn(
                                        "flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                        isChildActive || isDropdownOpen
                                            ? "bg-primary-foreground/10 text-primary-foreground"
                                            : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-5 w-5" />
                                        {t(item.translationKey)}
                                    </div>
                                    {isDropdownOpen ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>
                                {isDropdownOpen && (
                                    <div className="ml-9 mt-1 space-y-1 border-l border-primary-foreground/10 pl-2">
                                        {item.children?.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={cn(
                                                    "block px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                                    pathname === child.href
                                                        ? "bg-primary-foreground/10 text-primary-foreground"
                                                        : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
                                                )}
                                            >
                                                {t(child.translationKey)}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-primary-foreground/10 text-primary-foreground"
                                    : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {t(item.translationKey)}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-primary-foreground/10">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground pl-4"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    {t('logout')}
                </Button>
            </div>
        </div>
    );
}
