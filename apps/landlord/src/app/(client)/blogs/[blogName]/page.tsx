import BlogDetailCard from "@/components/client/BlogDetailCard";
import { PagesHeader } from "@/components/client/PagesHeader";
import PopularBlogsCard from "@/components/client/PopularBlogsCard";

export default async function BlogPageDetails({
  params,
}: {
  params: { blogName: string };
}) {
  const { blogName } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogName}`
  );
  const blog = await res.json();

  return (
    <>
      <PagesHeader
        title={decodeURIComponent(blogName)}
        breadcrumbs={[
          { label: "Blogs", href: "/" },
          { label: decodeURIComponent(blogName) },
        ]}
      />
      <div className="container mx-auto grid grid-cols-3 gap-5 mt-10">
        <div className="flex flex-col gap-5">
          <PopularBlogsCard />
        </div>
        <BlogDetailCard blog={blog} />
      </div>
    </>
  );
}
