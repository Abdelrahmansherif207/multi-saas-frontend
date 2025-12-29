"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { PropertyCard } from './PropertyCard';
import { PropertyGridProps } from '../types';

import 'swiper/css';
import 'swiper/css/navigation';

export function PropertyGrid({ properties, columns = 3 }: PropertyGridProps) {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="py-16 bg-slate-50 group/section">
            <div className="container mx-auto px-4 relative">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Discover our handpicked selection of premium properties
                        </p>
                    </div>

                    <Link href="/properties" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
                        Explore All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        loop={true}
                        className="!pb-10 !px-1"
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >
                        {properties.map((property) => (
                            <SwiperSlide key={property.id} className="h-auto">
                                <PropertyCard property={property} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary transition-all opacity-0 group-hover/section:opacity-100 translate-x-4 group-hover/section:translate-x-0 shadow-lg"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary transition-all opacity-0 group-hover/section:opacity-100 -translate-x-4 group-hover/section:translate-x-0 shadow-lg"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                {properties.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No properties found.
                    </div>
                )}

                <div className="md:hidden mt-8 text-center">
                    <Link href="/properties" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                        Explore All Properties
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
