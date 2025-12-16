"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PagesHeader } from "@/components/client/PagesHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Support Tickets | Wajha",
    description: "Manage your support tickets and inquiries.",
};

// Mock Data for Tickets
const tickets = [
    {
        id: "#1",
        title: "test",
        createdAt: "Tue, 16 Dec 2025",
        priority: "Low",
        status: "Open",
    },
];

export default function TicketsPage() {
    return (
        <div className="space-y-6">
            <PagesHeader
                title="Support Tickets"
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Support Tickets" }
                ]}
            />
            <div className="p-6 space-y-6">
                <div className="flex justify-start">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                New Ticket
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Create New Support Ticket</DialogTitle>
                                <DialogDescription>
                                    Fill in the details below to submit a new support ticket.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {/* Title */}
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" placeholder="Title" />
                                </div>

                                {/* Subject */}
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="Subject" />
                                </div>

                                {/* Priority */}
                                <div className="grid gap-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select defaultValue="Low">
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Urgent">Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Departments */}
                                <div className="grid gap-2">
                                    <Label htmlFor="department">Departments</Label>
                                    <Select defaultValue="Login Issue">
                                        <SelectTrigger id="department">
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Login Issue">Login Issue</SelectItem>
                                            <SelectItem value="Payment Issue">Payment Issue</SelectItem>
                                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" placeholder="Description" rows={4} />
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                                    Submit Ticket
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Table Container */}
                <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground uppercase font-medium border-b">
                                <tr>
                                    <th className="px-6 py-4 w-20">ID</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4 w-32">Priority</th>
                                    <th className="px-6 py-4 w-32">Status</th>
                                    <th className="px-6 py-4 w-24 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-muted/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-muted-foreground">{ticket.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{ticket.title}</span>
                                                <span className="text-xs text-muted-foreground">created at: {ticket.createdAt}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-3 py-1 rounded-md text-xs font-semibold">
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-3 py-1 rounded-md text-xs font-semibold">
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent group">
                                                <Eye className="h-5 w-5 text-primary transition-colors group-hover:text-brand-orange" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
