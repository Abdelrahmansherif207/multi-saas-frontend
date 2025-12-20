"use client";

import { useTranslations } from "next-intl";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Mock Data
const orders = [
    {
        id: 1,
        orderId: "7",
        userName: "abdelrahman",
        packageName: "Premium Monthly",
        price: 0,
        createdAt: "1 week ago",
    },
    // Adding a few more for visual completeness
    {
        id: 2,
        orderId: "8",
        userName: "sarah_j",
        packageName: "Basic Yearly",
        price: 120,
        createdAt: "3 days ago",
    },
    {
        id: 3,
        orderId: "9",
        userName: "mike_t",
        packageName: "Standard Monthly",
        price: 29,
        createdAt: "5 hours ago",
    },
];

export function DashboardRecentOrders() {
    const t = useTranslations("Admin.Dashboard.recent_orders");

    return (
        <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border/40">
                <h3 className="font-semibold text-lg">{t("title")}</h3>
            </div>

            <div className="relative w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                            <TableHead className="w-[100px] font-semibold text-foreground">{t("table.id")}</TableHead>
                            <TableHead className="font-semibold text-foreground">{t("table.order_id")}</TableHead>
                            <TableHead className="font-semibold text-foreground">{t("table.user_name")}</TableHead>
                            <TableHead className="font-semibold text-foreground">{t("table.package_name")}</TableHead>
                            <TableHead className="font-semibold text-foreground">{t("table.price")}</TableHead>
                            <TableHead className="text-end font-semibold text-foreground">{t("table.created_at")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-muted/20 border-b-border/40">
                                <TableCell className="font-medium text-muted-foreground">{order.id}</TableCell>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>
                                    <span className="font-medium">{order.userName}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-orange/10 text-brand-orange">
                                        {order.packageName}
                                    </span>
                                </TableCell>
                                <TableCell className="font-mono">${order.price}</TableCell>
                                <TableCell className="text-end text-muted-foreground">{order.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
