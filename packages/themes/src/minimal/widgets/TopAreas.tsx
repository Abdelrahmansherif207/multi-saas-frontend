"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { TopAreasProps } from '../../real-estate/types';

export const TopAreas: React.FC<TopAreasProps> = ({
    title,
    subtitle,
    areas
}) => {
    const t = useTranslations('TopAreas');
    const locale = useLocale();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const getDomain = () => {
        if (typeof window === 'undefined') return '';
        const parts = window.location.pathname.split('/');
        return parts[1] || '';
    };

    const slugify = (text: string) => {
        return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    };

    if (!isMounted) {
        return <div className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto h-[400px]" />;
    }
    const domain = getDomain();
    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="text-4xl font-light tracking-widest text-foreground uppercase">{title || t('title')}</h2>
                {subtitle && (
                    <p className="text-muted-foreground mt-4 text-sm uppercase tracking-widest opacity-70">{subtitle}</p>
                )}
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {areas.map((area: any, index: number) => (
                    <Link
                        key={area.id}
                        href={`/${domain}/${locale}/area/${slugify(area.name)}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group flex flex-col items-center cursor-pointer"
                        >
                            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                                <img
                                    src={area.image}
                                    alt={area.name}
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 border border-foreground/10 rounded-full group-hover:border-foreground/30 transition-colors" />
                            </div>
                            <h3 className="text-sm font-medium text-foreground text-center uppercase tracking-wider">
                                {area.name}
                            </h3>
                            {area.count !== undefined && (
                                <span className="text-[10px] text-muted-foreground mt-2 uppercase tracking-[0.2em] opacity-60">
                                    {t('listings', { count: area.count })}
                                </span>
                            )}
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
