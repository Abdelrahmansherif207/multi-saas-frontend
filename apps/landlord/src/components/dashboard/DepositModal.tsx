"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";

const gateways = [
    "PayPal", "Paytm", "Stripe",
    "Razorpay", "Paystack", "Mollie",
    "Midtrans", "Cashfree", "Instamojo",
    "Mercado Pago", "Zitopay", "Square",
    "CinetPay", "PayTabs", "Billplz",
    "Flutterwave", "PayFast", "ToyyibPay",
    "Pagali", "Authorize.Net", "SitesWay",
    "Bank Transfer", "Manual"
];

interface DepositModalProps {
    children: React.ReactNode;
}

export function DepositModal({ children }: DepositModalProps) {
    const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-primary">
                        You can deposit to your wallet from the available payment gateway.
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Select a payment gateway and enter amount to deposit.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Deposit Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="amount" className="text-base text-muted-foreground">Deposit Amount <span className="text-red-500">*</span></Label>
                        <Input id="amount" placeholder="Enter Deposit Amount" className="h-12 text-lg" />
                    </div>

                    {/* Gateways Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gateways.map((gateway) => (
                            <button
                                key={gateway}
                                onClick={() => setSelectedGateway(gateway)}
                                className={cn(
                                    "flex items-center justify-center p-4 h-16 border rounded-lg hover:border-brand-orange hover:shadow-md transition-all",
                                    selectedGateway === gateway ? "border-brand-orange bg-brand-orange/5 ring-1 ring-brand-orange" : "border-border bg-card"
                                )}
                            >
                                <span className={cn("font-medium", selectedGateway === gateway ? "text-brand-orange" : "text-foreground")}>
                                    {gateway}
                                </span>
                                {/* Checkmark for selected */}
                                {selectedGateway === gateway && (
                                    <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-orange" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="secondary" className="bg-primary hover:bg-primary/90 text-white">
                            Close
                        </Button>
                    </DialogClose>
                    <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white min-w-[140px]">
                        Submit Deposit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
