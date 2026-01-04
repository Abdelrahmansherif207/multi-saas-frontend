"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Compound, TopCompoundsProps } from '../types';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';

import { useState, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';
import { useLocale } from 'next-intl';

function CompoundCard({ compound }: { compound: Compound }) {
    const locale = useLocale();
    const getDomain = () => {
        if (typeof window === 'undefined') return '';
        const parts = window.location.pathname.split('/');
        return parts[1] || '';
    };
    const domain = getDomain();

    return (
        <Link href={`/${domain}/${locale}/properties/${compound.slug}`}>
            <motion.div
                whileHover={{ y: -5 }}
                className="group/card relative h-[350px] w-full overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
            >
                {/* Image */}
                <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500"
                    style={{ backgroundImage: `url(${compound.image})` }}
                />

                {/* Shutter Overlay */}
                {/* Top Half */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/40 -translate-y-full transition-transform duration-500 group-hover/card:translate-y-0 z-10" />

                {/* Bottom Half */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/40 translate-y-full transition-transform duration-500 group-hover/card:translate-y-0 z-10" />

                {/* Permanent Gradient (for readability when not hovered) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />

                {/* Explore Badge - Centered */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 z-20">
                    <span className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg transform scale-90 transition-transform duration-300 group-hover/card:scale-100">
                        Explore
                    </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white z-20 transition-transform duration-300 group-hover/card:-translate-y-2">
                    <h3 className="text-xl font-bold mb-1 drop-shadow-md">{compound.title}</h3>
                    <p className="text-sm opacity-90 font-medium drop-shadow-sm">{compound.propertyCount} Properties</p>
                </div>
            </motion.div>
        </Link>
    );
}

export function TopCompounds({ compounds, title = 'Top Compounds', subtitle }: TopCompoundsProps) {
    const swiperRef = useRef<SwiperType | null>(null);

    if (!compounds || compounds.length === 0) return null;

    return (
        <section className="py-16 bg-white relative group/section">
            <div className="container mx-auto px-4 relative">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-500">{subtitle || `${compounds.length} Results Available`}</p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        className="!pb-10"
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                    >
                        {compounds.map((compound) => (
                            <SwiperSlide key={compound.id}>
                                <CompoundCard compound={compound} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary transition-all opacity-0 group-hover/section:opacity-100 translate-x-4 group-hover/section:translate-x-0"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary transition-all opacity-0 group-hover/section:opacity-100 -translate-x-4 group-hover/section:translate-x-0"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
