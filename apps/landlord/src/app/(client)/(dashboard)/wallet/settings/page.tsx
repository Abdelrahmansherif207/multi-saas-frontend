"use client";

import { WalletBalanceCard } from "@/components/dashboard/WalletBalanceCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wallet Settings | Wajha",
    description: "Configure your wallet preferences and alerts.",
};

// Simple Switch Component (since it was missing in the UI list, implementing locally for now)
function Switch({ checked, onCheckedChange, id }: { checked: boolean; onCheckedChange: (checked: boolean) => void; id: string }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            id={id}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-brand-orange" : "bg-input"
            )}
        >
            <span
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                    checked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    );
}

export default function WalletSettingsPage() {
    const [packageRenewal, setPackageRenewal] = useState(false);
    const [balanceAlert, setBalanceAlert] = useState(false);

    return (
        <div className="space-y-8 p-6">
            {/* Balance Card */}
            <WalletBalanceCard />

            {/* Settings Form */}
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-foreground">Wallet Settings</h3>

                <div className="space-y-6 max-w-lg">
                    {/* Package Renewal */}
                    <div className="flex flex-col space-y-3">
                        <Label htmlFor="renewal-switch" className="text-sm font-medium text-muted-foreground">
                            Enable/Disable Package Renewal
                        </Label>
                        <div className="flex items-center gap-2">
                            <Switch
                                id="renewal-switch"
                                checked={packageRenewal}
                                onCheckedChange={setPackageRenewal}
                            />
                            <span className="text-xs text-muted-foreground uppercase font-semibold">
                                {packageRenewal ? "Hide" : "Hide"}
                            </span>
                        </div>

                    </div>

                    {/* Balance Alert */}
                    <div className="flex flex-col space-y-3">
                        <Label htmlFor="alert-switch" className="text-sm font-medium text-muted-foreground">
                            Get Wallet Balance Alert
                        </Label>
                        <div className="flex items-center gap-2">
                            <Switch
                                id="alert-switch"
                                checked={balanceAlert}
                                onCheckedChange={setBalanceAlert}
                            />
                            <span className="text-xs text-muted-foreground uppercase font-semibold">
                                {balanceAlert ? "Hide" : "Hide"}
                            </span>
                        </div>
                    </div>

                    {/* Minimum Amount Input */}
                    <div className="flex flex-col space-y-3">
                        <Label htmlFor="min-amount" className="text-sm font-medium text-muted-foreground">
                            Alert For Minimum Amount ($)
                        </Label>
                        <Input
                            id="min-amount"
                            placeholder="Example 100"
                            className="w-full"
                        />
                    </div>

                    <Button className="bg-brand-orange hover:bg-brand-orange/80 text-white w-24">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
