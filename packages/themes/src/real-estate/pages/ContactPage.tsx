"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TenantConfig } from '../types';

interface ContactPageProps {
    tenant: TenantConfig;
}

export function ContactPage({ tenant }: ContactPageProps) {
    const t = useTranslations('Contact');

    return (
        <div className="min-h-screen bg-white">
            {/* Banner Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
                    alt="Contact Us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            {t('title')}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Info Column */}
                    <div className="flex-1 lg:pt-32">
                        <div className="space-y-12">
                            {/* Address */}
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                    <MapPin className="text-slate-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('address')}</h3>
                                    <p className="text-slate-500 whitespace-pre-line leading-relaxed">
                                        {t('addressDetail')}
                                    </p>
                                </div>
                            </div>

                            {/* Contacts */}
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                    <Phone className="text-slate-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contacts')}</h3>
                                    <div className="space-y-1">
                                        <p className="text-slate-500">{t('phone')}</p>
                                        <p className="text-slate-500">Hotline: {t('hotline')}</p>
                                        <p className="text-slate-500">{t('email')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                    <Clock className="text-slate-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t('workingHours')}</h3>
                                    <p className="text-slate-500 whitespace-pre-line">
                                        {t('workingHoursDetail')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="w-full lg:w-[500px] shrink-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-white"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-black text-sky-900 mb-3">
                                    {t('form.title')}
                                </h2>
                                <p className="text-sm text-sky-800 leading-relaxed">
                                    {t('form.subtitle')}
                                </p>
                            </div>

                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder={t('form.name')}
                                    className="w-full px-6 py-4 bg-white border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                    required
                                />
                                <div className="relative">
                                    <select
                                        className="w-full px-6 py-4 bg-white border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm appearance-none cursor-pointer text-gray-500"
                                        required
                                        defaultValue=""
                                    >
                                        <option value="" disabled>{t('form.location')}</option>
                                        <option value="cairo">Cairo</option>
                                        <option value="giza">Giza</option>
                                        <option value="alexandria">Alexandria</option>
                                        <option value="new-capital">New Capital</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-20 px-3 py-4 bg-white border border-transparent rounded-xl flex items-center justify-center shadow-sm">
                                        <span className="mr-1">🇪🇬</span>
                                        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder={t('form.phone')}
                                        className="flex-1 px-6 py-4 bg-white border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                        required
                                    />
                                </div>
                                <textarea
                                    placeholder={t('form.message')}
                                    rows={3}
                                    className="w-full px-6 py-4 bg-white border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm resize-none"
                                />
                                <button className="w-full py-4 bg-[#1e3a5a] text-white font-bold rounded-xl shadow-lg hover:bg-[#162a41] transition-all mt-2">
                                    {t('form.submit')}
                                </button>
                            </form>

                            <div className="mt-10 text-center">
                                <p className="text-sm font-bold text-sky-900 mb-4">{t('form.downloadApp')}</p>
                                <div className="flex justify-center gap-3">
                                    <button className="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
                                        <Smartphone size={16} className="text-slate-700" />
                                        <div className="text-left">
                                            <p className="text-[8px] text-gray-500 leading-none">Available on the</p>
                                            <p className="text-xs font-bold text-slate-900 leading-none">App Store</p>
                                        </div>
                                    </button>
                                    <button className="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
                                        <Smartphone size={16} className="text-slate-700" />
                                        <div className="text-left">
                                            <p className="text-[8px] text-gray-500 leading-none">Get it on</p>
                                            <p className="text-xs font-bold text-slate-900 leading-none">Google Play</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
