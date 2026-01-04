'use client';

import { TenantConfig, MenuItem, ThemeTranslations, BlogDetailPageProps } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Calendar, User, Clock, MessageCircle, Phone, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export function BlogDetailPage({ tenant, domain, slug, translations }: BlogDetailPageProps) {
    const locale = useLocale();
    const t = translations?.BlogDetail;

    // Mock data for the blog post
    const post = {
        title: 'Explore Top Things To Do In Sharm El Sheikh (Locations Included)',
        author: 'Mary Karen',
        date: 'December 14, 2023',
        readTime: '15-minute read',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
        content: `
            Have you been planning on spending your vacation in Sharm El Sheikh, yet you are still uncertain about the activities you can enjoy in this mesmerizing earthly heaven? No worries, this blog article is all about the top and most fun things to do in Sharm El Sheikh.
            
            This full guide will be your number one planner for your trip. You will get to know the top activities you can practice, places to visit, top beaches, and hotels to stay in Sharm El Sheikh.
            
            All you need to do now is sit back, stay focused, and get ready to plan for your journey after reading this 15-minute blog.
        `,
        projectBanner: {
            name: 'Hacienda Bay',
            location: 'Sidi Abdel Rahman',
            price: '116,853,000 EGP',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
        },
        popularPosts: [
            { id: '1', title: 'Unlock Unlimited Profits with Nawy Unlocked', date: 'January 1, 2024', image: 'https://images.unsplash.com/photo-1460472178825-e5240623abe5?w=400&q=80' },
            { id: '2', title: 'Learn About Nawy Now & Mortgage Finance Fund', date: 'January 3, 2024', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80' },
            { id: '3', title: 'New Year in Egypt 2024: Best Concerts & Top Places', date: 'January 4, 2024', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80' },
        ]
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Project Banner */}
            <div className="relative h-48 md:h-64 overflow-hidden">
                <img src={post.projectBanner.image} alt={post.projectBanner.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-white text-2xl md:text-4xl font-bold">{post.projectBanner.name}</h2>
                        <p className="text-white/80 text-sm md:text-base">{post.projectBanner.location}</p>
                        <p className="text-orange-500 text-xl md:text-3xl font-bold mt-2">{post.projectBanner.price}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-b border-slate-100 pb-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    <span className="font-semibold text-slate-900">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            <div className="rounded-3xl overflow-hidden shadow-xl">
                                <img src={post.image} alt={post.title} className="w-full h-auto" />
                            </div>

                            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6 pt-6">
                                {post.content.split('\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph.trim()}</p>
                                ))}
                            </div>

                            {/* Share */}
                            <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                                <span className="font-bold text-slate-900">Share this article:</span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600">
                                        <Facebook className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full hover:bg-sky-50 hover:text-sky-600">
                                        <Twitter className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-700">
                                        <Linkedin className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Contact Form */}
                        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {t?.contactTitle || 'We are always eager to hear from you'}
                                </h3>
                                <p className="text-slate-500 text-sm">
                                    {t?.contactSubtitle || 'Just write us a message'}
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <Input placeholder={t?.form?.name || "Name"} className="bg-white border-slate-200 rounded-xl h-12" />
                                <div className="flex gap-2">
                                    <div className="w-20 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-sm font-bold">
                                        +20
                                    </div>
                                    <Input placeholder={t?.form?.phone || "Mobile Number"} className="flex-1 bg-white border-slate-200 rounded-xl h-12" />
                                </div>
                                <Input placeholder={t?.form?.location || "Enter Location"} className="bg-white border-slate-200 rounded-xl h-12" />
                                <Textarea placeholder={t?.form?.message || "Message"} className="bg-white border-slate-200 rounded-xl min-h-[120px]" />
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl">
                                    {t?.form?.send || 'Send'}
                                </Button>
                            </form>
                        </div>

                        {/* Most Popular */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                {t?.mostPopular || 'Most Popular'}
                            </h3>
                            <div className="space-y-6">
                                {post.popularPosts.map((popular) => (
                                    <Link key={popular.id} href={`/${domain}/${locale}/blog/${popular.id}`} className="flex gap-4 group">
                                        <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={popular.image} alt={popular.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                                {popular.title}
                                            </h4>
                                            <p className="text-xs text-slate-500">{popular.date}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp */}
            <a
                href={`https://wa.me/${tenant.contactPhone?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50"
            >
                <MessageCircle className="w-8 h-8" />
            </a>
        </div>
    );
}
