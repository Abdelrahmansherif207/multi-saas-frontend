"use client";

import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock theme data
const mockThemes = [
    { id: 1, name: "Agency", image: "/themes/agency.jpg", active: false },
    { id: 2, name: "Article", image: "/themes/article.jpg", active: true },
    { id: 3, name: "Barber Shop", image: "/themes/barber.jpg", active: false },
    { id: 4, name: "Construction", image: "/themes/construction.jpg", active: false },
    { id: 5, name: "Consultancy", image: "/themes/consultancy.jpg", active: true },
    { id: 6, name: "Course", image: "/themes/course.jpg", active: true },
    { id: 7, name: "Donation", image: "/themes/donation.jpg", active: true },
    { id: 8, name: "Ecommerce", image: "/themes/ecommerce.jpg", active: true },
];

export default function AllThemesPage() {
    const t = useTranslations("Admin.ThemeManage.AllThemes");
    const tMenu = useTranslations("Admin.ThemeManage.menu");
    const [themes, setThemes] = useState(mockThemes);

    const toggleThemeStatus = (id: number) => {
        setThemes(themes.map(theme =>
            theme.id === id ? { ...theme, active: !theme.active } : theme
        ));
    };

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_themes"), href: "/admin/themes" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <a href="#" className="text-primary hover:underline text-sm font-medium">
                        {t("refresh_images")}
                    </a>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-600 dark:text-blue-400 text-sm">
                        {t("note_text")}
                    </div>

                    <p className="text-sm text-muted-foreground">
                        {t("edit_hint")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className={cn(
                                "rounded-2xl border-2 overflow-hidden bg-card/60 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer",
                                theme.active ? "border-green-500" : "border-border/40"
                            )}
                        >
                            <div className="aspect-[4/3] bg-muted/20 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                                    <Palette className="h-16 w-16" />
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <span className="font-medium text-foreground">{theme.name}</span>
                                <button
                                    onClick={() => toggleThemeStatus(theme.id)}
                                    className={cn(
                                        "px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200",
                                        theme.active
                                            ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    )}
                                >
                                    {theme.active ? t("active") : t("inactive")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminPageWrapper>
    );
}

function Palette({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
        </svg>
    );
}
