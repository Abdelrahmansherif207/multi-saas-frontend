"use client";

import * as React from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Option = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select items...",
    className,
}: MultiSelectProps) {
    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const handleRemove = (value: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(selected.filter((item) => item !== value));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-full justify-between h-auto min-h-10 px-3 py-2 hover:bg-transparent",
                        className
                    )}
                >
                    <div className="flex flex-wrap gap-1 items-center">
                        {selected.length > 0 ? (
                            selected.map((value) => {
                                const option = options.find((o) => o.value === value);
                                return (
                                    <Badge
                                        key={value}
                                        variant="secondary"
                                        className="mr-1 mb-1 p-0 rounded-md font-normal flex items-center overflow-hidden"
                                    >
                                        <div
                                            className="px-2 py-1.5 hover:bg-destructive/10 hover:text-destructive cursor-pointer h-full flex items-center justify-center border-r border-border/50 transition-colors"
                                            onClick={(e) => handleRemove(value, e)}
                                            title="Remove"
                                        >
                                            <X className="h-4 w-4" />
                                        </div>
                                        <span className="px-2 py-1">
                                            {option?.label || value}
                                        </span>
                                    </Badge>
                                );
                            })
                        ) : (
                            <span className="text-muted-foreground font-normal">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] p-0">
                {options.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                        checked={selected.includes(option.value)}
                        onCheckedChange={() => handleSelect(option.value)}
                    >
                        {option.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
