import BlogDetailCard from "@/components/client/BlogDetailCard";
import { PagesHeader } from "@/components/client/PagesHeader";
import PopularBlogsCard from "@/components/client/PopularBlogsCard";
import { getTranslations } from "next-intl/server";

export default async function BlogPageDetails({
  params,
}: {
  params: { slug: string, locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blogs' });
  const { slug } = (await params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`
  );
  const blog = await res.json();
  console.log(blog);
  
  return (
    <>
      <PagesHeader
        title={decodeURIComponent(blog.title)}
        breadcrumbs={[
          { label: "Blogs", href: "/" },
          { label: decodeURIComponent(blog.title) },
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
