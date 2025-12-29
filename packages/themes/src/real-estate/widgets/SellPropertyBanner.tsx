"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SellPropertyBannerProps } from '../types';

export function SellPropertyBanner({
    title = 'Unlock the True Value of Your Property',
    subtitle = 'List with us and get access to thousands of potential buyers. Smart valuation, premium exposure, and hassle-free selling.',
    ctaText = 'Start Selling Today',
    ctaLink = '/list-property'
}: SellPropertyBannerProps) {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative bg-slate-50 rounded-[3rem] p-8 md:p-16 overflow-hidden border border-gray-100 shadow-lg">
                    <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
                        {/* Left Content (5 cols) */}
                        <div className="lg:col-span-6 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-semibold text-primary"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                #1 Real Estate Marketplace
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight"
                            >
                                Sell Your Home <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-600">
                                    Faster & Better
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-500 max-w-lg leading-relaxed"
                            >
                                {subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    href={ctaLink}
                                    className="px-8 py-4 text-lg font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                                >
                                    {ctaText}
                                </Link>
                                <Link
                                    href="/valuation"
                                    className="px-8 py-4 text-lg font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-1"
                                >
                                    Get Free Valuation
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Content (7 cols) - Floating Dashboard Composition */}
                        <div className="lg:col-span-6 relative h-[500px] hidden lg:block perspective-[1000px]">

                            {/* Main Dashboard Card */}
                            <motion.div
                                initial={{ opacity: 0, rotateX: 20, rotateY: -20, y: 50 }}
                                whileInView={{ opacity: 1, rotateX: 5, rotateY: -15, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute right-10 top-1/2 -translate-y-1/2 w-[450px] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100/50 z-20"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <div className="text-sm text-gray-400 font-medium">Property Value</div>
                                        <div className="text-3xl font-bold text-gray-900">$2,450,000</div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm font-bold flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                        +12.5%
                                    </div>
                                </div>

                                {/* Chart Placeholder (CSS Bars) */}
                                <div className="flex items-end gap-3 h-32 mb-6">
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} className="flex-1 bg-gray-50 rounded-t-lg relative group overflow-hidden">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                className={`w-full absolute bottom-0 rounded-t-lg ${i === 5 ? 'bg-primary' : 'bg-blue-100'}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Activity List */}
                                <div className="space-y-3">
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Recent Offers</div>
                                    {[
                                        { name: 'Sarah Wilson', price: '$2.4M', time: '2h ago' },
                                        { name: 'Michael Chen', price: '$2.35M', time: '5h ago' }
                                    ].map((offer, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {offer.name[0]}
                                                </div>
                                                <div className="text-sm font-bold text-gray-700">{offer.name}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-gray-900">{offer.price}</div>
                                                <div className="text-[10px] text-gray-400">{offer.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Floating Stats Card - Views */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="absolute top-20 right-[400px] w-48 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 z-30 transform hover:scale-105 transition-transform"
                            >
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">1,240</div>
                                <div className="text-sm text-gray-500 font-medium">Profile Views</div>
                            </motion.div>

                            {/* Floating Stats Card - Matches */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-20 right-0 w-48 bg-gray-900 p-5 rounded-2xl shadow-2xl z-30 transform hover:scale-105 transition-transform"
                            >
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">98%</div>
                                <div className="text-sm text-gray-400 font-medium">Match Rate</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
