"use client";

import { motion } from 'framer-motion';
import { ExpertAdviceFormProps } from '../types';

export function ExpertAdviceForm({
    title = 'Need Expert Advice?',
    subtitle = 'Fill out the form and one of our property consultants will contact you.',
}: ExpertAdviceFormProps) {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-slate-50 rounded-[3rem] p-8 md:p-12 overflow-hidden border border-gray-100 shadow-sm"
                >
                    {/* Header Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="text-sky-900">
                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                {/* <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25" /> */}
                            </svg>
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-sky-900 mb-4 tracking-tight">
                            {title}
                        </h2>
                        <p className="text-sky-800 max-w-md mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    <form className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Name <span className="text-orange-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                required
                            />
                        </div>

                        {/* Location Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Location <span className="text-orange-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm appearance-none cursor-pointer"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" disabled>Preferred Location</option>
                                    <option value="cairo">Cairo</option>
                                    <option value="giza">Giza</option>
                                    <option value="alexandria">Alexandria</option>
                                    <option value="new-capital">New Capital</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Phone <span className="text-orange-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <div className="w-24 px-4 py-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
                                    <span className="mr-2">🇪🇬</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="flex-1 px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                placeholder="Your message"
                                rows={4}
                                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Submit
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
