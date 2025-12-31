"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '../types';
import { Heart, Link as LinkIcon, Share2, MessageCircle, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useComparisonStore } from '../stores/useComparisonStore';

interface PropertyListCardProps {
    property: Property;
}

export function PropertyListCard({ property }: PropertyListCardProps) {
    const t = useTranslations('PropertyCard');
    const [mounted, setMounted] = useState(false);
    const [isLiked, setLiked] = useState(false);
    const { addItem, removeItem, isInComparison, canAddMore } = useComparisonStore();

    // Only access store values after mounting to avoid hydration mismatch
    const isSelected = mounted ? isInComparison(property.id) : false;
    const canSelect = mounted ? (canAddMore() || isSelected) : true;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCompareClick = () => {
        if (isSelected) {
            removeItem(property.id);
        } else if (canAddMore()) {
            addItem(property);
        }
    };

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
                    <button
                        onClick={handleCompareClick}
                        disabled={!canSelect}
                        className={`backdrop-blur-sm p-2 rounded-lg transition-all shadow-sm flex items-center gap-1 ${isSelected
                            ? 'bg-primary text-white'
                            : canSelect
                                ? 'bg-white/90 text-gray-700 hover:bg-white'
                                : 'bg-gray-200/90 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isSelected && <Check size={14} />}
                        <span className="text-xs font-bold px-1">{t('compare')}</span>
                    </button>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/properties/${property.slug}`);
                            const toast = document.createElement('div');
                            toast.textContent = 'Link copied!';
                            toast.className = 'fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4';
                            document.body.appendChild(toast);
                            setTimeout(() => toast.remove(), 2000);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-gray-700 hover:bg-white transition-colors shadow-sm active:scale-95"
                    >
                        <LinkIcon size={16} />
                    </button>
                    <button
                        onClick={() => setLiked(!isLiked)}
                        className={`bg-white/90 backdrop-blur-sm p-2 rounded-lg transition-colors shadow-sm active:scale-95 ${isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-white'}`}
                    >
                        <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
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
                <button className="absolute bottom-6 right-6 bg-[#25D366] p-2 rounded-full text-white hover:scale-110 transition-transform shadow-md hover:shadow-lg">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
}
