"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Copy, Trash2, Plus } from "lucide-react";

interface Language {
    id: number;
    name: string;
    direction: "LTR" | "RTL";
    slug: string;
    status: "publish" | "draft";
    isDefault: boolean;
}

interface LanguageListProps {
    translations: {
        title: string;
        info_message: string;
        add_language: string;
        add_new: string;
        show: string;
        entries: string;
        search: string;
        showing: string;
        to: string;
        of: string;
        previous: string;
        next: string;
        table: {
            id: string;
            name: string;
            direction: string;
            slug: string;
            status: string;
            default: string;
            action: string;
        };
        status: {
            publish: string;
            draft: string;
        };
        direction: {
            ltr: string;
            rtl: string;
        };
        actions: {
            edit_all_words: string;
            edit: string;
            clone: string;
            delete: string;
            make_default: string;
        };
        form: {
            language: string;
            language_placeholder: string;
            direction: string;
            status: string;
            slug: string;
            slug_placeholder: string;
        };
    };
}

const MOCK_LANGUAGES: Language[] = [
    { id: 1, name: "English (UK)", direction: "LTR", slug: "en_GB", status: "publish", isDefault: true },
    { id: 3, name: "العربية", direction: "RTL", slug: "ar", status: "publish", isDefault: false },
];

const AVAILABLE_LANGUAGES = [
    "Afrikaans", "Albanian", "Arabic", "Armenian", "Basque", "Bengali", "Bulgarian",
    "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "English (UK)",
    "English (US)", "Estonian", "Finnish", "French", "Galician", "Georgian", "German",
    "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian",
    "Irish", "Italian", "Japanese", "Javanese", "Kannada", "Korean", "Latin", "Latvian",
    "Lithuanian", "Macedonian", "Malay", "Malayalam", "Maltese", "Marathi", "Nepali",
    "Norwegian", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian",
    "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", "Tamil", "Telugu",
    "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh"
];

export function LanguageList({ translations }: LanguageListProps) {
    const [languages, setLanguages] = useState<Language[]>(MOCK_LANGUAGES);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState("10");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [newLanguage, setNewLanguage] = useState("");
    const [newDirection, setNewDirection] = useState<"LTR" | "RTL">("LTR");
    const [newStatus, setNewStatus] = useState<"publish" | "draft">("publish");
    const [newSlug, setNewSlug] = useState("");

    const filteredLanguages = languages.filter((lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddLanguage = () => {
        if (!newLanguage || !newSlug) return;

        const newLang: Language = {
            id: languages.length + 1,
            name: newLanguage,
            direction: newDirection,
            slug: newSlug,
            status: newStatus,
            isDefault: false,
        };

        setLanguages([...languages, newLang]);
        setIsModalOpen(false);
        setNewLanguage("");
        setNewDirection("LTR");
        setNewStatus("publish");
        setNewSlug("");
    };

    const getStatusBadge = (status: Language["status"]) => {
        const label = status === "publish" ? translations.status.publish : translations.status.draft;
        const color = status === "publish"
            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
            : "bg-gray-100 text-gray-700 border-gray-200";
        return (
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${color}`}>
                {label}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-brand-orange/10 border-l-4 border-brand-orange px-4 py-3 rounded-r-lg">
                <p className="text-sm text-foreground/80">
                    {translations.info_message}
                </p>
            </div>

            <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold">{translations.title}</h2>

                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 rounded-lg gap-2">
                                <Plus className="h-4 w-4" />
                                {translations.add_language}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-card border-border/40">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">{translations.add_language}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.form.language}</Label>
                                    <Select value={newLanguage} onValueChange={setNewLanguage}>
                                        <SelectTrigger className="rounded-lg">
                                            <SelectValue placeholder={translations.form.language_placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {AVAILABLE_LANGUAGES.map((lang) => (
                                                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.form.direction}</Label>
                                    <Select value={newDirection} onValueChange={(v) => setNewDirection(v as "LTR" | "RTL")}>
                                        <SelectTrigger className="rounded-lg">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LTR">{translations.direction.ltr}</SelectItem>
                                            <SelectItem value="RTL">{translations.direction.rtl}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.form.status}</Label>
                                    <Select value={newStatus} onValueChange={(v) => setNewStatus(v as "publish" | "draft")}>
                                        <SelectTrigger className="rounded-lg">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="publish">{translations.status.publish}</SelectItem>
                                            <SelectItem value="draft">{translations.status.draft}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.form.slug}</Label>
                                    <Input
                                        value={newSlug}
                                        onChange={(e) => setNewSlug(e.target.value)}
                                        placeholder={translations.form.slug_placeholder}
                                        className="rounded-lg"
                                    />
                                </div>

                                <Button
                                    onClick={handleAddLanguage}
                                    className="w-full bg-primary hover:bg-primary/90 rounded-lg"
                                >
                                    {translations.add_new}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{translations.show}</span>
                        <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                            <SelectTrigger className="w-16 rounded-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">{translations.entries}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{translations.search}</span>
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-40 rounded-lg"
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-border/40 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary/10 hover:bg-primary/10">
                                <TableHead className="text-primary font-semibold">{translations.table.id}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.name}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.direction}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.slug}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.status}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.default}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.action}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLanguages.map((lang) => (
                                <TableRow key={lang.id} className="hover:bg-muted/30">
                                    <TableCell className="text-primary font-medium">{lang.id}</TableCell>
                                    <TableCell className="text-primary font-medium">{lang.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{lang.direction}</TableCell>
                                    <TableCell className="text-muted-foreground">{lang.slug}</TableCell>
                                    <TableCell>{getStatusBadge(lang.status)}</TableCell>
                                    <TableCell>
                                        {lang.isDefault ? (
                                            <span className="px-3 py-1 text-xs font-medium rounded-full border bg-primary/10 text-primary border-primary/20">
                                                Default
                                            </span>
                                        ) : (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-xs rounded-lg border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-300"
                                            >
                                                {translations.actions.make_default}
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {!lang.isDefault && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {/* <Button
                                                size="sm"
                                                className="h-8 bg-primary hover:bg-primary/90 rounded-lg text-xs"
                                            >
                                                {translations.actions.edit_all_words}
                                            </Button> */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-lg"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-lg"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-sm text-muted-foreground">
                    <p>
                        {translations.showing} 1 {translations.to} {filteredLanguages.length} {translations.of} {filteredLanguages.length} {translations.entries}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50"
                            disabled
                        >
                            {translations.previous}
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="rounded-xl h-9 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            1
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50"
                            disabled
                        >
                            {translations.next}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
