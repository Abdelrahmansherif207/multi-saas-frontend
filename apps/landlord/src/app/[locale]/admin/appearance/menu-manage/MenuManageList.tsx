"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";

interface Menu {
    id: number;
    title: string;
    status: "default" | "active" | "inactive";
    createdAt: string;
}

interface MenuManageListProps {
    translations: {
        title: string;
        all_menus: string;
        add_new_menu: string;
        create_menu: string;
        table: {
            id: string;
            title: string;
            status: string;
            created_at: string;
            action: string;
        };
        status: {
            default: string;
            active: string;
            inactive: string;
        };
    };
    locale: string;
}

// Mock data
const MOCK_MENUS: Menu[] = [
    { id: 1, title: "Primary menu", status: "default", createdAt: "05-Jul-2022" },
    { id: 2, title: "Footer menu", status: "active", createdAt: "10-Aug-2022" },
];

export function MenuManageList({ translations, locale }: MenuManageListProps) {
    const router = useRouter();
    const [menus] = useState<Menu[]>(MOCK_MENUS);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newMenuTitle, setNewMenuTitle] = useState("");

    const getStatusBadge = (status: Menu["status"]) => {
        const statusLabels = {
            default: translations.status.default,
            active: translations.status.active,
            inactive: translations.status.inactive,
        };
        const statusColors = {
            default: "bg-emerald-100 text-emerald-700 border-emerald-200",
            active: "bg-blue-100 text-blue-700 border-blue-200",
            inactive: "bg-gray-100 text-gray-700 border-gray-200",
        };
        return (
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
                {statusLabels[status]}
            </span>
        );
    };

    const handleCreateMenu = () => {
        if (newMenuTitle.trim()) {
            // API call would go here
            console.log("Creating menu:", newMenuTitle);
            setNewMenuTitle("");
            setIsDialogOpen(false);
        }
    };

    const handleEditMenu = (id: number) => {
        router.push(`/${locale}/admin/appearance/menu-manage/${id}`);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Menu Table */}
            <div className="lg:col-span-2 bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-6">{translations.all_menus}</h2>

                <div className="rounded-xl border border-border/40 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary/10 hover:bg-primary/10">
                                <TableHead className="text-primary font-semibold">{translations.table.id}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.title}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.status}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.created_at}</TableHead>
                                <TableHead className="text-primary font-semibold">{translations.table.action}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {menus.map((menu) => (
                                <TableRow key={menu.id} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{menu.id}</TableCell>
                                    <TableCell className="text-primary font-medium">{menu.title}</TableCell>
                                    <TableCell>{getStatusBadge(menu.status)}</TableCell>
                                    <TableCell className="text-muted-foreground">{menu.createdAt}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            className="h-8 w-8 bg-primary hover:bg-primary/90 rounded-lg"
                                            onClick={() => handleEditMenu(menu.id)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Right - Add New Menu */}
            <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-sm h-fit">
                <h2 className="text-lg font-bold text-foreground mb-6">{translations.add_new_menu}</h2>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90 rounded-lg">
                            {translations.add_new_menu}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-border/40">
                        <DialogHeader>
                            <DialogTitle>{translations.add_new_menu}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">{translations.table.title}</Label>
                                <Input
                                    value={newMenuTitle}
                                    onChange={(e) => setNewMenuTitle(e.target.value)}
                                    placeholder={translations.table.title}
                                    className="rounded-lg"
                                />
                            </div>
                            <Button
                                onClick={handleCreateMenu}
                                className="w-full bg-primary hover:bg-primary/90 rounded-lg"
                            >
                                {translations.create_menu}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
