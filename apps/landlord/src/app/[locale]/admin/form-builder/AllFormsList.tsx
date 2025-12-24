"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "@/i18n/routing";

// Mock data for demonstration
const mockForms = [
    { id: 1, title: "", buttonText: "" },
    { id: 2, title: "", buttonText: "" },
];

interface AllFormsListProps {
    translations: {
        title: string;
        bulk_action: string;
        apply: string;
        show: string;
        entries: string;
        search: string;
        new_form: string;
        table: {
            id: string;
            title: string;
            button_text: string;
            action: string;
        };
        no_data: string;
        form_title: string;
        receiving_email: string;
        email_hint: string;
        button_title: string;
        success_message: string;
        save_changes: string;
        close: string;
    };
}

export function AllFormsList({ translations }: AllFormsListProps) {
    return (
        <div className="space-y-6">
            {/* Header Actions */}
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 rounded-xl h-10 font-semibold">
                                {translations.new_form}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-2xl border-border/40 bg-card backdrop-blur-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">{translations.new_form}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-5 py-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.form_title}
                                    </Label>
                                    <Input
                                        placeholder="Enter Title"
                                        className="h-11 rounded-xl bg-background/50 border-border/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.receiving_email}
                                    </Label>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        className="h-11 rounded-xl bg-background/50 border-border/40"
                                    />
                                    <p className="text-xs text-muted-foreground">{translations.email_hint}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.button_title}
                                    </Label>
                                    <Input
                                        placeholder="Enter Button Title"
                                        className="h-11 rounded-xl bg-background/50 border-border/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-foreground">
                                        {translations.success_message}
                                    </Label>
                                    <Textarea
                                        placeholder="form submit success message"
                                        className="min-h-[80px] rounded-xl bg-background/50 border-border/40 resize-none"
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <DialogClose asChild>
                                        <Button variant="outline" className="rounded-xl px-6 h-11 font-semibold">
                                            {translations.close}
                                        </Button>
                                    </DialogClose>
                                    <Button className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-11 font-semibold">
                                        {translations.save_changes}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Show entries and Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{translations.show}</span>
                    <Select defaultValue="10">
                        <SelectTrigger className="w-[70px] h-9 rounded-lg bg-background/50 border-border/40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-border/40">
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span>{translations.entries}</span>
                </div>
                <div className="relative">
                    <span className="text-sm text-muted-foreground mr-2">{translations.search}</span>
                    <input
                        type="text"
                        className="h-9 pl-3 pr-3 rounded-lg bg-background/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-[180px] transition-all text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                            <TableHead className="w-[50px]">
                                <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            </TableHead>
                            <TableHead className="font-semibold text-foreground">{translations.table.id}</TableHead>
                            <TableHead className="font-semibold text-foreground">{translations.table.title}</TableHead>
                            <TableHead className="font-semibold text-foreground">{translations.table.button_text}</TableHead>
                            <TableHead className="font-semibold text-foreground text-right">{translations.table.action}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockForms.map((form) => (
                            <TableRow key={form.id} className="hover:bg-muted/30 transition-colors">
                                <TableCell>
                                    <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                </TableCell>
                                <TableCell className="text-primary font-medium">{form.id}</TableCell>
                                <TableCell>{form.title}</TableCell>
                                <TableCell>{form.buttonText}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="destructive" size="icon" className="rounded-lg h-8 w-8">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Link href={`/admin/form-builder/${form.id}`}>
                                            <Button size="icon" className="rounded-lg h-8 w-8 bg-primary hover:bg-primary/90">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
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
                    <Button size="sm" className="rounded-xl h-9 bg-primary hover:bg-primary/90 min-w-[36px]">
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
