'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import axios from "axios";

interface DeleteAdminButtonProps {
    adminId: number;
    adminName: string;
}

export function DeleteAdminButton({ adminId, adminName }: DeleteAdminButtonProps) {
    const t = useTranslations("Admin.RoleManage.AllAdmins.dialog.delete");
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`/api/admin/admins/${adminId}`);

            if (response.data.success) {
                setOpen(false);
                router.refresh();
            } else {
                alert(response.data.message || "Failed to delete admin");
            }
        } catch (error: any) {
            console.error("Failed to delete admin:", error);
            alert(error.response?.data?.message || "An error occurred while deleting the admin");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" className="h-8 w-8 bg-destructive hover:bg-destructive/90 text-white rounded-md">
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <DialogTitle className="text-center text-xl">
                        {t("title", { name: adminName })}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row gap-3 justify-center sm:justify-center">
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600 px-8"
                    >
                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t("confirm")}
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => setOpen(false)}
                        disabled={isDeleting}
                        className="bg-blue-500 hover:bg-blue-600 px-8"
                    >
                        {t("cancel")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
