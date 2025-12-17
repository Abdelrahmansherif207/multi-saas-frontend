import { blogs } from "@/app/lib/definitions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;  
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) {
    return Response.json({ error: "blog not found" }, { status: 404 });
  }
  return Response.json(blog);
}