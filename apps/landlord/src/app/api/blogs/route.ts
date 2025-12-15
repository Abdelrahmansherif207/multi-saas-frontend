import { blogs } from "@/app/lib/definitions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase() || "";

  const filteredBlogs = blogs.filter((b) => {
    const matchTitle = query ? b.title.toLowerCase().includes(query) : true;

    const matchCategory = category
      ? b.category.toLowerCase() === category
      : true;

    return matchTitle && matchCategory;
  });

  return Response.json(filteredBlogs);
}
