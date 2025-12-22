import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function CreateTicketPage() {
    const t = await getTranslations("Admin.SupportTicketManage.CreateTicket");
    const tMenu = await getTranslations("Admin.SupportTicketManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("title"), href: "/admin/support-tickets/create" }
            ]}
        >
            <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
                    <Link href="/admin/support-tickets">
                        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 h-10 font-semibold transition-all duration-300 transform hover:translate-y-[-1px]">
                            {t("all_tickets")}
                        </Button>
                    </Link>
                </div>

                <div className="space-y-6 max-w-4xl">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">{t("form.title")}</Label>
                        <Input
                            placeholder={t("form.title")}
                            className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">{t("form.subject")}</Label>
                        <Input
                            placeholder={t("form.subject")}
                            className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-foreground/80">{t("form.priority")}</Label>
                            <Select defaultValue="low">
                                <SelectTrigger className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary">
                                    <SelectValue placeholder="Low" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/40">
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-foreground/80">{t("form.departments")}</Label>
                            <Select>
                                <SelectTrigger className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary">
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/40">
                                    <SelectItem value="support">Support</SelectItem>
                                    <SelectItem value="sales">Sales</SelectItem>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="billing">Billing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-foreground/80">{t("form.user")}</Label>
                            <Input
                                placeholder="Search user..."
                                className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">{t("form.description")}</Label>
                        <Textarea
                            placeholder={t("form.description")}
                            className="min-h-[200px] rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary resize-none p-4"
                        />
                    </div>

                    <div className="pt-4">
                        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-10 h-12 font-bold transition-all duration-300 transform hover:translate-y-[-2px]">
                            {t("form.submit")}
                        </Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
