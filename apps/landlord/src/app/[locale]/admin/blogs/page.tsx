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
import { cn } from "@/lib/utils";

interface Blog {
  id: string;
  author: string;
  views: number;
  title: string;
  image: string;
  category: "programming" | "design" | "marketing";
  status: "draft" | "published";
  createdAt: string;
  actions: string[];
}

const dummyBlogs: Blog[] = [
  {
    id: "1",
    author: "John Doe",
    views: 1200,
    title: "Getting Started with Next.js",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    category: "programming",
    status: "published",
    createdAt: "2023-10-01",
    actions: ["Edit", "Delete"],
  },
  {
    id: "2",
    author: "Jane Smith",
    views: 850,
    title: "Modern UI Design Trends",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c",
    category: "design",
    status: "draft",
    createdAt: "2023-10-05",
    actions: ["Edit", "Publish", "Delete"],
  },
  {
    id: "3",
    author: "Mike Johnson",
    views: 2100,
    title: "Marketing Strategies for SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "marketing",
    status: "published",
    createdAt: "2023-10-10",
    actions: ["Edit", "Delete"],
  },
];

export default function page() {
  return (
    <AdminPageWrapper
      title="Blogs"
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Blogs", href: "/admin/blogs" },
      ]}
    >
      <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/40">
                <TableHead className="w-[100px] font-semibold text-foreground">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Author
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Views
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  CreatedAt
                </TableHead>
                <TableHead className="font-semibold text-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyBlogs.map((blog) => (
                <TableRow
                  key={blog.id}
                  className="hover:bg-muted/20 border-b-border/40"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {blog.id}
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    <span className="capitalize">{blog.category}</span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        blog.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      )}
                    >
                      {blog.status}
                    </span>
                  </TableCell>
                  <TableCell>{blog.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {blog.createdAt}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {blog.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between text-sm text-muted-foreground p-4">
            <div>
              Showing 1 to {dummyBlogs.length} of {dummyBlogs.length} entries
            </div>
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
