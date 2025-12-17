import { BlogInterface } from "@/app/lib/definitions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer, Tag } from "lucide-react";
import Image from "next/image";

export default function BlogDetailCard({ blog }: { blog: BlogInterface }) {  
  return (
    <Card className="cursor-pointer col-span-2">
      <CardHeader className="flex gap-3">
        <Image
          className="w-full rounded-md"
          src={blog.image}
          width={300}
          height={300}
          alt="blog image"
        />
        <div className="flex gap-3 p-3">
          <CardTitle className="text-muted-foreground font-medium flex items-center gap-1">
            <Timer /> {blog.date}
          </CardTitle>
          <CardTitle className="text-muted-foreground font-medium flex items-center gap-1">
            <Tag /> {blog.category}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{blog.content}</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
