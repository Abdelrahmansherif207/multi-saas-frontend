import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function PopularBlogsCard() {
  const blogs = [
    { title: "Understand your day better than ever", img: "/assets/temp-travel-images/travel-1.jpg" },
    { title: "Understand your day better than ever", img: "/assets/temp-travel-images/travel-1.jpg" },
    { title: "Understand your day better than ever", img: "/assets/temp-travel-images/travel-1.jpg" },
  ];

  return (
    <Card className="cursor-pointer mt-5">
      <CardHeader>
        <CardTitle>Popular Blogs</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        {blogs.map((blog, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <Image className="w-[100px] rounded-2xl" src={blog.img} width={300} height={300} alt={blog.title} />
            <CardTitle>{blog.title}</CardTitle>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
