import { AdminPageWrapper } from "@/components/admin/shared/AdminPageWrapper";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function pages() {
  const t = await getTranslations("Admin.Pages");
  const pages = [
    {
      id: "1",
      title: "Home Page",
      status: "published",
      createdAt: "1 week ago",
      actions: ["View", "Edit", "Delete"],
    },
    {
      id: "2",
      title: "About Us",
      status: "published",
      createdAt: "3 days ago",
      actions: ["View", "Edit", "Delete"],
    },
    {
      id: "3",
      title: "Contact",
      status: "published",
      createdAt: "5 hours ago",
      actions: ["View", "Edit", "Delete"],
    },
  ];

  return (
    <AdminPageWrapper
      title={t("title")}
      breadcrumbs={[
        { label: t("breadcrumbs.pages"), href: "/admin/pages" },
        { label: t("breadcrumbs.all_pages"), href: "/admin/pages" },
      ]}
    >
      <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                <TableHead className="w-[100px] font-semibold text-foreground">
                  {t("table.id")}
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {t("table.title")}
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {t("table.status")}
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {t("table.created_at")}
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {t("table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow
                  key={page.id}
                  className="hover:bg-muted/20 border-b-border/40"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {page.id}
                  </TableCell>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>
                    <span className="font-medium">{t(`status.${page.status}`)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-orange/10 text-brand-orange">
                      {page.createdAt}
                    </span>
                  </TableCell>
                  <TableCell>
                    {page.actions.map((action, idx) => (
                      <button
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-orange/10 text-brand-orange cursor-pointer mr-2"
                      >
                        {t(`actions.${action.toLowerCase()}`)}
                      </button>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-10">
            <div>
              {t("pagination.showing", {
                from: 0,
                to: 0,
                total: 0,
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
    </AdminPageWrapper>
  );
}
