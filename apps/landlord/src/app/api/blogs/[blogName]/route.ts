import { blogs } from "@/app/lib/definitions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ blogName: string }> }
) {
  const { blogName } = await params;
  const blog = blogs.find((b) => b.title === blogName);
  if (!blog) {
    return new Response("blog not found", { status: 404 });
  }
  return Response.json(blog);
}