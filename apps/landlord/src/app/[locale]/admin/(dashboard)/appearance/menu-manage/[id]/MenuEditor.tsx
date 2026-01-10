"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
    id: string;
    title: string;
    children: MenuItem[];
    isExpanded: boolean;
}

interface MenuEditorProps {
    translations: {
        title: string;
        all_menus: string;
        add_menu_items: string;
        pages: string;
        add_to_menu: string;
        custom_links: string;
        url: string;
        link_text: string;
        mega_menus: string;
        menu_structure: string;
        update_changes: string;
        pages_list: Record<string, string>;
    };
    locale: string;
    menuId: string;
}

// Page options for checkboxes
const PAGE_OPTIONS = [
    { id: "home", key: "home" },
    { id: "about_us", key: "about_us" },
    { id: "pricing_plan", key: "pricing_plan" },
    { id: "contact", key: "contact" },
    { id: "terms_condition", key: "terms_condition" },
    { id: "privacy_policy", key: "privacy_policy" },
    { id: "all_templates", key: "all_templates" },
    { id: "blogs", key: "blogs" },
];

// Mock initial menu structure
const INITIAL_MENU: MenuItem[] = [
    { id: "1", title: "Home", children: [], isExpanded: true },
    { id: "2", title: "About Us", children: [], isExpanded: true },
    { id: "3", title: "Pricing Plan", children: [], isExpanded: true },
    { id: "4", title: "Blogs", children: [], isExpanded: true },
    {
        id: "5",
        title: "Pages",
        isExpanded: true,
        children: [
            { id: "5-1", title: "All Templates", children: [], isExpanded: true },
            { id: "5-2", title: "Terms & Condition", children: [], isExpanded: true },
            { id: "5-3", title: "Privacy Policy", children: [], isExpanded: true },
        ],
    },
    { id: "6", title: "Contact", children: [], isExpanded: true },
];

