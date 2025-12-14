"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CreditCard,
    FileText,
    Ticket,
    ShieldCheck,
    User,
    Lock,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock User for Sidebar
const user = {
    name: "abdelrahman",
    image: null,
};

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Wallet", href: "wallet", icon: CreditCard },
    { name: "Payment Logs", href: "payments", icon: FileText },
    { name: "Support Tickets", href: "tickets", icon: Ticket },
    { name: "2FA Settings", href: "security", icon: ShieldCheck },
    { name: "Edit Profile", href: "profile", icon: User },
    { name: "Change Password", href: "password", icon: Lock },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex w-full flex-col bg-primary text-primary-foreground rounded-xl overflow-hidden shadow-lg h-[calc(100vh-150px)]">
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
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-primary-foreground/10 text-primary-foreground" // Active
                                    : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground" // Inactive
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
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
                    Logout
                </Button>
            </div>
        </div>
    );
}
