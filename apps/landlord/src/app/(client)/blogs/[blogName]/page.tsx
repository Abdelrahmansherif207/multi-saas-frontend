import BlogDetailCard from "@/components/client/BlogDetailCard";
import PopularBlogsCard from "@/components/client/PopularBlogsCard";

export default async function BlogPageDetails({
  params,
}: {
  params: { blogName: string };
}) {
  const { blogName } = await params;
  const res = await fetch(`http://localhost:3000/api/blogs/${blogName}`);
  const blog = await res.json();

  return (
    <>
      <div className="bg-brand-orange/20 w-full h-[300px]"></div>
      <div className="container mx-auto grid grid-cols-3 gap-5 mt-10">
        <div className="flex flex-col gap-5">
          <PopularBlogsCard />
        </div>
        <BlogDetailCard blog={blog} />
      </div>
    </>
  );
}
