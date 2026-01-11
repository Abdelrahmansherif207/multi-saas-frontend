"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Building2, Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { TenantConfig } from '../types';

export const AboutPage: React.FC<{ tenant: TenantConfig }> = ({ tenant }) => {
    const t = useTranslations('About');
    const menuT = useTranslations('Menu');

    const visionT = {
        title: t('vision.title'),
        description: t('vision.description')
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-slate-900/60" />
                </div>
                <div className="relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider"
                    >
                        {menuT('about')}
                    </motion.h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-sky-500 font-semibold uppercase tracking-wide text-sm">
                            {t('heroTitle')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                            {t('mainTitle')}
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                            <p>{t('description')}</p>
                            <p>{t('mission')}</p>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-sky-50 rounded-full text-sky-500">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{visionT.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {visionT.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
                                alt="Real Estate"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Floating Stats/Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
                        >
                            <div className="p-3 bg-slate-100 rounded-xl">
                                <Building2 className="w-6 h-6 text-slate-900" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">15000+</div>
                                <div className="text-sm text-slate-500">{t('stats.properties')}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
