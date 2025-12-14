import CheckboxComponent from "@/components/client/CheckboxComponent";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MoveRight, SearchIcon, Tag, Timer } from "lucide-react";
import Image from "next/image";

export default async function blogPageDetails({
  params,
}: {
  params: { blogName: string };
}) {
  const { blogName } = await params;

  return (
    <>
      <div className="bg-brand-orange/20 w-full h-[300px]"></div>
      <div className="container mx-auto grid grid-cols-3 gap-5 mt-10">
        <div>
          <Card className="cursor-pointer">
            <CardContent>
              <InputGroup className="mt-5">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>Search</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <CheckboxComponent />
            </CardContent>
          </Card>

          <Card className="cursor-pointer">
            <CardHeader>
              <CardTitle>Popular Blogs</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Image
                className="w-[100px] rounded-2xl"
                src="/assets/temp-travel-images/travel-1.jpg"
                width={300}
                height={300}
                alt="Many of stats view! Understand your day better than ever"
              />
              <CardTitle>
                This stats view! Understand your day better than ever
              </CardTitle>
              <Image
                className="w-[100px] rounded-2xl"
                src="/assets/temp-travel-images/travel-1.jpg"
                width={300}
                height={300}
                alt="Many of stats view! Understand your day better than ever"
              />
              <CardTitle>
                This stats view! Understand your day better than ever
              </CardTitle>{" "}
              <Image
                className="w-[100px] rounded-2xl"
                src="/assets/temp-travel-images/travel-1.jpg"
                width={300}
                height={300}
                alt="Many of stats view! Understand your day better than ever"
              />
              <CardTitle>
                This stats view! Understand your day better than ever
              </CardTitle>
            </CardContent>
          </Card>
        </div>
        <Card className="cursor-pointer col-span-2">
          <CardHeader className="flex flex-col gap-3">
            <Image
              className="w-full"
              src="/assets/temp-travel-images/travel-1.jpg"
              width={300}
              height={300}
              alt="Many of stats view! Understand your day better than ever"
            />
            <div className="flex gap-3 p-3">
              <CardTitle className="text-muted-foreground font-medium flex items-center gap-1">
                <Timer />
                18 Feb 2023
              </CardTitle>
              <CardTitle className="text-muted-foreground font-medium flex items-center gap-1">
                <Tag />
                travel
              </CardTitle>
            </div>
            <CardTitle className="font-bold">
              Many of stats view! Understand your day better than ever
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Web development today involves a careful balance of design,
              functionality, and performance. Developers often start with a
              clear understanding of the user experience, ensuring that websites
              and applications are intuitive and responsive across devices. A
              common workflow includes setting up project scaffolding, writing
              modular code, and integrating APIs for dynamic content. Testing
              and debugging play a crucial role, as even minor errors can affect
              usability and accessibility. Continuous learning is essential,
              given the rapid evolution of frameworks and tools. By keeping code
              maintainable and adhering to best practices, developers can create
              robust solutions that meet both client and user needs. In addition
              to technical skills, communication and collaboration are vital.
              Projects often involve working with designers, product managers,
              and other stakeholders to ensure that the final product aligns
              with the initial vision while remaining adaptable to changes.
            </p>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}
