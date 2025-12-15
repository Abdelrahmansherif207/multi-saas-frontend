export interface BlogInterface {
  id: string;
  date: string;
  category: string;
  title: string;
  image: string;
  content: string;
}

export const blogs: BlogInterface[] = [
  {
    id: "1",
    date: "18 Feb 2023",
    category: "Travel",
    title: "Many of stats view! Understand your day better than ever",
    image: "/assets/temp-travel-images/travel-1.jpg",
    content: `Exploring the hidden gems of the world can be truly rewarding. 
      In this blog, we dive into how to maximize your daily travel experience, 
      enjoy the local culture, and discover secret spots off the beaten path.`,
  },
  {
    id: "2",
    date: "20 Mar 2023",
    category: "Technology",
    title: "New stats view! Understand your day better than ever",
    image: "/assets/temp-travel-images/travel-2.jpg",
    content: `Data visualization has never been more powerful. This blog explains 
      the newest dashboard tools that help you analyze trends, track metrics, 
      and make smarter decisions every day.`,
  },
  {
    id: "3",
    date: "05 Apr 2023",
    category: "Lifestyle",
    title: "This stats view! Understand your day better than ever",
    image: "/assets/temp-travel-images/travel-3.jpg",
    content: `Discover techniques to improve your daily routine and boost productivity. 
      From morning rituals to evening reflections, we cover ways to organize your life 
      more efficiently while keeping stress levels low.`,
  },
];

interface category {
  id:string,
  name:string
}
export const categories: category[] = [
  { id: "1", name: "Vacation" },
  { id: "2", name: "Office Tour" },
  { id: "3", name: "Travel" },
  { id: "4", name: "Away" },
];
