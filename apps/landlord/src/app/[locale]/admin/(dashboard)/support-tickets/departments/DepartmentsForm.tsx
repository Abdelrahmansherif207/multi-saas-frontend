"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DepartmentsFormProps {
    translations: {
        bulk_action: string;
        apply: string;
        search: string;
        add_new: string;
        table: {
            id: string;
            title: string;
            status: string;
            action: string;
        }
    }
}

export function DepartmentsForm({ translations }: DepartmentsFormProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

    const tabs = [
        { id: "en", label: "English (UK)" },
        { id: "ar", label: "العربية" },
    ];

    return (
        <div className="space-y-6">
            {/* Header Actions and Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                    <Select defaultValue="bulk">
                        <SelectTrigger className="w-[180px] h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary">
                            <SelectValue placeholder={translations.bulk_action} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/40">
                            <SelectItem value="bulk">{translations.bulk_action}</SelectItem>
                            <SelectItem value="delete">Delete</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-10 font-semibold transition-all duration-300">
                        {translations.apply}
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={translations.search}
                            className="h-10 pl-4 pr-10 rounded-xl bg-background/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-[250px] transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 rounded-xl h-10 font-semibold flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                {translations.add_new}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[450px] rounded-2xl border-border/40 bg-card backdrop-blur-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">New Ticket Department</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Name"
                                        className="rounded-xl bg-background/50 border-border/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select defaultValue="publish">
                                        <SelectTrigger className="rounded-xl bg-background/50 border-border/40">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/40">
                                            <SelectItem value="publish">Publish</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <DialogClose asChild>
                                        <Button variant="outline" className="rounded-xl px-6 h-11 font-semibold">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-11 font-semibold">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Tabs and Table container */}
            <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 px-6 pt-4 border-b border-border/40">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as "en" | "ar")}
                            className={cn(
                                "px-4 py-2 text-xs font-bold transition-all relative",
                                activeTab === tab.id
                                    ? "text-brand-orange"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
                            )}
                        </button>
                    ))}
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                            <TableHead className="w-[50px]">
                                <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            </TableHead>
                            <TableHead className="font-semibold text-foreground">{translations.table.id}</TableHead>
                            <TableHead className="font-semibold text-foreground">{translations.table.title}</TableHead>
                            <TableHead className="font-semibold text-foreground">{translations.table.status}</TableHead>
                            <TableHead className="font-semibold text-foreground text-right">{translations.table.action}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Mock Data */}
                        <TableRow className="hover:bg-muted/20 border-b-border/40">
                            <TableCell>
                                <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            </TableCell>
                            <TableCell>1</TableCell>
                            <TableCell className="font-medium">
                                {activeTab === "en" ? "Login Issue" : "مشكلة في تسجيل الدخول"}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-lg px-3 py-1 text-[11px] font-bold">
                                    PUBLISH
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-primary hover:text-primary hover:bg-primary/10">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/20 border-b-border/40">
                            <TableCell>
                                <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            </TableCell>
                            <TableCell>2</TableCell>
                            <TableCell className="font-medium">
                                {activeTab === "en" ? "License Issue" : "مشكلة في الترخيص"}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-lg px-3 py-1 text-[11px] font-bold">
                                    PUBLISH
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-primary hover:text-primary hover:bg-primary/10">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-sm text-muted-foreground">
                <p>Showing 1 to 2 of 2 entries</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50" disabled>
                        Previous
                    </Button>
                    <Button variant="default" size="sm" className="rounded-xl h-9 w-9 bg-primary hover:bg-primary/90">
                        1
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl h-9 border-border/40 bg-card hover:bg-muted/50" disabled>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
