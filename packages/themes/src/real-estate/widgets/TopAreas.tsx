"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { TopAreasProps } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const TopAreas: React.FC<TopAreasProps> = ({
    title,
    subtitle,
    areas,
    layout = 'grid'
}) => {
    const t = useTranslations('TopAreas');
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto h-[400px]" />;
    }
    const renderAreaCard = (area: any, index: number) => (
        <motion.div
            key={area.id}
            variants={itemVariants}
            className="group relative bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer h-full"
        >
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-background shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-center">
                {area.name}
            </h3>
            {area.count !== undefined && (
                <span className="text-sm text-muted-foreground mt-1">
                    {t('resultsAvailable', { count: area.count })}
                </span>
            )}
        </motion.div>
    );

    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{title || t('title')}</h2>
                {subtitle && (
                    <p className="text-muted-foreground mt-3 text-lg">{subtitle}</p>
                )}
            </motion.div>

            {layout === 'grid' ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {areas.map((area: any, index: number) => renderAreaCard(area, index))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="pb-12 !overflow-visible"
                    >
                        {areas.map((area: any, index: number) => (
                            <SwiperSlide key={area.id}>
                                {renderAreaCard(area, index)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            )}
        </section>
    );
};
