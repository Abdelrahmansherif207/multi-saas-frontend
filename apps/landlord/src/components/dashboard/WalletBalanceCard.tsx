"use client";

import { cn } from "@/lib/utils";

interface WalletBalanceCardProps {
    className?: string;
    balance?: string;
}

export function WalletBalanceCard({ className, balance = "$0.00" }: WalletBalanceCardProps) {
    return (
        <div className={cn("bg-primary text-primary-foreground rounded-xl p-8 shadow-lg flex items-center justify-between", className)}>
            <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground border-2 border-primary-foreground/20">
                    <span className="text-2xl font-light">$</span>
                </div>
                <div>
                    <h2 className="text-4xl font-bold">{balance}</h2>
                    <p className="text-primary-foreground/70 text-lg">Wallet Balance</p>
                </div>
            </div>
        </div>
    );
}
