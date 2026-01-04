"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Users, TreePine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TenantConfig } from '../../real-estate/types';

export const AreaPage: React.FC<{ tenant: TenantConfig; slug: string }> = ({ tenant, slug }) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const t = useTranslations('TopAreas');
    const areaName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="min-h-screen bg-background" />;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        alt={areaName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                </motion.div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-white/70 uppercase tracking-[0.3em] text-sm mb-4 block">Discover Area</span>
                        <h1 className="text-5xl md:text-7xl font-light text-white uppercase tracking-widest mb-6">
                            {areaName}
                        </h1>
                        <div className="w-24 h-px bg-white/30 mx-auto" />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Building2, label: 'Properties', value: '1,240+' },
                        { icon: Users, label: 'Population', value: '85k+' },
                        { icon: TreePine, label: 'Parks', value: '12' },
                        { icon: MapPin, label: 'Location', value: 'East Cairo' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center space-y-2"
                        >
                            <stat.icon className="w-6 h-6 mx-auto text-muted-foreground opacity-50" />
                            <div className="text-2xl font-light tracking-tight">{stat.value}</div>
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto border-t border-foreground/5">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="space-y-6">
                        <h2 className="text-3xl font-light uppercase tracking-widest text-center">About {areaName}</h2>
                        <p className="text-muted-foreground leading-relaxed text-center font-light text-lg">
                            {areaName} represents the pinnacle of modern urban living. Known for its meticulously planned
                            infrastructure, lush green spaces, and world-class amenities, it has become one of the
                            most sought-after residential and commercial hubs in the region.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 pt-12">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase tracking-widest">Lifestyle</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                Experience a lifestyle defined by convenience and luxury. From high-end shopping malls
                                to cozy cafes and international schools, everything you need is within reach.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase tracking-widest">Investment</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                With consistent growth and high demand, {areaName} offers exceptional investment
                                opportunities for both residential and commercial real estate.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};
