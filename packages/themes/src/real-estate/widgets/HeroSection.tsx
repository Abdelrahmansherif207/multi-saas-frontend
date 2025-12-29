"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { HeroSectionProps } from '../types';
import { HeroSearchFilters } from './HeroSearchFilters';

import 'swiper/css';
import 'swiper/css/effect-fade';

export function HeroSection({ title, subtitle, backgroundImage, images = [], translations }: HeroSectionProps) {
    const [activeTab, setActiveTab] = useState<'compounds' | 'properties'>('compounds');

    // Fallback to single image if array is empty
    const bgImages = images.length > 0 ? images : [backgroundImage || ''];

    // Default translations fallback
    const t = translations || {
        title: title,
        subtitle: subtitle,
        tabs: { compounds: 'Compounds', properties: 'Properties' },
        searchPlaceholder: 'Area, Compound, Real Estate Developer',
        filters: { propertyType: 'Property Types', bedsBaths: 'Beds and Baths', priceRange: 'Price Range' },
        searchButton: 'Search'
    };

    return (
        <div className="relative w-full flex flex-col">
            {/* Upper Hero Area - Fixed Height */}
            <div className="relative h-[600px] w-full bg-gray-900">
                {/* Background Slider */}
                <div className="absolute inset-0 z-0">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        speed={1500}
                        autoplay={{ delay: 7000, disableOnInteraction: false }}
                        className="h-full w-full"
                    >
                        {bgImages.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div
                                    className="h-full w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${img})` }}
                                >
                                    <div className="absolute inset-0 bg-black/60" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Content Overlay - Centered in the Hero Area */}
                <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-white max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">{t.title}</h1>
                        <p className="text-lg md:text-2xl font-light opacity-90 drop-shadow-md">{t.subtitle}</p>
                    </motion.div>
                </div>
            </div>

            {/* Search Card Container - Overlapping */}
            <div className="relative z-20 container mx-auto px-4 -mt-32 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100"
                >
                    {/* Tabs */}
                    <div className="flex w-full mb-8 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('compounds')}
                            className={`flex-1 pb-4 text-center font-bold text-lg transition-colors relative ${activeTab === 'compounds'
                                ? 'text-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {t.tabs.compounds}
                            {activeTab === 'compounds' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-primary rounded-t-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`flex-1 pb-4 text-center font-bold text-lg transition-colors relative ${activeTab === 'properties'
                                ? 'text-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {t.tabs.properties}
                            {activeTab === 'properties' && (
                                <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-primary rounded-t-full" />
                            )}
                        </button>
                    </div>

                    {/* Search Forms */}
                    <div className="flex flex-col gap-6">
                        {/* Main Search Input */}
                        <div className="relative w-full">
                            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                className="w-full rounded-lg border border-gray-300 pl-16 pr-6 py-5 text-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Filters Grid */}
                        <HeroSearchFilters translations={t} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
