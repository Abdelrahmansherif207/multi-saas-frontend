'use client';

import { useState, useTransition } from 'react';
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

interface DeletePricePlanButtonProps {
    id: number;
    deleteAction: (id: number) => Promise<{ success: boolean; message: string }>;
}

export function DeletePricePlanButton({ id, deleteAction }: DeletePricePlanButtonProps) {
    const t = useTranslations("Admin.PricePlanManage.NewPlan.dialog.delete");
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        startTransition(async () => {
            const res = await deleteAction(id);
            if (res.success) {
                setOpen(false);
                router.refresh();
            } else {
                alert(res.message);
            }
        });
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
                    <DialogTitle className="text-center text-xl">{t("title")}</DialogTitle>
                    <DialogDescription className="text-center">
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row gap-3 justify-center sm:justify-center">
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="bg-red-500 hover:bg-red-600 px-8"
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t("confirm")}
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                        className="bg-muted text-foreground hover:bg-muted/80 px-8"
                    >
                        {t("cancel")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
