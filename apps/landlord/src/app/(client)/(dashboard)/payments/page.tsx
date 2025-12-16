"use client";

import { Button } from "@/components/ui/button";

// Mock Data for Payment Logs
const paymentLogs = [
    {
        id: "1",
        domain: "test.localhost",
        packageName: "Premium Monthly",
        orderId: "#1",
        transactionId: "TXN-12345678",
        packagePrice: "$ 0",
        paidAmount: "$ 0",
        gateway: "Bank transfer",
        status: "Pending",
        startDate: "website not yet created",
        endDate: "09-01-2026",
    },
    {
        id: "2",
        domain: "store.example.com",
        packageName: "Business Yearly",
        orderId: "#2",
        transactionId: "TXN-87654321",
        packagePrice: "$ 199",
        paidAmount: "$ 199",
        gateway: "Stripe",
        status: "Completed",
        startDate: "01-01-2024",
        endDate: "01-01-2025",
    },
];

import { DepositModal } from "@/components/dashboard/DepositModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Logs | Wajha",
    description: "View your payment history and logs.",
};

export default function PaymentLogsPage() {
    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold">Payment Logs</h1>
                <DepositModal>
                    <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                        Deposit To Your Wallet
                    </Button>
                </DepositModal>
            </div>

            {/* Header Row (Hidden on mobile, visible on desktop for table-like feel) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 font-semibold text-sm text-muted-foreground border-b">
                <div className="col-span-8">Package Order Info</div>
                <div className="col-span-2">Payment Status</div>
                <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Logs List */}
            <div className="space-y-4">
                {paymentLogs.map((log) => (
                    <div
                        key={log.id}
                        className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-6"
                    >
                        {/* Column 1: Order Info */}
                        <div className="md:col-span-8 space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">
                                    Domain : <span className="text-blue-600 dark:text-blue-400">{log.domain}</span>
                                </h3>
                                <p className="text-muted-foreground">{log.packageName}</p>
                            </div>

                            <div className="text-sm space-y-1 text-card-foreground/80">
                                <p><span className="font-semibold">Order ID :</span> {log.orderId}</p>
                                <p><span className="font-semibold">Transaction ID :</span> {log.transactionId || "-"}</p>
                                <p><span className="font-semibold">Package Price :</span> {log.packagePrice}</p>
                                <p><span className="font-semibold">Paid Amount :</span> {log.paidAmount}</p>
                                <p><span className="font-semibold">Payment Gateway :</span> {log.gateway}</p>
                                <p>
                                    <span className="font-semibold">Order Status :</span>{" "}
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${log.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                        }`}>
                                        {log.status}
                                    </span>
                                </p>
                                <p><span className="font-semibold">Start Date :</span> {log.startDate}</p>
                                <p><span className="font-semibold">{log.startDate === "website not yet created" ? "website not yet created" : "End Date"}</span> {log.endDate}</p>
                            </div>

                            <Button className="bg-brand-orange hover:bg-brand-orange/80 text-white h-auto py-2 px-4 text-xs font-medium uppercase tracking-wide">
                                View All Payment Details
                            </Button>
                        </div>

                        {/* Column 2: Status & Pay Now */}
                        <div className="md:col-span-2 flex flex-col items-start gap-2">
                            <div className="flex items-center gap-2">
                                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 px-3 py-1 rounded-md text-sm font-medium">
                                    {log.status}
                                </span>
                                {log.status === "Pending" && (
                                    <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white h-7 text-xs">
                                        Pay Now
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Column 3: Action (Empty for now but reserved) */}
                        <div className="md:col-span-2 flex justify-end">
                            {/* Placeholder for future actions */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
