
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
import { getTranslations } from "next-intl/server";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard.Tickets' });

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    };
}

export default async function TicketsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Dashboard.Tickets' });

    return (
        <div className="space-y-6">
            <PagesHeader
                title={t('title')}
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: t('title') }
                ]}
            />
            <div className="p-6 space-y-6">
                <div className="flex justify-start">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                {t('new_ticket')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl">{t('dialog.title')}</DialogTitle>
                                <DialogDescription>
                                    {t('dialog.description')}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {/* Title */}
                                <div className="grid gap-2">
                                    <Label htmlFor="title">{t('dialog.labels.title')}</Label>
                                    <Input id="title" placeholder={t('dialog.placeholders.title')} />
                                </div>

                                {/* Subject */}
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">{t('dialog.labels.subject')}</Label>
                                    <Input id="subject" placeholder={t('dialog.placeholders.subject')} />
                                </div>

                                {/* Priority */}
                                <div className="grid gap-2">
                                    <Label htmlFor="priority">{t('dialog.labels.priority')}</Label>
                                    <Select defaultValue="Low">
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder={t('dialog.placeholders.select_priority')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">{t('dialog.options.low')}</SelectItem>
                                            <SelectItem value="Medium">{t('dialog.options.medium')}</SelectItem>
                                            <SelectItem value="High">{t('dialog.options.high')}</SelectItem>
                                            <SelectItem value="Urgent">{t('dialog.options.urgent')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Departments */}
                                <div className="grid gap-2">
                                    <Label htmlFor="department">{t('dialog.labels.departments')}</Label>
                                    <Select defaultValue="Login Issue">
                                        <SelectTrigger id="department">
                                            <SelectValue placeholder={t('dialog.placeholders.select_department')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Login Issue">{t('dialog.options.login_issue')}</SelectItem>
                                            <SelectItem value="Payment Issue">{t('dialog.options.payment_issue')}</SelectItem>
                                            <SelectItem value="Technical Support">{t('dialog.options.technical_support')}</SelectItem>
                                            <SelectItem value="General Inquiry">{t('dialog.options.general_inquiry')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">{t('dialog.labels.description')}</Label>
                                    <Textarea id="description" placeholder={t('dialog.placeholders.description')} rows={4} />
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                                    {t('dialog.submit')}
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
                                    <th className="px-6 py-4 w-20">{t('table.id')}</th>
                                    <th className="px-6 py-4">{t('table.title')}</th>
                                    <th className="px-6 py-4 w-32">{t('table.priority')}</th>
                                    <th className="px-6 py-4 w-32">{t('table.status')}</th>
                                    <th className="px-6 py-4 w-24 text-center">{t('table.action')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-muted/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-muted-foreground">{ticket.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{ticket.title}</span>
                                                <span className="text-xs text-muted-foreground">{t('table.created_at')}: {ticket.createdAt}</span>
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
