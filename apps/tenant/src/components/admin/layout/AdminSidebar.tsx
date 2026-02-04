'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
    LogOut,
    Settings,
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

    const sidebarWidth = collapsed ? 88 : 300;

    return (
        <div className="dark">
            <aside
                style={{ width: sidebarWidth }}
                className={`
                    fixed top-0 h-screen z-40 flex flex-col
                    bg-[#0f0f12]
                    transition-all duration-300 ease-in-out
                    ${isRTL ? 'right-0 rounded-l-3xl' : 'left-0 rounded-r-3xl'}
                `}
            >
                {/* Subtle right border */}
                <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} w-px bg-white/[0.06]`} />

                {/* Logo Section with Collapse Toggle */}
                <div className={`h-20 flex items-center justify-between ${collapsed ? 'px-4' : 'px-6'}`}>
                    <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'gap-4 flex-1'}`}>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col flex-1">
                                <span className="text-white font-bold text-xl tracking-tight">
                                    RealEstate
                                </span>
                                <span className="text-zinc-500 text-sm font-medium">
                                    Admin Panel
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Collapse Toggle - in header */}
                    {!collapsed && (
                        <button
                            onClick={onToggle}
                            className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
                            title={isRTL ? 'طي القائمة' : 'Collapse sidebar'}
                        >
                            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                        </button>
                    )}
                </div>

                {/* Expand button when collapsed */}
                {collapsed && (
                    <div className="px-4 pb-4">
                        <button
                            onClick={onToggle}
                            className="w-full p-3 rounded-xl text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all flex items-center justify-center"
                            title={isRTL ? 'توسيع القائمة' : 'Expand sidebar'}
                        >
                            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 overflow-y-auto overflow-x-hidden">
                    {!collapsed && (
                        <div className="px-3 mb-4">
                            <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                                {isRTL ? 'القائمة الرئيسية' : 'Main Menu'}
                            </span>
                        </div>
                    )}
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <li key={item.key}>
                                    <Link
                                        href={`/${locale}${item.href}`}
                                        title={collapsed ? t(item.key) : undefined}
                                        className={`
                                            group relative flex items-center rounded-2xl
                                            transition-all duration-200
                                            ${collapsed ? 'justify-center p-4' : 'gap-4 px-4 py-3.5'}
                                            ${active
                                                ? 'bg-violet-500/15 text-white'
                                                : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                                            }
                                        `}
                                    >
                                        {/* Active indicator */}
                                        {active && (
                                            <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-1 h-8 bg-violet-500 rounded-full`} />
                                        )}

                                        <div className={`
                                            flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0
                                            ${active
                                                ? 'bg-violet-500/20'
                                                : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
                                            }
                                            transition-all duration-200
                                        `}>
                                            <Icon className={`w-5 h-5 ${active ? 'text-violet-400' : 'text-zinc-400 group-hover:text-white'} transition-colors`} />
                                        </div>

                                        {!collapsed && (
                                            <span className="text-[15px] font-semibold tracking-tight">
                                                {t(item.key)}
                                            </span>
                                        )}

                                        {/* Tooltip for collapsed */}
                                        {collapsed && (
                                            <div className={`
                                                absolute ${isRTL ? 'right-full mr-3' : 'left-full ml-3'}
                                                px-4 py-2.5 bg-[#1a1a1f] text-white text-sm font-semibold rounded-xl
                                                opacity-0 group-hover:opacity-100 pointer-events-none
                                                transition-all duration-200 whitespace-nowrap z-50
                                                border border-white/10
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

                {/* Bottom Section */}
                <div className="p-4 space-y-2">
                    {/* Settings */}
                    <button
                        className={`
                            w-full flex items-center rounded-2xl p-3.5
                            text-zinc-500 hover:text-white hover:bg-white/[0.04]
                            transition-all duration-200
                            ${collapsed ? 'justify-center' : 'gap-4 px-4'}
                        `}
                        title={collapsed ? (isRTL ? 'الإعدادات' : 'Settings') : undefined}
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                            <Settings className="w-5 h-5" />
                        </div>
                        {!collapsed && (
                            <span className="text-[15px] font-semibold">
                                {isRTL ? 'الإعدادات' : 'Settings'}
                            </span>
                        )}
                    </button>

                    {/* Logout */}
                    <button
                        className={`
                            w-full flex items-center rounded-2xl p-3.5
                            text-zinc-500 hover:text-red-400 hover:bg-red-500/10
                            transition-all duration-200
                            ${collapsed ? 'justify-center' : 'gap-4 px-4'}
                        `}
                        title={collapsed ? (isRTL ? 'تسجيل الخروج' : 'Logout') : undefined}
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                            <LogOut className="w-5 h-5" />
                        </div>
                        {!collapsed && (
                            <span className="text-[15px] font-semibold">
                                {isRTL ? 'تسجيل الخروج' : 'Logout'}
                            </span>
                        )}
                    </button>
                </div>
            </aside>
        </div>
    );
}