function MenuItemComponent({
    item,
    depth = 0,
    onRemove,
    onToggle,
}: {
    item: MenuItem;
    depth?: number;
    onRemove: (id: string) => void;
    onToggle: (id: string) => void;
}) {
    return (
        <div className="space-y-2">
            <div
                className={cn(
                    "flex items-center gap-2 p-3 bg-background border border-border/40 rounded-lg",
                    depth > 0 && "ml-8"
                )}
            >
                <button className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                    <GripVertical className="h-4 w-4" />
                </button>
                <span className="flex-1 text-sm font-medium">{item.title}</span>
                {item.children.length > 0 && (
                    <button
                        onClick={() => onToggle(item.id)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                    >
                        {item.isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                    </button>
                )}
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors"
                >
                    <X className="h-4 w-4 text-destructive" />
                </button>
            </div>
            {item.isExpanded && item.children.length > 0 && (
                <div className="space-y-2">
                    {item.children.map((child) => (
                        <MenuItemComponent
                            key={child.id}
                            item={child}
                            depth={depth + 1}
                            onRemove={onRemove}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function MenuEditor({ translations, locale, menuId }: MenuEditorProps) {
    const router = useRouter();
    const [menuTitle, setMenuTitle] = useState("primary_menu");
    const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
    const [selectedPages, setSelectedPages] = useState<string[]>([]);
    const [customUrl, setCustomUrl] = useState("");
    const [customLinkText, setCustomLinkText] = useState("");
    const [isPagesExpanded, setIsPagesExpanded] = useState(true);
    const [isCustomLinksExpanded, setIsCustomLinksExpanded] = useState(true);

    const handlePageToggle = (pageId: string) => {
        setSelectedPages((prev) =>
            prev.includes(pageId)
                ? prev.filter((id) => id !== pageId)
                : [...prev, pageId]
        );
    };

    const handleAddSelectedPages = () => {
        const newItems: MenuItem[] = selectedPages.map((pageId) => ({
            id: `page-${Date.now()}-${pageId}`,
            title: translations.pages_list[pageId] || pageId,
            children: [],
            isExpanded: true,
        }));
        setMenuItems((prev) => [...prev, ...newItems]);
        setSelectedPages([]);
    };

    const handleAddCustomLink = () => {
        if (customUrl.trim() && customLinkText.trim()) {
            const newItem: MenuItem = {
                id: `custom-${Date.now()}`,
                title: customLinkText,
                children: [],
                isExpanded: true,
            };
            setMenuItems((prev) => [...prev, newItem]);
            setCustomUrl("");
            setCustomLinkText("");
        }
    };

    const removeMenuItem = (id: string) => {
        const removeFromList = (items: MenuItem[]): MenuItem[] => {
            return items
                .filter((item) => item.id !== id)
                .map((item) => ({
                    ...item,
                    children: removeFromList(item.children),
                }));
        };
        setMenuItems(removeFromList(menuItems));
    };

    const toggleMenuItem = (id: string) => {
        const toggleInList = (items: MenuItem[]): MenuItem[] => {
            return items.map((item) => {
                if (item.id === id) {
                    return { ...item, isExpanded: !item.isExpanded };
                }
                return { ...item, children: toggleInList(item.children) };
            });
        };
        setMenuItems(toggleInList(menuItems));
    };

    const handleUpdateChanges = () => {
        console.log("Updating menu:", { menuTitle, menuItems });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-foreground">{translations.title}</h2>
                    <Input
                        value={menuTitle}
                        onChange={(e) => setMenuTitle(e.target.value)}
                        className="max-w-md rounded-lg"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={() => router.push(`/${locale}/admin/appearance/menu-manage`)}
                    className="rounded-lg"
                >
                    {translations.all_menus}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Sidebar - Add Menu Items */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {translations.add_menu_items}
                    </h3>

                    {/* Pages Section */}
                    <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-sm">
                        <button
                            onClick={() => setIsPagesExpanded(!isPagesExpanded)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                        >
                            <span className="font-semibold text-primary">{translations.pages}</span>
                            {isPagesExpanded ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                        {isPagesExpanded && (
                            <div className="px-4 pb-4 space-y-3">
                                {PAGE_OPTIONS.map((page) => (
                                    <div key={page.id} className="flex items-center gap-2">
                                        <Checkbox
                                            id={page.id}
                                            checked={selectedPages.includes(page.id)}
                                            onCheckedChange={() => handlePageToggle(page.id)}
                                        />
                                        <label
                                            htmlFor={page.id}
                                            className="text-sm cursor-pointer hover:text-primary"
                                        >
                                            {translations.pages_list[page.key]}
                                        </label>
                                    </div>
                                ))}
                                <Button
                                    size="sm"
                                    onClick={handleAddSelectedPages}
                                    disabled={selectedPages.length === 0}
                                    className="bg-primary hover:bg-primary/90 rounded-lg mt-2"
                                >
                                    {translations.add_to_menu}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Custom Links Section */}
                    <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-sm">
                        <button
                            onClick={() => setIsCustomLinksExpanded(!isCustomLinksExpanded)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                        >
                            <span className="font-semibold text-primary">{translations.custom_links}</span>
                            {isCustomLinksExpanded ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                        {isCustomLinksExpanded && (
                            <div className="px-4 pb-4 space-y-3">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.url}</Label>
                                    <Input
                                        value={customUrl}
                                        onChange={(e) => setCustomUrl(e.target.value)}
                                        placeholder="https://"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.link_text}</Label>
                                    <Input
                                        value={customLinkText}
                                        onChange={(e) => setCustomLinkText(e.target.value)}
                                        placeholder="label text"
                                        className="rounded-lg"
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    onClick={handleAddCustomLink}
                                    disabled={!customUrl.trim() || !customLinkText.trim()}
                                    className="bg-primary hover:bg-primary/90 rounded-lg"
                                >
                                    {translations.add_to_menu}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mega Menus Link */}
                    <button className="text-primary hover:underline text-sm font-medium">
                        {translations.mega_menus}
                    </button>
                </div>

                {/* Right - Menu Structure */}
                <div className="lg:col-span-2 bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6">{translations.menu_structure}</h3>

                    <div className="space-y-2 min-h-[300px]">
                        {menuItems.length === 0 ? (
                            <div className="flex items-center justify-center h-64 text-muted-foreground">
                                No menu items. Add pages or custom links.
                            </div>
                        ) : (
                            menuItems.map((item) => (
                                <MenuItemComponent
                                    key={item.id}
                                    item={item}
                                    onRemove={removeMenuItem}
                                    onToggle={toggleMenuItem}
                                />
                            ))
                        )}
                    </div>

                    <div className="pt-6">
                        <Button
                            onClick={handleUpdateChanges}
                            className="bg-primary hover:bg-primary/90 rounded-lg px-8"
                        >
                            {translations.update_changes}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
