import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type ContactStatus = "read" | "unread";

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactMessageItem {
  id: string;
  status: ContactStatus;
  date: string;
  data: ContactData;
  formName: string;
  count: number;
}

const messages: ContactMessageItem[] = [
  {
    id: "1",
    status: "unread",
    date: "Jul,2025 23",
    formName: "contact",
    count: 4,
    data: {
      name: "name",
      email: "email",
      subject: "subject",
      message: "message",
    },
  },
  {
    id: "2",
    status: "read",
    date: "Jul,2025 23",
    formName: "contact",
    count: 3,
    data: {
      name: "name",
      email: "email",
      subject: "subject",
      message: "message",
    },
  },
  {
    id: "3",
    status: "read",
    date: "Jul,2025 13",
    formName: "contact",
    count: 2,
    data: {
      name: "name",
      email: "email",
      subject: "subject",
      message: "message",
    },
  },
];

export default function ContactMessagePage() {
  const t = useTranslations("Admin.Notifications.ContactMessages");
  return (
    <AdminPageWrapper
      title={t("title")}
      breadcrumbs={[
        { label: t("breadcrumbs.admin"), href: "/admin" },
        { label: t("breadcrumbs.notifications"), href: "/admin/notifications" },
        { label: t("breadcrumbs.contact_messages"), href: "/admin/notifications/contact-message" },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground/80">{t("table_title")}</h2>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="hidden sm:flex gap-2">
              <Button variant="secondary" size="sm">{t("filter.all")}</Button>
              <Button variant="outline" size="sm">{t("filter.read")}</Button>
              <Button variant="outline" size="sm">{t("filter.unread")}</Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t("pagination.show")}</span>
              <Input className="w-16 h-8 text-center" defaultValue="10" type="number" />
              <span>{t("pagination.entries")}</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium">{t("search_label")}</span>
              <Input className="h-9 w-[220px]" placeholder={t("search_placeholder")} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                  <TableHead className="w-[110px] font-semibold text-foreground">{t("table.actions")}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t("table.status")}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t("table.date")}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t("table.data")}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t("table.form_name")}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t("table.count")}</TableHead>
                  <TableHead className="w-[60px] text-right font-semibold text-foreground">{t("table.select")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((m) => (
                  <TableRow key={m.id} className="hover:bg-muted/20 border-b-border/40 align-top">
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="destructive" size="sm" className="h-8 px-2">
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm" className="h-8 px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          m.status === "read"
                            ? "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        )}
                      >
                        {m.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">{m.date}</TableCell>

                    <TableCell>
                      <div className="text-sm leading-6">
                        <div>{t("fields.name")}: {m.data.name}</div>
                        <div>{t("fields.email")}: {m.data.email}</div>
                        <div>{t("fields.subject")}: {m.data.subject}</div>
                        <div className="wrap-break-word">{t("fields.message")}: {m.data.message}</div>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">{m.formName}</TableCell>
                    <TableCell>{m.count}</TableCell>
                    <TableCell className="text-right">
                      <Checkbox aria-label={`select-${m.id}`} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between text-sm text-muted-foreground p-4">
              <div>
                {t("pagination.showing", {
                  from: 1,
                  to: messages.length,
                  total: messages.length,
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  {t("pagination.previous")}
                </Button>
                <Button variant="outline" size="sm" disabled>
                  {t("pagination.next")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageWrapper>
  );
}