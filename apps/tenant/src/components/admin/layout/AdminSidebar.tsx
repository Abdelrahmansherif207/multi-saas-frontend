'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Building2,
    Layers,
    MapPin,
    Sparkles,
    Home,
    Users,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface NavItem {
    key: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
}

const navItems: NavItem[] = [
    { key: 'dashboard', icon: LayoutDashboard, href: '/realestate' },
    { key: 'properties', icon: Building2, href: '/realestate/properties' },
    { key: 'propertyTypes', icon: Layers, href: '/realestate/property-types' },
    { key: 'areas', icon: MapPin, href: '/realestate/areas' },
    { key: 'amenities', icon: Sparkles, href: '/realestate/amenities' },
    { key: 'compounds', icon: Home, href: '/realestate/compounds' },
    { key: 'developers', icon: Users, href: '/realestate/developers' },
    { key: 'inquiries', icon: MessageSquare, href: '/realestate/inquiries' },
];

interface AdminSidebarProps {
    collapsed?: boolean;
    onToggle?: () => void;
    locale: string;
}

export function AdminSidebar({ collapsed = false, onToggle, locale }: AdminSidebarProps) {
    const t = useTranslations('Admin.sidebar');
    const pathname = usePathname();
    const isRTL = locale === 'ar';

    const isActive = (href: string) => {
        const fullPath = `/${locale}${href}`;
        return pathname === fullPath || pathname.startsWith(fullPath + '/');
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={`
                fixed top-0 h-screen z-40 flex flex-col
                bg-gradient-to-b from-slate-900 to-slate-800
                border-r border-slate-700/50
                ${isRTL ? 'right-0 border-l border-r-0' : 'left-0'}
            `}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-center border-b border-slate-700/50 px-4">
                <AnimatePresence mode="wait">
                    {collapsed ? (
                        <motion.div
                            key="collapsed-logo"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
                        >
                            <Building2 className="w-5 h-5 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="expanded-logo"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-semibold text-lg tracking-tight">
                                RealEstate
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <li key={item.key}>
                                <Link
                                    href={`/${locale}${item.href}`}
                                    className={`
                                        group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                                        transition-all duration-200 ease-out
                                        ${active
                                            ? 'bg-blue-500/15 text-blue-400'
                                            : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                                        }
                                        ${collapsed ? 'justify-center' : ''}
                                    `}
                                >
                                    {/* Active indicator */}
                                    {active && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-full`}
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-400' : 'group-hover:text-blue-400'} transition-colors`} />

                                    <AnimatePresence mode="wait">
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                            >
                                                {t(item.key)}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* Tooltip for collapsed state */}
                                    {collapsed && (
                                        <div className={`
                                            absolute ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} 
                                            px-2 py-1 bg-slate-800 text-white text-sm rounded-md
                                            opacity-0 group-hover:opacity-100 pointer-events-none
                                            transition-opacity whitespace-nowrap z-50
                                            border border-slate-700
                                        `}>
                                            {t(item.key)}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Collapse Toggle Button */}
            <div className="p-3 border-t border-slate-700/50">
                <button
                    onClick={onToggle}
                    className={`
                        w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                        text-slate-400 hover:text-slate-200 hover:bg-slate-700/50
                        transition-all duration-200
                        ${collapsed ? 'justify-center' : ''}
                    `}
                >
                    {isRTL ? (
                        collapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
                    ) : (
                        collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
                    )}
                    <AnimatePresence mode="wait">
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm"
                            >
                                {isRTL ? 'طي القائمة' : 'Collapse'}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.aside>
    );
}
