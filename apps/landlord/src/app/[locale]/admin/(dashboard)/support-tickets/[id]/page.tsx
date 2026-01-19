import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import axios from "axios";
import { getAdminAuthCookie } from "@/lib/auth/admin-cookies";
import { revalidatePath } from "next/cache";
import { cn } from "@/lib/utils";
import { MessageSquare, XCircle, Send, User, Clock } from "lucide-react";

interface TicketMessage {
    id: number;
    message: string;
    sender_type: string;
    sender?: { id: number; name: string };
    created_at: string;
    attachments?: string[];
}

interface TicketDetail {
    id: number;
    title: string;
    description: string;
    department?: { id: number; name: string };
    user?: { id: number; name: string; email: string };
    priority: string;
    status: string;
    messages: TicketMessage[];
    created_at: string;
    updated_at: string;
}

interface TicketResponse {
    success: boolean;
    message: string;
    data: TicketDetail;
}

export default async function TicketDetailPage({
    params
}: {
    params: { id: string; locale: string }
}) {
    const { id, locale } = params;
    const t = await getTranslations("Admin.SupportTicketManage");
    const token = await getAdminAuthCookie();

    // Inline Server Action: Reply to ticket
    async function replyToTicket(formData: FormData) {
        'use server';
        const ticketId = formData.get('ticketId') as string;
        const authToken = await getAdminAuthCookie();
        if (!authToken) return;

        const message = formData.get('message') as string;
        if (!message?.trim()) return;

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/support-tickets/${ticketId}/reply`,
                { message },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            revalidatePath(`/[locale]/admin/support-tickets/${ticketId}`, 'page');
        } catch (error: any) {
            console.error('Failed to send reply:', error);
        }
    }

    // Inline Server Action: Close ticket
    async function closeTicket(formData: FormData) {
        'use server';
        const ticketId = formData.get('ticketId') as string;
        const authToken = await getAdminAuthCookie();
        if (!authToken) return;

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/support-tickets/${ticketId}/close`,
                {},
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            revalidatePath(`/[locale]/admin/support-tickets/${ticketId}`, 'page');
        } catch (error: any) {
            console.error('Failed to close ticket:', error);
        }
    }

    // Fetch ticket details
    let ticket: TicketDetail | null = null;

    if (token) {
        try {
            const response = await axios.get<TicketResponse>(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/support-tickets/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Accept-Language': locale,
                    }
                }
            );
            if (response.data.success) {
                ticket = response.data.data;
            }
        } catch (error) {
            console.error("Failed to fetch ticket", error);
        }
    }

    if (!ticket) {
        notFound();
    }

    const getPriorityStyle = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case 'urgent': return 'bg-red-500/10 text-red-600';
            case 'high': return 'bg-orange-500/10 text-orange-600';
            case 'medium': return 'bg-amber-500/10 text-amber-600';
            default: return 'bg-emerald-500/10 text-emerald-600';
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'bg-emerald-500/10 text-emerald-600';
            case 'pending': return 'bg-amber-500/10 text-amber-600';
            case 'closed': return 'bg-red-500/10 text-red-600';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <AdminPageWrapper
            title={`Ticket #${ticket.id}`}
            breadcrumbs={[
                { label: t("menu.title"), href: "#" },
                { label: t("menu.all_tickets"), href: `/${locale}/admin/support-tickets` },
                { label: `#${ticket.id}`, href: "#" }
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ticket Info Sidebar */}
                <Card className="lg:col-span-1 bg-card/60 backdrop-blur-xl border-border/40">
                    <CardHeader>
                        <CardTitle className="text-lg">Ticket Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Title</p>
                            <p className="font-medium">{ticket.title}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Department</p>
                            <p className="font-medium">{ticket.department?.name || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">User</p>
                            <p className="font-medium">{ticket.user?.name || '-'}</p>
                            <p className="text-sm text-muted-foreground">{ticket.user?.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Priority</p>
                                <Badge className={cn("text-xs font-bold", getPriorityStyle(ticket.priority))}>
                                    {ticket.priority}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <Badge className={cn("text-xs font-bold", getStatusStyle(ticket.status))}>
                                    {ticket.status}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Created</p>
                            <p className="text-sm">{new Date(ticket.created_at).toLocaleString()}</p>
                        </div>

                        {ticket.status?.toLowerCase() !== 'closed' && (
                            <form action={closeTicket}>
                                <input type="hidden" name="ticketId" value={id} />
                                <Button type="submit" variant="destructive" className="w-full mt-4">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Close Ticket
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Messages Thread */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Original Description */}
                    <Card className="bg-card/60 backdrop-blur-xl border-border/40">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{ticket.user?.name || 'User'}</span>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(ticket.created_at).toLocaleString()}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>
                        </CardContent>
                    </Card>

                    {/* Message Thread */}
                    {ticket.messages?.map((msg) => (
                        <Card
                            key={msg.id}
                            className={cn(
                                "bg-card/60 backdrop-blur-xl border-border/40",
                                msg.sender_type === 'admin' && "border-l-4 border-l-primary"
                            )}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                        {msg.sender?.name || (msg.sender_type === 'admin' ? 'Admin' : 'User')}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                        {msg.sender_type}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(msg.created_at).toLocaleString()}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Reply Form */}
                    {ticket.status?.toLowerCase() !== 'closed' && (
                        <Card className="bg-card/60 backdrop-blur-xl border-border/40">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Reply
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form action={replyToTicket} className="space-y-4">
                                    <input type="hidden" name="ticketId" value={id} />
                                    <Textarea
                                        name="message"
                                        placeholder="Type your reply..."
                                        rows={4}
                                        className="resize-none"
                                        required
                                    />
                                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Reply
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AdminPageWrapper>
    );
}
