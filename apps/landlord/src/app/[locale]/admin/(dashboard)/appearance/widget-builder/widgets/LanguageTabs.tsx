interface LanguageTabsProps {
    activeTab: "en" | "ar";
    onTabChange: (tab: "en" | "ar") => void;
    labels: { english: string; arabic: string };
}

export function LanguageTabs({ activeTab, onTabChange, labels }: LanguageTabsProps) {
    return (
        <div className="flex gap-1 border-b border-border/40 mb-4">
            <button
                onClick={() => onTabChange("en")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "en"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
            >
                {labels.english}
            </button>
            <button
                onClick={() => onTabChange("ar")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "ar"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
            >
                {labels.arabic}
            </button>
        </div>
    );
}
