"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '../types';
import { Heart, Link as LinkIcon, Share2, MessageCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';

interface PropertyListCardProps {
    property: Property;
}

export function PropertyListCard({ property }: PropertyListCardProps) {
    const t = useTranslations('PropertyCard');
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row h-full md:h-[280px]"
        >
            {/* Image Section */}
            <div className="relative w-full md:w-[380px] h-[240px] md:h-full overflow-hidden shrink-0">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-gray-700 hover:bg-white transition-colors shadow-sm">
                        <span className="text-xs font-bold px-1">{t('compare')}</span>
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-gray-700 hover:bg-white transition-colors shadow-sm">
                        <LinkIcon size={16} />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-gray-700 hover:bg-white transition-colors shadow-sm">
                        <Heart size={16} />
                    </button>
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                        {property.priceType === 'sale' ? t('forSale') : t('forRent')}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col justify-between relative">
                <div>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {property.city}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors text-start">
                        <Link href={`/properties/${property.slug}`}>{property.title}</Link>
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 text-start">
                        {property.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">Villa</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">Apartment</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">Twinhouse</span>
                        <span className="text-primary text-xs font-bold">+1 More</span>
                    </div>
                </div>

                <div className="flex items-end justify-between border-t pt-4">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">{t('developerPrice')}</p>
                            <p className="text-lg font-bold text-gray-900">
                                <span className="text-xs font-medium mr-1">EGP</span>
                                {property.price.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">{t('resalePrice')}</p>
                            <p className="text-sm font-medium text-gray-400">{t('noUnits')}</p>
                        </div>
                    </div>

                </div>

                {/* WhatsApp Button */}
                <button className="absolute bottom-6 right-6 text-[#25D366] hover:scale-110 transition-transform">
                    <MessageCircle size={24} fill="currentColor" />
                </button>
            </div>
        </motion.div>
    );
}
