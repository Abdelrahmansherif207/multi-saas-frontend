"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Users, TreePine, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TenantConfig } from '../types';

export const AreaPage: React.FC<{ tenant: TenantConfig; slug: string }> = ({ tenant, slug }) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const areaName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="min-h-screen bg-slate-50" />;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        alt={areaName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <nav className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-6 uppercase tracking-wider">
                            <span>Home</span>
                            <ArrowRight className="w-3 h-3" />
                            <span>Areas</span>
                            <ArrowRight className="w-3 h-3" />
                            <span className="text-white">{areaName}</span>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Explore {areaName}
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Discover the best properties, amenities, and lifestyle in {areaName}.
                            Your journey to finding the perfect home starts here.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">About the Area</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                                <p>
                                    {areaName} is one of the most prestigious and rapidly developing areas,
                                    offering a unique blend of luxury, comfort, and modern infrastructure.
                                    Whether you're looking for a family home or a strategic investment,
                                    this area provides unparalleled opportunities.
                                </p>
                                <p>
                                    The neighborhood is characterized by its wide boulevards, extensive
                                    greenery, and a wide range of services including top-tier schools,
                                    medical facilities, and entertainment centers.
                                </p>
                            </div>
                        </motion.div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: Building2, title: 'Real Estate', desc: 'Diverse range of residential and commercial properties.' },
                                { icon: TreePine, title: 'Environment', desc: 'Abundant green spaces and sustainable urban planning.' },
                                { icon: Users, title: 'Community', desc: 'A vibrant and diverse community of professionals and families.' },
                                { icon: MapPin, title: 'Connectivity', desc: 'Excellent transport links to major city centers.' },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4"
                                >
                                    <div className="p-3 bg-blue-50 rounded-xl h-fit">
                                        <feature.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 text-white p-8 rounded-3xl"
                        >
                            <h3 className="text-xl font-bold mb-4">Area Statistics</h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Available Units', value: '1,240' },
                                    { label: 'Average Price', value: '$450k' },
                                    { label: 'Growth Rate', value: '+12.5%' },
                                    { label: 'Safety Rating', value: '9.8/10' },
                                ].map((stat, index) => (
                                    <div key={index} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                        <span className="text-slate-400 text-sm">{stat.label}</span>
                                        <span className="font-bold">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};
