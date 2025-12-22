"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  Globe,
  Shield,
  FileText,
  LogOut,
  UserCog,
  ChevronDown,
  ChevronRight,
  Circle,
  ArrowRight,
  NotepadText,
  StickyNote,
  Bell,
    Wallet,
    Palette,
    Mail,
} from "lucide-react";
import { useSidebar } from "./sidebar-context";

interface SubItem {
    title: string;
    href: string;
}

interface SidebarItem {
    title: string;
    href?: string;
    icon: any;
    subItems?: SubItem[];
}

export function SidebarContent({
    onClose,
    collapsed = false,
}: {
    onClose?: () => void;
    collapsed?: boolean;
}) {
const pathname = usePathname();

const t = useTranslations("Admin.RoleManage.menu");
const tUser = useTranslations("Admin.UserManage.menu");
const tWebsite = useTranslations("Admin.WebsiteManage.menu");
const tPages = useTranslations("Admin.Pages.menu");
const tBlogs = useTranslations("Admin.Blogs.menu");
const tCoupons = useTranslations("Admin.Coupons.menu");
const tNotifications = useTranslations("Admin.Notifications.menu");
const tWallet = useTranslations("Admin.WalletManage.menu");
const tTheme = useTranslations("Admin.ThemeManage.menu");
const tPricePlan = useTranslations("Admin.PricePlanManage.menu");
const tNewsletter = useTranslations("Admin.NewsletterManage.menu");

const sidebarItems: SidebarItem[] = [
  {
    title: t("dashboard"),
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: t("title"),
    icon: UserCog,
    subItems: [
      { title: t("all_admins"), href: "/admin/admins" },
      { title: t("add_admin"), href: "/admin/admins/create" },
      { title: t("all_roles"), href: "/admin/admins/roles" },
    ],
  },

  {
    title: tUser("title"),
    icon: Users,
    subItems: [
      { title: tUser("all_users"), href: "/admin/users" },
      { title: tUser("add_user"), href: "/admin/users/new" },
      { title: tUser("settings"), href: "/admin/users/settings" },
    ],
  },

  {
    title: tWebsite("title"),
    icon: Globe,
    subItems: [
      { title: tWebsite("issues"), href: "/admin/websites/issues" },
      { title: tWebsite("all_websites"), href: "/admin/websites" },
      { title: tWebsite("instructions"), href: "/admin/websites/instructions" },
    ],
  },

  {
    title: tPages("title"),
    icon: NotepadText,
    subItems: [
      { title: tPages("all_pages"), href: "/admin/pages" },
      { title: tPages("new_pages"), href: "/admin/pages/new-pages" },
    ],
  },

  {
    title: tBlogs("title"),
    icon: StickyNote,
    subItems: [
      { title: tBlogs("all_blogs"), href: "/admin/blogs" },
      { title: tBlogs("add_blog"), href: "/admin/blogs/new-blog" },
      { title: tBlogs("category"), href: "/admin/blogs/blog-category" },
      { title: tBlogs("settings"), href: "/admin/blogs/settings" },
    ],
  },

  {
    title: tCoupons("title"),
    icon: CreditCard,
    href: "/admin/coupons",
  },

  {
    title: tNotifications("title"),
    icon: Bell,
    subItems: [
      { title: tNotifications("all_notifications"), href: "/admin/notifications" },
      { title: tNotifications("user_activity"), href: "/admin/notifications/user-activity-log" },
      { title: tNotifications("cron_jobs"), href: "/admin/notifications/cron-jobs" },
      { title: tNotifications("contact_messages"), href: "/admin/notifications/contact-message" },
    ],
  },

  {
    title: tWallet("title"),
    icon: Wallet,
    subItems: [
      { title: tWallet("all_wallet"), href: "/admin/wallet" },
      { title: tWallet("history"), href: "/admin/wallet/history" },
      { title: tWallet("settings"), href: "/admin/wallet/settings" },
    ],
  },

  {
    title: tTheme("title"),
    icon: Palette,
    subItems: [
      { title: tTheme("all_themes"), href: "/admin/themes" },
      { title: tTheme("settings"), href: "/admin/themes/settings" },
      { title: tTheme("add_theme"), href: "/admin/themes/new" },
    ],
  },

  {
    title: tPricePlan("title"),
    icon: CreditCard,
    subItems: [
      { title: tPricePlan("all_plans"), href: "/admin/price-plans" },
      { title: tPricePlan("new_plan"), href: "/admin/price-plans/new" },
      { title: tPricePlan("settings"), href: "/admin/price-plans/settings" },
    ],
  },

  {
    title: tNewsletter("title"),
    icon: Mail,
    subItems: [
      { title: tNewsletter("all_subscribers"), href: "/admin/newsletter" },
      { title: tNewsletter("send_mail"), href: "/admin/newsletter/send" },
    ],
  },
];

const [expandedItems, setExpandedItems] = useState<string[]>(() =>
  sidebarItems
    .filter((item) => item.subItems?.some((sub) => sub.href === pathname))
    .map((item) => item.title)
);


    const toggleExpand = (title: string) => {
        setExpandedItems((prev) =>
            prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
        );
    };

    return (
        <div className="flex flex-col h-full bg-sidebar/50 md:bg-transparent">
            {/* Logo Area */}
            <div
                className={cn(
                    "h-20 flex items-center transition-all duration-300",
                    collapsed ? "justify-center px-0" : "px-6 md:px-8"
                )}
            >
                <Link
                    href="/admin"
                    className="flex items-center gap-3 group"
                    onClick={onClose}
                >
                    <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-500 ease-out">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                        >
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {!collapsed && (
                        <span className="font-bold text-2xl tracking-tight text-foreground/90 group-hover:text-foreground transition-colors animate-in fade-in duration-300">
                            MultiSaas
                        </span>
                    )}
                </Link>
            </div>

            <div
                className={cn(
                    "flex-1 overflow-y-auto py-6 space-y-3",
                    collapsed ? "px-2" : "px-4"
                )}
            >
                {sidebarItems.map((item) => {
                    const isExpanded = expandedItems.includes(item.title);
                    const isActiveParent = item.subItems?.some(
                        (sub) => sub.href === pathname
                    );
                    const isDirectActive = item.href === pathname;
                    const isActive = isDirectActive || isActiveParent;

                    if (item.subItems) {
                        return (
                            <div key={item.title} className="space-y-3">
                                <Link
                                    href={item.subItems[0]?.href || "#"}
                                    onClick={(e) => {
                                        if (!collapsed) {
                                            if (expandedItems.includes(item.title)) {
                                                e.preventDefault();
                                            }
                                            toggleExpand(item.title);
                                        }
                                        if (onClose) onClose();
                                    }}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 w-full group select-none",
                                        isActiveParent
                                            ? "text-white bg-primary dark:text-black"
                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                        collapsed && "justify-center px-0 py-3"
                                    )}
                                    title={collapsed ? item.title : undefined}
                                >
                                    <item.icon
                                        className={cn(
                                            "w-5 h-5 transition-colors shrink-0",
                                            isActiveParent
                                                ? "text-white dark:text-black"
                                                : "text-muted-foreground group-hover:text-foreground"
                                        )}
                                    />
                                    {!collapsed && (
                                        <>
                                            <span className="flex-1 text-left line-clamp-1">
                                                {item.title}
                                            </span>
                                            {isExpanded ? (
                                                <ChevronDown className="w-4 h-4 opacity-50" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 opacity-50" />
                                            )}
                                        </>
                                    )}
                                </Link>

                                {!collapsed && isExpanded && (
                                    <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                        {item.subItems.map((sub) => {
                                            const isSubActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    onClick={onClose}
                                                    className={cn(
                                                        "group/sub flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ml-4",
                                                        isSubActive
                                                            ? "text-primary bg-primary/10"
                                                            : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/30"
                                                    )}
                                                >
                                                    <ArrowRight
                                                        className={cn(
                                                            "w-3 h-3 transition-transform duration-300",
                                                            isSubActive
                                                                ? "opacity-100 translate-x-0.5"
                                                                : "opacity-40 group-hover/sub:translate-x-0.5 group-hover/sub:opacity-100"
                                                        )}
                                                    />
                                                    <span>{sub.title}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href!}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 group relative",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                collapsed && "justify-center px-0 py-3"
                            )}
                            title={collapsed ? item.title : undefined}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5 transition-colors shrink-0",
                                    isActive
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            {!collapsed && <span>{item.title}</span>}
                        </Link>
                    );
                })}
            </div>

            <div className={cn("p-6", collapsed && "p-4 flex justify-center")}>
                <button
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-300",
                        collapsed && "justify-center px-0 w-10 h-10 p-0"
                    )}
                    title="Sign Out"
                >
                    <LogOut className="w-5 h-5" />
                    {!collapsed && <span>Sign Out</span>}
                </button>
            </div>
        </div>
    );
}

export function AdminSidebar() {
    const { isCollapsed } = useSidebar();

    return (
        <aside
            className={cn(
                "hidden md:flex flex-col h-full shrink-0 border-r-0 relative transition-all duration-300 ease-in-out",
                isCollapsed ? "w-24" : "w-72"
            )}
        >
            {/* Background Blur/Gradient if desired, or just transparent to let Layout bg show */}
            <div className="absolute inset-y-4 left-4 right-0 bg-card/60 backdrop-blur-xl rounded-3xl border border-border/40 shadow-sm dark:shadow-primary/5" />
            {/* The Content sits on top */}
            <div className="relative z-10 h-full py-4 pl-4">
                <SidebarContent collapsed={isCollapsed} />
            </div>
        </aside>
    );
}
