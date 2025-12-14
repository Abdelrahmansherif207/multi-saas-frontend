import SectionHeader from "@/components/client/SectionHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, Tag, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogInterface {
  id: string;
  date: string;
  category: string;
  title: string;
  image: string;
}

const blogs: BlogInterface[] = [
  {
    id: "1",
    date: "18 Feb 2023",
    category: "Travel",
    title: "Many of stats view! Understand your day better than ever",
    image: "/assets/temp-travel-images/travel-1.jpg",
  },
  {
    id: "2",
    date: "18 Feb 2023",
    category: "Travel",
    title: "New stats view! Understand your day better than ever",
    image: "/assets/temp-travel-images/travel-2.jpg",
  },
  {
    id: "3",
    date: "18 Feb 2023",
    category: "Travel",
    title: "This stats view! Understand your day better than ever",
    image: "/assets/temp-travel-images/travel-3.jpg",
  },
];

export default function blogsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32 perspective-1000">
      <div className="bg-brand-orange/20 w-full h-[300px]"></div>
      <div className="mt-20">
        <SectionHeader prefix="our" highlight="blogs" suffix="" />
        <div className="flex justify-between items-center">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`blogs/${blog.title}`}>
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
                  <CardTitle className="font-bold">
                    {blog.title}
                  </CardTitle>
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
