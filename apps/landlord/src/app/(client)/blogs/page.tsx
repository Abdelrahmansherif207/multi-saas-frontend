import { BlogInterface } from "@/app/lib/definitions";
import SearchCard from "@/components/client/SearchCard";
import SectionHeader from "@/components/client/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, Tag, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function blogsPage({
  searchParams,
}: {
  searchParams: { query: string; category: string };
}) {
  const { query, category } = await searchParams;
  const res = await fetch(
    `https://multi-saas-frontend-landlord.vercel.app/api/blogs?query=${encodeURIComponent(query ?? "")}&category=${encodeURIComponent(category ?? "")}`
  );
  const blogs: BlogInterface[] = await res.json();
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32 perspective-1000">
      <div className="mt-20">
        <SectionHeader prefix="our" highlight="blogs" suffix="" />
        <SearchCard />
        <div className="flex justify-between items-center">
          {blogs?.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${decodeURIComponent(blog.title)}`}
            >
              <Card className="cursor-pointer">
                <CardHeader className="flex gap-3">
                  <Image
                    className="w-full"
                    src={blog.image}
                    width={300}
                    height={300}
                    alt={blog.title}
                  />
                  <div className="flex gap-3 p-3">
                    <CardTitle className="text-muted-foreground font-medium flex items-center gap-1">
                      <Timer />
                      {blog.date}
                    </CardTitle>
                    <CardTitle className="text-muted-foreground font-medium flex items-center gap-1">
                      <Tag />
                      {blog.category}
                    </CardTitle>
                  </div>
                  <CardTitle className="font-bold">{blog.title}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="cursor-pointer text-muted-foreground font-bold"
                    variant="ghost"
                  >
                    View Details
                    <MoveRight />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
