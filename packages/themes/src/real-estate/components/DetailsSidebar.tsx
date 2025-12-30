'use client';

import { useRef, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from './ui/sheet';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

interface DetailsSidebarProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    activeTab: 'gallery' | 'map' | 'master-plan' | null;
    content: {
        images: string[];
        location: { lat: number; lng: number; address: string };
        masterPlan?: string;
    };
    titles: {
        gallery: string;
        map: string;
        masterPlan: string;
    };
}

export function DetailsSidebar({
    isOpen,
    onOpenChange,
    activeTab,
    content,
    titles,
}: DetailsSidebarProps) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const getTitle = () => {
        switch (activeTab) {
            case 'gallery':
                return titles.gallery;
            case 'map':
                return titles.map;
            case 'master-plan':
                return titles.masterPlan;
            default:
                return '';
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl overflow-y-auto p-0">
                <div className="p-6 pb-0">
                    <SheetHeader className="mb-4">
                        <SheetTitle className="text-2xl font-bold text-foreground">
                            {getTitle()}
                        </SheetTitle>
                    </SheetHeader>
                </div>

                <div className="h-full px-6 pb-6">
                    {activeTab === 'gallery' && (
                        <div className="flex flex-col gap-4">
                            {/* Main Gallery */}
                            <div className="relative h-[55vh] w-full group/gallery rounded-2xl overflow-hidden bg-black/5">
                                <Swiper
                                    modules={[Navigation, Pagination, EffectFade, Thumbs]}
                                    effect="fade"
                                    fadeEffect={{ crossFade: true }}
                                    onBeforeInit={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    loop={false}
                                    className="h-full w-full"
                                >
                                    {content.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={image}
                                                    alt={`Gallery image ${index + 1}`}
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 100vw, 90vw"
                                                    loading={index === 0 ? 'eager' : 'lazy'}
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Custom Navigation Arrows - Large & Modern */}
                                <button
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-xl backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 -translate-x-4 group-hover/gallery:translate-x-0"
                                    aria-label="Previous slide"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                                </button>

                                <button
                                    onClick={() => swiperRef.current?.slideNext()}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-xl backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 translate-x-4 group-hover/gallery:translate-x-0"
                                    aria-label="Next slide"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </button>

                                {/* Image Counter Badge */}
                                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-full">
                                    {activeIndex + 1} / {content.images.length}
                                </div>
                            </div>

                            {/* Thumbnails Strip */}
                            <div className="w-full">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    modules={[Thumbs]}
                                    spaceBetween={12}
                                    slidesPerView="auto"
                                    watchSlidesProgress
                                    className="!overflow-visible"
                                >
                                    {content.images.map((image, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className="!w-20 !h-16 cursor-pointer"
                                            onClick={() => swiperRef.current?.slideTo(index)}
                                        >
                                            <div className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'opacity-60 hover:opacity-100'}`}>
                                                <Image
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    )}

                    {activeTab === 'map' && (
                        <div className="h-[70vh] w-full rounded-2xl overflow-hidden shadow-sm border border-border/40">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7290573.081198563!2d26.38029147573934!3d26.844717117183327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2sEgypt!5e0!3m2!1sen!2seg!4v1647879943245!5m2!1sen!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Property Location"
                            ></iframe>
                        </div>
                    )}

                    {activeTab === 'master-plan' && content.masterPlan && (
                        <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-muted/20">
                            <Image
                                src={content.masterPlan}
                                alt="Master Plan"
                                fill
                                className="object-contain"
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
