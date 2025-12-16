import { Button } from "@/components/ui/button";
import { PagesHeader } from "@/components/client/PagesHeader";
import { CheckCircle2, Ticket } from "lucide-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

// Mock Data
const stats = [
    {
        label: "Total Orders",
        value: "1",
        icon: CheckCircle2,
        color: "bg-brand-orange", // Using brand-orange as requested for variety or primary
        // User said: "states cards should also have different color that suitable with our main colors"
        // Let's use specific colors for cards to match the vibrant look but stay harmonious.
        className: "bg-gradient-to-br from-[#FF8C66] to-[#E05238] text-white",
    },
    {
        label: "Support Tickets",
        value: "0",
        icon: Ticket,
        className: "bg-primary text-primary-foreground", // Primary color as requested
    },
];

const recentOrders = [
    {
        id: "1",
        package: "Premium Monthly",
        amount: "$0",
        domain: "test.localhost",
        startDate: "website not yet created",
        expireDate: "website not yet created",
        status: "pending",
        paymentHistory: "No Payment History Found",
    },
];

export default function DashboardPage() {
    return (
        <div className="pb-20">
            {/* PagesHeader */}
            {/* 
            <PagesHeader
                title="Dashboard"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
            /> */}

            <div className="space-y-8">
                {/* Action Button Section */}
                <div className="flex justify-end">
                    <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0 shadow-lg transition-all hover:-translate-y-0.5">
                        Create a website
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className={`border-0 shadow-md overflow-hidden ${stat.className}`}>
                            <CardContent className="p-6 flex items-center gap-6">
                                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <stat.icon className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <p className="text-white/90 font-medium">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Your Website Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-muted-foreground uppercase tracking-wider text-center md:text-left">
                        Your Website
                    </h3>
                    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">ID</th>
                                        <th className="px-6 py-3 font-medium">Site</th>
                                        <th className="px-6 py-3 font-medium">Browse</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="px-6 py-4" colSpan={3}>
                                            <div className="text-center py-4 text-muted-foreground">
                                                No websites found
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-muted-foreground uppercase tracking-wider text-center md:text-left">
                        Recent Orders
                    </h3>
                    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">ID</th>
                                        <th className="px-6 py-3 font-medium">Package Name</th>
                                        <th className="px-6 py-3 font-medium">Amount</th>
                                        <th className="px-6 py-3 font-medium">Domain</th>
                                        <th className="px-6 py-3 font-medium">Start Date</th>
                                        <th className="px-6 py-3 font-medium">Expire Date</th>
                                        <th className="px-6 py-3 font-medium">Order Status</th>
                                        <th className="px-6 py-3 font-medium">Payment History</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="bg-card hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 font-medium">{order.id}</td>
                                            <td className="px-6 py-4 text-primary font-medium">{order.package}</td>
                                            <td className="px-6 py-4 font-bold">{order.amount}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.domain}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.startDate}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.expireDate}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">{order.paymentHistory}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
