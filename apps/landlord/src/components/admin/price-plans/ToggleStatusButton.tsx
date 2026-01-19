'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleStatusButtonProps {
    id: number;
    status: string;
    toggleAction: (id: number) => Promise<{ success: boolean; message: string }>;
}

export function ToggleStatusButton({ id, status, toggleAction }: ToggleStatusButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const isActive = status === 'Publish' || status === 'active';

    const handleToggle = () => {
        startTransition(async () => {
            await toggleAction(id);
            router.refresh();
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className="focus:outline-none"
        >
            <Badge
                variant="outline"
                className={cn(
                    "cursor-pointer transition-colors duration-300",
                    isActive
                        ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20"
                        : "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20",
                    isPending && "opacity-50 cursor-not-allowed"
                )}
            >
                {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : (isActive ? "Active" : "Inactive")}
            </Badge>
        </button>
    );
}
