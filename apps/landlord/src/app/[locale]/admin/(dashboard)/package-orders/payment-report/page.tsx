import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getTranslations } from "next-intl/server";

export default async function PaymentReportPage() {
    const t = await getTranslations("Admin.PackageOrderManage.PaymentReport");
    const tMenu = await getTranslations("Admin.PackageOrderManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: t("title"), href: "/admin/package-orders/payment-report" }
            ]}
        >
            <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-foreground mb-6">{t("title")}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">{t("start_date")}</Label>
                        <Input
                            type="date"
                            className="h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">{t("end_date")}</Label>
                        <Input
                            type="date"
                            className="h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">{t("payment_status")}</Label>
                        <Select defaultValue="all">
                            <SelectTrigger className="h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/40">
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground/80">{t("items")}</Label>
                        <Input
                            type="number"
                            defaultValue={10}
                            className="h-10 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl h-10 font-semibold transition-all duration-300 transform hover:translate-y-[-1px]">
                            {t("submit")}
                        </Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
