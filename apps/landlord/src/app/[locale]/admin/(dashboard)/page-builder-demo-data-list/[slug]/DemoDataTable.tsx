"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { RichTextEditor } from "@/components/admin/shared/RichTextEditor";

interface DemoDataItem {
    id: number;
    title: string;
    description: string;
    headingTitle?: string;
    buttonText?: string;
    buttonRightText?: string;
}

const initialData: DemoDataItem[] = [
    {
        id: 1,
        title: "Package Name",
        description: "Description",
        headingTitle: "",
        buttonText: "",
        buttonRightText: "",
    },
];

export function DemoDataTable() {
    const [data] = useState<DemoDataItem[]>(initialData);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<DemoDataItem | null>(null);
    const [formData, setFormData] = useState({
        headingTitle: "",
        buttonText: "",
        buttonRightText: "",
        description: "",
    });

    const handleEditClick = (item: DemoDataItem) => {
        setEditingItem(item);
        setFormData({
            headingTitle: item.headingTitle || "",
            buttonText: item.buttonText || "",
            buttonRightText: item.buttonRightText || "",
            description: item.description || "",
        });
        setIsEditModalOpen(true);
    };

    const handleSaveChanges = () => {
        // TODO: Implement save logic - API call to update the item
        console.log("Saving changes:", { id: editingItem?.id, ...formData });
        setIsEditModalOpen(false);
        setEditingItem(null);
    };

    return (
        <>
            <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="p-8">
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="w-[50px]">
                                    <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                </TableHead>
                                <TableHead className="font-semibold text-foreground">ID</TableHead>
                                <TableHead className="font-semibold text-foreground">Title</TableHead>
                                <TableHead className="font-semibold text-foreground">Description</TableHead>
                                <TableHead className="font-semibold text-foreground">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[50px]">
                                        <Checkbox className="rounded-md border-border/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                    </TableCell>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl h-9 w-9 bg-card hover:bg-muted/50"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Edit Demo Widget Data Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Edit Demo Widget Data
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-5 py-4">
                        {/* Heading Title */}
                        <div className="space-y-2">
                            <Label htmlFor="headingTitle" className="text-sm font-medium">
                                Heading Title
                            </Label>
                            <Input
                                id="headingTitle"
                                value={formData.headingTitle}
                                onChange={(e) => setFormData({ ...formData, headingTitle: e.target.value })}
                                className="h-11 rounded-xl bg-card border-border/40"
                                placeholder="Enter heading title"
                            />
                        </div>

                        {/* Button Text */}
                        <div className="space-y-2">
                            <Label htmlFor="buttonText" className="text-sm font-medium">
                                Button Text
                            </Label>
                            <Input
                                id="buttonText"
                                value={formData.buttonText}
                                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                className="h-11 rounded-xl bg-card border-border/40"
                                placeholder="Enter button text"
                            />
                        </div>

                        {/* Button Right Text */}
                        <div className="space-y-2">
                            <Label htmlFor="buttonRightText" className="text-sm font-medium">
                                Button Right Text
                            </Label>
                            <Input
                                id="buttonRightText"
                                value={formData.buttonRightText}
                                onChange={(e) => setFormData({ ...formData, buttonRightText: e.target.value })}
                                className="h-11 rounded-xl bg-card border-border/40"
                                placeholder="Enter button right text"
                            />
                        </div>

                        {/* Description with Rich Text Editor */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Description
                            </Label>
                            <RichTextEditor
                                content={formData.description}
                                onChange={(content) => setFormData({ ...formData, description: content })}
                                placeholder="Enter description..."
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="rounded-xl border-border/40"
                            >
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={handleSaveChanges}
                            className="rounded-xl bg-primary hover:bg-primary/90"
                        >
                            Save Change
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
