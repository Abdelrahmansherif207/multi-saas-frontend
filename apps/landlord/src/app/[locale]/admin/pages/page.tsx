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
import { useTranslations } from "next-intl";
export default function pages() {
  const t = useTranslations("Admin.Dashboard.recent_orders");
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
      title="All pages"
      breadcrumbs={[
        { label: "Pages", href: "/admin/pages" },
        { label: "All Pages", href: "/admin/pages" },
      ]}
    >
      <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                <TableHead className="w-[100px] font-semibold text-foreground">
                  {/* {t("table.id")} */}
                  ID
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {/* {t("table.order_id")} */}
                  title
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {/* {t("table.user_name")} */}
                  Status
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {/* {t("table.package_name")} */}
                  createdAt
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  {/* {t("table.price")} */}
                  actions
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
                    <span className="font-medium">{page.status}</span>
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
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-orange/10 text-brand-orange cursor-pointer"
                      >
                        {action}
                      </button>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-10">
            <div>Showing 0 to 0 of 0 entries</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
