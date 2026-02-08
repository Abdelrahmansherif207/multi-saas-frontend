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
import { Trash2, AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import axios from "axios";

interface DeleteUserButtonProps {
    userId: number;
    userName: string;
}

export function DeleteUserButton({ userId, userName }: DeleteUserButtonProps) {
    const t = useTranslations("Admin.UserManage.AllUsers.dialog.delete");
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`/api/admin/users/${userId}`);

            if (response.data.success) {
                setOpen(false);
                router.refresh();
            } else {
                alert(response.data.message || "Failed to delete user");
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "An error occurred while deleting the user");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="destructive" className="h-7 px-2">
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <DialogTitle className="text-center text-xl">
                        {t("title", { name: userName })}
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
