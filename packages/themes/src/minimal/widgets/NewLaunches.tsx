"use client";

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { NewLaunchesProps } from '../../real-estate/types';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

export const NewLaunches: React.FC<NewLaunchesProps> = ({
    title,
    launches,
    showAllLink = "#"
}) => {
    const t = useTranslations('NewLaunches');
    const [isMounted, setIsMounted] = React.useState(false);
    const swiperRef = useRef<SwiperType | undefined>(undefined);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto h-[300px]" />;
    }

    if (!launches || launches.length === 0) return null;

    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative group/section">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    {title || t('title')}
                </h2>
                <a
                    href={showAllLink}
                    className="flex items-center gap-1 text-primary font-semibold hover:underline transition-all"
                >
                    {t('showAll')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
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
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {launches.map((launch: any) => (
                        <SwiperSlide key={launch.id}>
                            <a
                                href={launch.link || '#'}
                                className="group/card relative block h-[280px] w-full overflow-hidden rounded-xl cursor-pointer"
                            >
                                <img
                                    src={launch.image}
                                    alt={launch.title}
                                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    {launch.developer && (
                                        <span className="text-white/70 text-xs uppercase tracking-widest mb-2 block">
                                            {launch.developer}
                                        </span>
                                    )}
                                    <h3 className="text-white text-xl font-bold leading-tight">
                                        {launch.title}
                                    </h3>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Arrows */}
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary transition-all opacity-0 group-hover/section:opacity-100 translate-x-4 group-hover/section:translate-x-0"
                    aria-label="Previous slide"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary transition-all opacity-0 group-hover/section:opacity-100 -translate-x-4 group-hover/section:translate-x-0"
                    aria-label="Next slide"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};
