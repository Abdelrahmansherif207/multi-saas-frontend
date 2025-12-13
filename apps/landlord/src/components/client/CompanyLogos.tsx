"use client";

import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export function CompanyLogos() {
    const logos = [
        {
            name: "LOGOHYPE",
            icon: (
                <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M10 5L20 10L10 15L0 10L10 5Z" fill="currentColor" fillOpacity="0.8" />
                    <rect x="2" y="12" width="16" height="4" rx="2" fill="currentColor" className="text-primary" />
                    <text x="25" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="currentColor">LOGOHYPE</text>
                </svg>
            ),
        },
        {
            name: "LOGOTYPE",
            icon: (
                <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M10 25C4.47715 25 0 20.5228 0 15C0 9.47715 4.47715 5 10 5" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <circle cx="10" cy="15" r="4" fill="currentColor" fillOpacity="0.5" />
                    <text x="25" y="20" fontFamily="serif" fontWeight="bold" fontSize="14" fill="currentColor">LOGOTYPE</text>
                    <text x="25" y="28" fontFamily="sans-serif" fontSize="4" fill="currentColor" fillOpacity="0.6">Tagline Here</text>
                </svg>
            ),
        },
        {
            name: "LOGOMAKERS",
            icon: (
                <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="10" cy="15" r="8" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <path d="M10 10L14 18H6L10 10Z" fill="currentColor" />
                    <text x="25" y="20" fontFamily="sans-serif" fontWeight="300" fontSize="14" fill="currentColor">LOGOMAKERS</text>
                </svg>
            ),
        },
        {
            name: "LOGO BUSINESS",
            icon: (
                <svg viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="0" y="5" width="20" height="20" rx="4" fill="currentColor" className="text-primary" />
                    <text x="25" y="18" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="currentColor">LOGO</text>
                    <text x="25" y="28" fontFamily="sans-serif" fontWeight="bold" fontSize="5" letterSpacing="1" fill="currentColor" className="text-primary">BUSINESS SOLUTIONS</text>
                </svg>
            ),
        },
        {
            name: "LOGO GRAPHIC",
            icon: (
                <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M10 5L18 25H2L10 5Z" fill="currentColor" className="text-primary" />
                    <path d="M10 25L2 5H18L10 25Z" fill="currentColor" fillOpacity="0.3" />
                    <text x="25" y="18" fontFamily="cursive" fontWeight="bold" fontSize="14" fill="currentColor">LOGO</text>
                    <text x="25" y="26" fontFamily="sans-serif" fontSize="5" fill="currentColor" fillOpacity="0.6">Graphic Design</text>
                </svg>
            ),
        }
    ];

    // Duplicate logos to ensure enough slides for infinite loop
    const displayLogos = [...logos, ...logos, ...logos];

    return (
        <section className="container mx-auto px-4 pb-12">
            <div className="bg-card/50 border border-border/50 rounded-2xl shadow-lg p-8 md:p-12">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={2}
                    loop={true}
                    speed={2000}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                    {displayLogos.map((logo, index) => (
                        <SwiperSlide key={`${logo.name}-${index}`}>
                            <div className="w-full h-12 md:h-16 flex items-center justify-center text-foreground hover:scale-105 transition-transform duration-300 cursor-pointer">
                                {logo.icon}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
