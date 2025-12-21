import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "@/i18n/routing";

// Mock price plan data
const mockPlans = [
    { id: 10, title: "Super duper premium", badge: "On Trial", price: 1000, type: "Lifetime", status: "Publish", created: "Thu, 09-11-23" },
    { id: 9, title: "Premium Lifetime", badge: null, price: 400, type: "Lifetime", status: "Publish", created: "Mon, 01-08-22" },
    { id: 8, title: "Premium Yearly", badge: null, price: 300, type: "Yearly", status: "Publish", created: "Mon, 01-08-22" },
    { id: 7, title: "Premium Monthly", badge: null, price: 0, type: "Monthly", status: "Publish", created: "Mon, 01-08-22" },
    { id: 6, title: "Standard Lifetime", badge: null, price: 200, type: "Lifetime", status: "Publish", created: "Mon, 01-08-22" },
    { id: 5, title: "Standard Yearly", badge: null, price: 150, type: "Yearly", status: "Publish", created: "Mon, 01-08-22" },
    { id: 4, title: "Basic Yearly", badge: null, price: 70, type: "Yearly", status: "Publish", created: "Mon, 01-08-22" },
];

const getTypeBadgeColor = (type: string) => {
    switch (type) {
        case "Lifetime": return "bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300";
        case "Yearly": return "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-300";
        case "Monthly": return "bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-300";
        default: return "bg-muted text-muted-foreground";
    }
};


export default async function AllPricePlansPage() {
    const t = await getTranslations("Admin.PricePlanManage.AllPlans");
    const tMenu = await getTranslations("Admin.PricePlanManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("all_plans"), href: "/admin/price-plans" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show</span>
                        <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
                        <span>entries</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Search:</span>
                            <Input className="h-9 w-[200px]" placeholder="" />
                        </div>
                        <Link href="/admin/price-plans/new">
                            <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                                {t("create_plan")}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="font-semibold text-foreground">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.title")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.price")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.type")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.created")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPlans.map((plan) => (
                                <TableRow key={plan.id} className="hover:bg-muted/20 border-b-border/40">
                                    <TableCell className="font-medium">{plan.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span>{plan.title}</span>
                                            {plan.badge && (
                                                <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400">
                                                    {plan.badge}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>$ {plan.price.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge className={getTypeBadgeColor(plan.type)}>
                                            {plan.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-green-600 dark:text-green-400 font-medium">
                                        {plan.status}
                                    </TableCell>
                                    <TableCell className="text-primary">{plan.created}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1.5">
                                            <Button size="sm" variant="destructive" className="h-7 px-2">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button size="sm" className="h-7 px-2 bg-primary hover:bg-primary/80 text-white dark:text-black">
                                                <Edit className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing 1 to {mockPlans.length} of {mockPlans.length} entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
