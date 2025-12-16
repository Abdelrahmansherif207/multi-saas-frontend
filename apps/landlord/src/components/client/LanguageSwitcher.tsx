"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => switchLocale("en")}
                className={cn(
                    "h-8 px-2 text-xs font-semibold rounded-md transition-colors",
                    locale === "en"
                        ? "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                EN
            </Button>
            <div className="h-4 w-[1px] bg-border" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => switchLocale("ar")}
                className={cn(
                    "h-8 px-2 text-xs font-semibold rounded-md transition-colors",
                    locale === "ar"
                        ? "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                عربي
            </Button>
        </div>
    );
}
