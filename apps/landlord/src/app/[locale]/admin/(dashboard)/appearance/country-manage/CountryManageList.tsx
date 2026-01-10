"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Edit, Trash2 } from "lucide-react";

interface Country {
    id: number;
    name: string;
    code: string;
    status: "publish" | "draft";
}

interface CountryManageListProps {
    translations: {
        title: string;
        all_countries: string;
        add_country: string;
        add_new_country: string;
        insert_all: string;
        add_new: string;
        bulk_action: string;
        apply: string;
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
            code: string;
            status: string;
            action: string;
        };
        status: {
            publish: string;
            draft: string;
        };
        form: {
            name: string;
            name_placeholder: string;
            code: string;
            code_placeholder: string;
            status: string;
        };
    };
}

// Mock data - sample countries
const MOCK_COUNTRIES: Country[] = [
    { id: 1, name: "Afghanistan", code: "AF", status: "publish" },
    { id: 2, name: "Albania", code: "AL", status: "publish" },
    { id: 3, name: "Algeria", code: "DZ", status: "publish" },
    { id: 4, name: "American Samoa", code: "AS", status: "publish" },
    { id: 5, name: "Andorra", code: "AD", status: "publish" },
    { id: 6, name: "Angola", code: "AO", status: "publish" },
    { id: 7, name: "Anguilla", code: "AI", status: "publish" },
    { id: 8, name: "Antarctica", code: "AQ", status: "publish" },
    { id: 9, name: "Antigua and Barbuda", code: "AG", status: "publish" },
    { id: 10, name: "Argentina", code: "AR", status: "publish" },
];

export function CountryManageList({ translations }: CountryManageListProps) {
    const [countries] = useState<Country[]>(MOCK_COUNTRIES);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCountryName, setNewCountryName] = useState("");
    const [newCountryCode, setNewCountryCode] = useState("");
    const [newCountryStatus, setNewCountryStatus] = useState<"publish" | "draft">("publish");

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalEntries = 239; // Mock total
    const startEntry = (currentPage - 1) * parseInt(entriesPerPage) + 1;
    const endEntry = Math.min(currentPage * parseInt(entriesPerPage), totalEntries);
    const totalPages = Math.ceil(totalEntries / parseInt(entriesPerPage));

    const getStatusBadge = (status: Country["status"]) => {
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

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filteredCountries.map((c) => c.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((i) => i !== id));
        }
    };

    const handleAddCountry = () => {
        if (newCountryName.trim()) {
            console.log("Adding country:", { name: newCountryName, code: newCountryCode, status: newCountryStatus });
            setNewCountryName("");
            setNewCountryCode("");
            setNewCountryStatus("publish");
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-bold text-foreground">{translations.all_countries}</h2>
                <div className="flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        className="rounded-lg bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    >
                        {translations.insert_all}
                    </Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                                {translations.add_country}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-card border-border/40">
                            <DialogHeader>
                                <DialogTitle>{translations.add_new_country}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.form.name}</Label>
                                    <Input
                                        value={newCountryName}
                                        onChange={(e) => setNewCountryName(e.target.value)}
                                        placeholder={translations.form.name_placeholder}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.form.code}</Label>
                                    <Input
                                        value={newCountryCode}
                                        onChange={(e) => setNewCountryCode(e.target.value)}
                                        placeholder={translations.form.code_placeholder}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">{translations.form.status}</Label>
                                    <Select value={newCountryStatus} onValueChange={(v: "publish" | "draft") => setNewCountryStatus(v)}>
                                        <SelectTrigger className="rounded-lg">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="publish">{translations.status.publish}</SelectItem>
                                            <SelectItem value="draft">{translations.status.draft}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    onClick={handleAddCountry}
                                    className="w-full bg-primary hover:bg-primary/90 rounded-lg"
                                >
                                    {translations.add_new}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <Select defaultValue="bulk">
                        <SelectTrigger className="w-32 rounded-lg">
                            <SelectValue placeholder={translations.bulk_action} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bulk">{translations.bulk_action}</SelectItem>
                            <SelectItem value="delete">Delete</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 rounded-lg">
                        {translations.apply}
                    </Button>
                </div>

                <div className="flex items-center gap-4">
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
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border/40 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary/10 hover:bg-primary/10">
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedIds.length === filteredCountries.length && filteredCountries.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="text-primary font-semibold">{translations.table.id}</TableHead>
                            <TableHead className="text-primary font-semibold">{translations.table.name}</TableHead>
                            <TableHead className="text-primary font-semibold">{translations.table.code}</TableHead>
                            <TableHead className="text-primary font-semibold">{translations.table.status}</TableHead>
                            <TableHead className="text-primary font-semibold">{translations.table.action}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCountries.map((country) => (
                            <TableRow key={country.id} className="hover:bg-muted/30">
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIds.includes(country.id)}
                                        onCheckedChange={(checked) => handleSelectOne(country.id, checked as boolean)}
                                    />
                                </TableCell>
                                <TableCell className="text-primary font-medium">{country.id}</TableCell>
                                <TableCell className="text-primary font-medium">{country.name}</TableCell>
                                <TableCell className="text-muted-foreground">{country.code}</TableCell>
                                <TableCell>{getStatusBadge(country.status)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="h-8 w-8 rounded-lg"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-sm text-muted-foreground">
                <p>
                    {translations.showing} {startEntry} {translations.to} {endEntry} {translations.of} {totalEntries} {translations.entries}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        {translations.previous}
                    </Button>

                    {[1, 2, 3, 4, 5].map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className={`rounded-xl h-9 min-w-[36px] ${currentPage === page
                                    ? "bg-primary hover:bg-primary/90 border-transparent text-primary-foreground"
                                    : "border-border/40 bg-card hover:bg-muted/50"
                                }`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <span className="px-2">...</span>

                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl h-9 min-w-[36px] border-border/40 bg-card hover:bg-muted/50"
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        {translations.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
