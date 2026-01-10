import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default async function WebsiteInstructionsPage() {
    const t = await getTranslations("Admin.WebsiteManage.Instructions");
    const tMenu = await getTranslations("Admin.WebsiteManage.menu");

    return (
        <AdminPageWrapper
            title={t("title")}
            breadcrumbs={[
                { label: tMenu("title"), href: "#" },
                { label: tMenu("instructions"), href: "/admin/websites/instructions" }
            ]}
        >
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-lg font-semibold text-foreground/80">{t("subtitle")}</h2>
                        <div className="flex items-center gap-3">
                            <Select defaultValue="en">
                                <SelectTrigger className="w-[140px] h-9">
                                    <SelectValue placeholder={t("language")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English (UK)</SelectItem>
                                    <SelectItem value="ar">Arabic</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                                {t("add_new")}
                            </Button>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-600 dark:text-blue-400 text-sm">
                        {t("info_text")} <a href="#" className="underline font-medium">{t("view_link")}</a>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-600 dark:text-green-400 text-sm">
                        {t("language_info")}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Select defaultValue="bulk">
                                <SelectTrigger className="w-[140px] h-9">
                                    <SelectValue placeholder={t("bulk_action")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bulk">{t("bulk_action")}</SelectItem>
                                    <SelectItem value="delete">{t("delete")}</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                                {t("apply")}
                            </Button>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Show</span>
                                <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
                                <span>entries</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Search:</span>
                                <Input className="h-9 w-[200px]" placeholder="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                                <TableHead className="w-[50px]"><Checkbox /></TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.id")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.image")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.title")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.description")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                                <TableHead className="font-semibold text-foreground">{t("table.action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                {
                                    id: 1,
                                    emoji: "👍",
                                    title: "Step 1: Setup Your Website Identity",
                                    description: "Choose the colors and font styles that reflect your brand, great",
                                    status: "Publish"
                                },
                                {
                                    id: 2,
                                    emoji: "👍",
                                    title: "Step 2: Setup Your Pages And Styles",
                                    description: "Select a website builder that fits your needs and skill level.",
                                    status: "Publish"
                                },
                                {
                                    id: 3,
                                    emoji: "👍",
                                    title: "Step 3: Setup your footer and domain ok",
                                    description: "Customize the domain for the site",
                                    status: "Publish"
                                }
                            ].map((instruction) => (
                                <TableRow key={instruction.id} className="hover:bg-muted/20 border-b-border/40">
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell className="font-medium">{instruction.id}</TableCell>
                                    <TableCell>
                                        <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 text-2xl">
                                            {instruction.emoji}
                                        </div>
                                    </TableCell>
                                    <TableCell>{instruction.title}</TableCell>
                                    <TableCell className="max-w-xs truncate">{instruction.description}</TableCell>
                                    <TableCell>
                                        <span className="text-green-600 font-medium">{instruction.status}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1.5">
                                            <Button size="sm" className="h-7 px-2 bg-primary hover:bg-primary/80 text-white dark:text-black transition-colors duration-300">
                                                <Edit className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button size="sm" variant="destructive" className="h-7 px-2">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Showing 1 to 3 of 3 entries</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
