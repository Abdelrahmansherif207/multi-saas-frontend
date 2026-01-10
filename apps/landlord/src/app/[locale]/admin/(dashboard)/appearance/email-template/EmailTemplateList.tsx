"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface EmailTemplate {
    id: number;
    title: string;
}

interface EmailTemplateListProps {
    translations: {
        title: string;
        subtitle: string;
        show: string;
        entries: string;
        search: string;
        search_placeholder: string;
        showing: string;
        to: string;
        of: string;
        previous: string;
        next: string;
        table: {
            sl: string;
            title: string;
            action: string;
        };
    };
}

const MOCK_TEMPLATES: EmailTemplate[] = [
    { id: 1, title: "Verify Mail to Admin" },
    { id: 2, title: "Verify Mail to User" },
    { id: 3, title: "Reset Password Mail to Admin" },
    { id: 4, title: "Reset password Mail to User" },
    { id: 5, title: "Subscription Order Mail to Admin" },
    { id: 6, title: "Subscription Order Mail to User" },
    { id: 7, title: "Subscription Credential Mail to User (Without Trial)" },
    { id: 8, title: "Subscription Trial with Credential Mail to User" },
    { id: 9, title: "Subscription Manual Payment Approved Mail to User" },
];

export function EmailTemplateList({ translations }: EmailTemplateListProps) {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState("10");

    const filteredTemplates = MOCK_TEMPLATES.filter((tpl) =>
        tpl.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-2">{translations.title}</h2>
            <p className="text-sm text-primary mb-6">{translations.subtitle}</p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{translations.show}</span>
                    <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                        <SelectTrigger className="w-16 rounded-lg bg-background/50 border-border/40">
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
                        placeholder={translations.search_placeholder}
                        className="w-48 rounded-lg bg-background/50 border-border/40"
                    />
                </div>
            </div>

            <div className="rounded-xl border border-border/40 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary/90 hover:bg-primary/90 text-primary-foreground">
                            <TableHead className="w-16 text-primary-foreground font-semibold">{translations.table.sl}</TableHead>
                            <TableHead className="text-primary-foreground font-semibold">{translations.table.title}</TableHead>
                            <TableHead className="w-24 text-primary-foreground font-semibold">{translations.table.action}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTemplates.map((tpl, index) => (
                            <TableRow key={tpl.id} className="hover:bg-muted/30 even:bg-muted/10">
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{tpl.title}</TableCell>
                                <TableCell>
                                    <Link href={`${pathname}/${tpl.id}`}>
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-sm text-muted-foreground">
                <p>
                    {translations.showing} 1 {translations.to} {filteredTemplates.length} {translations.of} {filteredTemplates.length} {translations.entries}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-border/40 bg-card hover:bg-muted/50"
                        disabled
                    >
                        {translations.previous}
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        1
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-border/40 bg-card hover:bg-muted/50"
                        disabled
                    >
                        {translations.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
