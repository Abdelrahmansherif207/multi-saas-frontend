'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Settings,
    Search,
    User,
    LogOut,
    ChevronDown,
    Globe,
    Menu,
} from 'lucide-react';

interface AdminHeaderProps {
    sidebarCollapsed: boolean;
    onMenuClick?: () => void;
    locale: string;
}

export function AdminHeader({ sidebarCollapsed, onMenuClick, locale }: AdminHeaderProps) {
    const t = useTranslations('Admin.header');
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const isRTL = locale === 'ar';

    const sidebarWidth = sidebarCollapsed ? 72 : 260;

    return (
        <header
            className={`
                fixed top-0 h-16 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
                border-b border-slate-200 dark:border-slate-700/50
                transition-all duration-200 ease-out
            `}
            style={{
                [isRTL ? 'right' : 'left']: sidebarWidth,
                width: `calc(100% - ${sidebarWidth}px)`,
            }}
        >
            <div className="h-full flex items-center justify-between px-6">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl w-80">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                        />
                        <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-xs text-slate-400 bg-slate-200 dark:bg-slate-700 rounded">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* Language Switcher */}
                    <Link
                        href={`/${locale === 'en' ? 'ar' : 'en'}/realestate`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {locale === 'en' ? 'العربية' : 'EN'}
                        </span>
                    </Link>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setNotificationsOpen(!notificationsOpen)}
                            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                        </button>

                        <AnimatePresence>
                            {notificationsOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setNotificationsOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className={`
                                            absolute top-full mt-2 w-80 z-50
                                            bg-white dark:bg-slate-800 rounded-xl shadow-xl
                                            border border-slate-200 dark:border-slate-700
                                            overflow-hidden
                                            ${isRTL ? 'left-0' : 'right-0'}
                                        `}
                                    >
                                        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {t('notifications')}
                                            </h3>
                                        </div>
                                        <div className="p-4 text-center text-slate-500 text-sm">
                                            {isRTL ? 'لا توجد إشعارات جديدة' : 'No new notifications'}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Settings */}
                    <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/25">
                                JD
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    John Doe
                                </p>
                                <p className="text-xs text-slate-500">Admin</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
                        </button>

                        <AnimatePresence>
                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className={`
                                            absolute top-full mt-2 w-56 z-50
                                            bg-white dark:bg-slate-800 rounded-xl shadow-xl
                                            border border-slate-200 dark:border-slate-700
                                            overflow-hidden py-1
                                            ${isRTL ? 'left-0' : 'right-0'}
                                        `}
                                    >
                                        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                John Doe
                                            </p>
                                            <p className="text-xs text-slate-500">john@example.com</p>
                                        </div>
                                        <div className="py-1">
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                                <User className="w-4 h-4" />
                                                {t('profile')}
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                                <Settings className="w-4 h-4" />
                                                {t('settings')}
                                            </button>
                                        </div>
                                        <div className="py-1 border-t border-slate-200 dark:border-slate-700">
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                                <LogOut className="w-4 h-4" />
                                                {t('logout')}
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
