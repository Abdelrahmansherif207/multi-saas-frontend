"use client";

import { useTranslations } from "next-intl";

import { Users, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatConfig {
    icon: React.ReactNode;
    className: string;
    textColor: string;
}

interface StatData {
    title: string;
    value: string | number;
}

// styling configuration
const statStyles: StatConfig[] = [
    {
        icon: <Users className="w-5 h-5" />,
        className: "bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF]", // Pink Gradient
        textColor: "text-white"
    },
    {
        icon: <Users className="w-5 h-5" />,
        className: "bg-gradient-to-r from-[#56CCF2] to-[#2F80ED]", // Blue Gradient
        textColor: "text-white"
    },
    {
        icon: <Diamond className="w-5 h-5" />,
        className: "bg-gradient-to-r from-[#11998e] to-[#38ef7d]", // Green/Teal Gradient
        textColor: "text-white"
    },
    {
        icon: <Diamond className="w-5 h-5" />,
        className: "bg-gradient-to-r from-[#2193b0] to-[#6dd5ed]", // Another Blue Gradient
        textColor: "text-white"
    },
    {
        icon: <Diamond className="w-5 h-5" />,
        className: "bg-gradient-to-r from-violet-400 to-purple-500", // Purple Gradient
        textColor: "text-white"
    },
    {
        icon: <Diamond className="w-5 h-5" />,
        className: "bg-gradient-to-r from-[#FFD200] to-[#F7971E]", // Yellow Orange
        textColor: "text-white"
    }
];

// This data will eventually come from the backend
// Moved inside component to allow for localization
export function DashboardStats() {
    const t = useTranslations("Admin.Dashboard.stats");

    const mockStatsData = [
        { title: t("total_admins"), value: 12 },
        { title: t("total_users"), value: 1234 },
        { title: t("total_blogs"), value: 56 },
        { title: t("total_testimonials"), value: 89 },
        { title: t("total_price_plans"), value: 3 },
        { title: t("total_brands"), value: 24 }
    ];

    // Merge data with styles based on index
    // In a real app, you might map by key or type, but index is fine for this UI mock
    const stats = mockStatsData.map((data, index) => ({
        ...data,
        ...statStyles[index % statStyles.length] // Cycle styles if more data than styles
    }));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={cn(
                        "relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                        stat.className
                    )}
                >
                    {/* Circle Overlays for "Enhance UI" */}
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
                    <div className="absolute -left-4 -bottom-4 h-32 w-32 rounded-full bg-white/20 blur-3xl" />

                    {/* Sharp geometric arcs similar to image */}
                    <div className="absolute right-0 bottom-0 opacity-10">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="80" fill="white" />
                        </svg>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-20">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="60" fill="white" />
                        </svg>
                    </div>

                    <div className={cn("relative z-10 flex flex-col h-full", stat.textColor)}>
                        <div className="flex items-center gap-2 mb-4 opacity-90">
                            <span className="text-sm font-semibold tracking-wide uppercase">{stat.title}</span>
                            {stat.icon}
                        </div>
                        <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
