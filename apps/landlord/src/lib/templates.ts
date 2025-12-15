export interface Template {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    isComingSoon?: boolean;
}

export const templates: Template[] = [
    {
        id: "agency",
        title: "Agency",
        description: "Agency description",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        category: "Business",
    },
    {
        id: "article",
        title: "Article",
        description: "Article description",
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
        category: "Blog",
    },
    {
        id: "barber",
        title: "Barber Shop",
        description: "Barber shop with appointment.",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
        category: "Service",
    },
    {
        id: "construction",
        title: "Construction",
        description: "Construction description",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
        category: "Business",
    },
    {
        id: "consultancy",
        title: "Consultancy",
        description: "Consultancy description",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        category: "Business",
    },
    {
        id: "course",
        title: "Course",
        description: "This is course theme",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
        category: "Education",
        isComingSoon: true,
    },
];

export const categories = Array.from(new Set(templates.map(t => t.category)));
