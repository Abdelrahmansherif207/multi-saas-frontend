"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sparkle, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export function ClientReviews() {
    const reviews = [
        {
            id: 1,
            name: "Brittany Hawkins",
            role: "Service Executive",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            rating: 5,
            text: "Credibly actualize interoperable technology without ubiquitous schemas. Conveniently mesh team driven materials after media. Synergistically parallel task cross."
        },
        {
            id: 2,
            name: "James Anderson",
            role: "Product Manager",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            rating: 5,
            text: "Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar."
        },
        {
            id: 3,
            name: "Sarah Jenkins",
            role: "UX Designer",
            image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
            rating: 5,
            text: "Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas."
        }
    ];

    // Decorative floating avatars (static subset or extra demo images)
    const floatingAvatars = [
        { src: "https://i.pravatar.cc/150?u=1", top: "10%", left: "10%", size: "w-12 h-12 md:w-16 md:h-16" },
        { src: "https://i.pravatar.cc/150?u=2", top: "20%", right: "15%", size: "w-10 h-10 md:w-14 md:h-14" },
        { src: "https://i.pravatar.cc/150?u=3", bottom: "20%", left: "12%", size: "w-14 h-14 md:w-20 md:h-20" },
        { src: "https://i.pravatar.cc/150?u=4", bottom: "15%", right: "12%", size: "w-12 h-12 md:w-16 md:h-16" },
        { src: "https://i.pravatar.cc/150?u=5", top: "50%", left: "5%", size: "w-12 h-12 hidden lg:block" },
        { src: "https://i.pravatar.cc/150?u=6", top: "40%", right: "5%", size: "w-14 h-14 hidden lg:block" },
    ];

    return (
        <section className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden bg-background/50">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="relative inline-block">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Our <span className="text-brand-orange">Clients Review</span>
                    </h2>
                    <Sparkle className="absolute -top-6 -right-8 w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                    <Sparkle className="absolute -bottom-2 -left-8 w-5 h-5 text-brand-orange/40 fill-brand-orange/40 animate-spin-slow" />
                </div>
            </div>

            {/* Content Container */}
            <div className="relative max-w-4xl mx-auto min-h-[400px] flex items-center justify-center">

                {/* Floating Avatars (Decorative) */}
                {floatingAvatars.map((avatar, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-lg ${avatar.size} animate-float`}
                        style={{
                            top: avatar.top,
                            left: avatar.left,
                            right: avatar.right,
                            bottom: avatar.bottom,
                            animationDelay: `${i * 0.5}s`
                        }}
                    >
                        <Image
                            src={avatar.src}
                            alt="User"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                ))}

                {/* Decorative Stars */}
                <Sparkle className="absolute top-1/4 left-1/3 w-4 h-4 text-brand-orange animate-pulse delay-100" />
                <Sparkle className="absolute bottom-1/3 right-1/4 w-6 h-6 text-brand-orange animate-pulse delay-300" />


                {/* Main Carousel */}
                <div className="w-full max-w-lg relative z-10">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            enabled: true,
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-brand-orange',
                        }}
                        loop={true}
                        className="pb-12"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id}>
                                <div className="flex flex-col items-center text-center p-6">
                                    {/* Main Reviewer Image */}
                                    <div className="w-24 h-24 rounded-full border-4 border-background shadow-xl mb-6 overflow-hidden relative">
                                        <Image
                                            src={review.image}
                                            alt={review.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-xl font-bold mb-1">{review.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4">{review.role}</p>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                                        ))}
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed italic">
                                        &quot;{review.text}&quot;
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination Styles Override */}
                    <style jsx global>{`
                        .swiper-pagination-bullet-active {
                            background-color: var(--brand-orange) !important;
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
}
