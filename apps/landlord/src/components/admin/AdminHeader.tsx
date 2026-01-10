'use client';

import { Link, usePathname } from '@/i18n/routing';
import {
    Bell,
    ExternalLink,
    Mail,
    Search,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { SidebarContent } from './AdminSidebar';
import { useState, useEffect } from 'react';
import { usePathname as useNextPathname } from 'next/navigation';

import { useSidebar } from './sidebar-context';
import LanguageSwitcher from '@/components/client/LanguageSwitcher';

interface AdminProfile {
    id: number;
    name: string;
    email: string;
    username?: string;
    image?: string;
}

export function AdminHeader() {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { toggleSidebar } = useSidebar();
    const [admin, setAdmin] = useState<AdminProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const nextPathname = useNextPathname();

    // Extract locale from pathname (e.g., /en/admin -> en)
    const locale = nextPathname.split('/')[1] || 'en';

    // Fetch admin profile on mount
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('/api/admin/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    setAdmin(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch admin profile:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth/logout', { method: 'POST' });
            window.location.href = `/${locale}/admin/login`;
        } catch (error) {
            console.error('Logout failed:', error);
            window.location.href = `/${locale}/admin/login`;
        }
    };

    // Get initials from name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="h-20 px-6 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-50">
            {/* Glass Background Container */}
            <div className="absolute inset-x-4 top-4 bottom-0 bg-card/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm dark:shadow-primary/5 dark:border-white/5 -z-10" />

            {/* Expanded Search Overlay */}
            {searchOpen ? (
                <div className="absolute inset-x-4 top-4 bottom-0 bg-background/95 backdrop-blur-3xl rounded-2xl flex items-center px-6 z-20 animate-in fade-in zoom-in-95 duration-200 border border-brand-orange/20 ring-4 ring-brand-orange/5">
                    <Search className="w-6 h-6 text-brand-orange mr-4" />
                    <input
                        autoFocus
                        className="flex-1 bg-transparent border-none outline-none text-3xl font-medium placeholder:text-muted-foreground/50 h-full w-full"
                        placeholder="Search anything..."
                        onBlur={() => {
                            // Optional: Close on blur if desired, or keep open until explicit close
                            // setSearchOpen(false); 
                        }}
                    />
                    <div className="flex items-center gap-2">
                        <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">ESC</span>
                        </kbd>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSearchOpen(false)}
                            className="hover:bg-destructive/10 hover:text-destructive rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            ) : null}

            {/* Left: Mobile Menu & Search Trigger */}
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Sidebar Trigger */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-80 border-r-0 bg-background/95 backdrop-blur-xl">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SidebarContent onClose={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>

                {/* Desktop Sidebar Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="hidden md:flex text-muted-foreground hover:text-foreground"
                >
                    <Menu className="w-6 h-6" />
                </Button>

                {/* Search Trigger */}
                <Button
                    variant="ghost"
                    onClick={() => setSearchOpen(true)}
                    className="hidden md:flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 px-3 h-10 rounded-xl transition-all group"
                >
                    <Search className="w-5 h-5 group-hover:text-brand-orange transition-colors" />
                    <span className="text-sm font-medium hidden lg:block opacity-70 group-hover:opacity-100">Search...</span>
                </Button>
            </div>

            {/* Right Actions - Hidden when search is open (optional, but overlay covers it anyway) */}
            <div className="flex items-center gap-2 md:gap-4">

                <div className="hidden md:flex items-center gap-2 pr-4 mr-2 border-r border-border/10">
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20 shadow-sm">
                        System Healthy
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <LanguageSwitcher />
                    <ThemeToggle />

                    <Button variant="ghost" size="icon" className="h-9 w-9 relative text-muted-foreground hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-card" />
                    </Button>

                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-colors hidden sm:flex">
                        <Mail className="w-5 h-5" />
                    </Button>
                </div>

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-3 pl-2 pr-3 hover:bg-accent/50 h-10 rounded-xl transition-all">
                            <Avatar className="h-8 w-8 border border-white/20 shadow-sm">
                                <AvatarImage src={admin?.image || "https://github.com/shadcn.png"} />
                                <AvatarFallback>{admin ? getInitials(admin.name) : 'AD'}</AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-semibold leading-none">
                                    {isLoading ? 'Loading...' : (admin?.name || 'Admin')}
                                </p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-white/10 p-2">
                        <DropdownMenuLabel className="px-3">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem className="rounded-lg cursor-pointer" asChild>
                            <Link href="/admin/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg cursor-pointer">Settings</DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-destructive rounded-lg cursor-pointer focus:text-destructive"
                        >
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant="default"
                    className="hidden lg:flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white shadow-lg shadow-brand-orange/20 rounded-xl h-10 px-5 font-medium transition-all duration-300 transform hover:translate-y-[-1px]"
                >
                    <ExternalLink className="w-4 h-4" />
                    Visit Site
                </Button>
            </div>
        </header>
    );
}
