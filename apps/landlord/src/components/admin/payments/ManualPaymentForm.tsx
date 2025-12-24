"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus } from "lucide-react";
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

interface ManualPayment {
    id: number;
    name: string;
    instructions: string;
    status: "publish" | "draft";
}

const MOCK_METHODS: ManualPayment[] = [
    { id: 1, name: "Bank Transfer", instructions: "Please transfer the total amount to our bank account. Bank: XYZ, Account No: 123456789", status: "publish" },
    { id: 2, name: "Cash on Delivery", instructions: "Pay with cash upon delivery.", status: "draft" },
];

import { useTranslations } from "next-intl";

export function ManualPaymentForm() {
    const t = useTranslations("Admin.PaymentManage.form");
    const tm = useTranslations("Admin.PaymentManage.form.manual");
    const [methods, setMethods] = useState<ManualPayment[]>(MOCK_METHODS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [newName, setNewName] = useState("");
    const [newInstructions, setNewInstructions] = useState("");
    const [newStatus, setNewStatus] = useState<"publish" | "draft">("publish");

    const handleAddMethod = () => {
        if (!newName) return;
        const newMethod: ManualPayment = {
            id: methods.length + 1,
            name: newName,
            instructions: newInstructions,
            status: newStatus,
        };
        setMethods([...methods, newMethod]);
        setIsModalOpen(false);
        setNewName("");
        setNewInstructions("");
        setNewStatus("publish");
    };

    const getStatusBadge = (status: ManualPayment["status"]) => {
        const color = status === "publish"
            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
            : "bg-gray-100 text-gray-700 border-gray-200";
        return (
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${color}`}>
                {status === "publish" ? t("publish") : t("draft")}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-brand-orange/10 border-l-4 border-brand-orange px-4 py-3 rounded-r-lg">
                <p className="text-sm text-foreground/80">
                    {tm("info_banner")}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{tm("methods_title")}</h2>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 rounded-lg gap-2 text-xs h-8">
                            <Plus className="h-4 w-4" />
                            {tm("add_new_method")}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-border/40 backdrop-blur-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">{tm("modal_title")}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">{tm("field_name")}</label>
                                <Input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="e.g. Bank Transfer"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">{tm("field_instructions")}</label>
                                <Textarea
                                    value={newInstructions}
                                    onChange={(e) => setNewInstructions(e.target.value)}
                                    placeholder={tm("field_instructions_placeholder")}
                                    className="rounded-lg min-h-[100px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">{tm("field_status")}</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value as "publish" | "draft")}
                                    className="w-full flex h-10 rounded-lg border border-border/40 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="publish">{t("publish")}</option>
                                    <option value="draft">{t("draft")}</option>
                                </select>
                            </div>
                            <Button
                                onClick={handleAddMethod}
                                className="w-full bg-primary hover:bg-primary/90 rounded-lg"
                            >
                                {tm("button_add")}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border border-border/40 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary/10 hover:bg-primary/10">
                            <TableHead className="text-primary font-semibold">{tm("table_id")}</TableHead>
                            <TableHead className="text-primary font-semibold">{tm("table_name")}</TableHead>
                            <TableHead className="text-primary font-semibold">{tm("table_status")}</TableHead>
                            <TableHead className="text-primary font-semibold text-right">{tm("table_action")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {methods.map((method) => (
                            <TableRow key={method.id} className="hover:bg-muted/30">
                                <TableCell className="text-primary font-medium">{method.id}</TableCell>
                                <TableCell className="text-primary font-medium">{method.name}</TableCell>
                                <TableCell>{getStatusBadge(method.status)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-lg text-primary hover:bg-primary/10"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {methods.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    {tm("no_methods")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Button className="mt-4">{t("update_changes")}</Button>
        </div>
    );
}
