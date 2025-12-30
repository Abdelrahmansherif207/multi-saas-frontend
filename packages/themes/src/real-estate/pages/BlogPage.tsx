'use client';

import { TenantConfig, MenuItem, ThemeTranslations } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowRight, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';

interface BlogPageProps {
    tenant: TenantConfig;
    menu?: MenuItem[];
    translations?: ThemeTranslations;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
}

const mockPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Future of Luxury Real Estate in Egypt',
        excerpt: 'Discover the emerging trends shaping the luxury property market in Cairo and the North Coast, from sustainable architecture to smart home integration.',
        category: 'Market Trends',
        author: 'Sarah Johnson',
        date: 'Oct 24, 2024',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        featured: true,
    },
    {
        id: '2',
        title: 'Top 5 Compounds in New Zayed for Families',
        excerpt: 'A comprehensive guide to the best family-friendly compounds in New Zayed, featuring top-tier schools, parks, and community centers.',
        category: 'Neighborhood Guides',
        author: 'Ahmed Hassan',
        date: 'Oct 22, 2024',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
    {
        id: '3',
        title: 'Investing in Commercial Property: A Beginner’s Guide',
        excerpt: 'Everything you need to know before making your first commercial real estate investment in the booming administrative capital.',
        category: 'Investment',
        author: 'Mohamed Ali',
        date: 'Oct 20, 2024',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    },
    {
        id: '4',
        title: 'Interior Design Trends for 2025',
        excerpt: 'Get inspired by the latest interior design trends that are taking over modern Egyptian homes this season.',
        category: 'Lifestyle',
        author: 'Laila Mahmoud',
        date: 'Oct 18, 2024',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=800&q=80',
    },
    {
        id: '5',
        title: 'Understanding Mortgage Options in Egypt',
        excerpt: 'Navigate the complex world of property financing with our easy-to-understand breakdown of mortgage plans available today.',
        category: 'Finance',
        author: 'Omar Sherif',
        date: 'Oct 15, 2024',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80',
    },
    {
        id: '6',
        title: 'The Rise of Smart Cities: Why Location Matters',
        excerpt: 'Why buying property in a smart city is the smartest investment you can make for your future and lifestyle.',
        category: 'Market Trends',
        author: 'Nour El-Din',
        date: 'Oct 12, 2024',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    },
];

export function BlogPage({ tenant, menu, translations }: BlogPageProps) {
    const featuredPost = mockPosts.find(p => p.featured) || mockPosts[0];
    const gridPosts = mockPosts.filter(p => !p.featured);

    return (
        // <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-foreground">


        <main className="flex-grow pt-24 pb-16">
            <div className="container mx-auto px-4">

                {/* Page Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        {translations?.BlogPage?.title || 'Our Latest Insights'}
                    </h1>
                    <p className="text-slate-600 text-lg">
                        {translations?.BlogPage?.subtitle || 'Expert analysis, market trends, and lifestyle guides to help you make informed real estate decisions.'}
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <div className="relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                        <div className="grid md:grid-cols-2 lg:grid-cols-12 min-h-[500px]">
                            {/* Image Side */}
                            <div className="lg:col-span-7 relative overflow-hidden h-96 md:h-auto">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-none"></div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:col-span-5 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                        {featuredPost.category}
                                    </span>
                                    <span className="text-slate-400 text-sm flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {featuredPost.date}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-primary transition-colors">
                                    {featuredPost.title}
                                </h2>

                                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900">{featuredPost.author}</div>
                                            <div className="text-xs text-slate-500">{featuredPost.readTime}</div>
                                        </div>
                                    </div>

                                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6">
                                        {translations?.BlogPage?.readArticle || 'Read Article'} <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Post Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {gridPosts.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-slate-100">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>

                                <a href="#" className="inline-flex items-center text-primary font-bold text-sm tracking-wide hover:underline mt-auto group/link">
                                    {translations?.BlogPage?.readMore || 'Read More'} <ChevronRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80')] bg-cover bg-center opacity-20"></div>
                    <div className="relative z-10 px-8 py-16 md:py-20 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {translations?.BlogPage?.newsletter?.title || 'Stay Ahead of the Market'}
                        </h2>
                        <p className="text-slate-300 text-lg mb-10">
                            {translations?.BlogPage?.newsletter?.description || 'Subscribe to our weekly newsletter for the latest real estate trends, exclusive investment opportunities, and expert advice delivered straight to your inbox.'}
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder={translations?.BlogPage?.newsletter?.placeholder || "Your email address"}
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary rounded-full px-6"
                            />
                            <Button className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold whitespace-nowrap">
                                {translations?.BlogPage?.newsletter?.button || 'Subscribe Now'}
                            </Button>
                        </form>
                        <p className="text-xs text-slate-500 mt-6">
                            {translations?.BlogPage?.newsletter?.disclaimer || 'We respect your privacy. Unsubscribe at any time.'}
                        </p>
                    </div>
                </div>

            </div>
        </main>

    );
}
