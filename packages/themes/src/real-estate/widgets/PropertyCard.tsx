import Link from 'next/link';
import { motion } from 'framer-motion';
import { PropertyCardProps } from '../types';

export function PropertyCard({ property }: PropertyCardProps) {
    const formatPrice = (price: number, type: 'sale' | 'rent') => {
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price);
        return type === 'rent' ? `${formatted}/mo` : formatted;
    };

    return (
        <motion.div whileHover={{ y: -10 }} className="h-full">
            <Link href={`/properties/${property.slug}`} className="group/card block h-full">
                <div className="bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-500"
                        />

                        {/* Shutter Overlay */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-black/40 -translate-y-full transition-transform duration-500 group-hover/card:translate-y-0 z-10" />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/40 translate-y-full transition-transform duration-500 group-hover/card:translate-y-0 z-10" />

                        {/* View Details Badge */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 z-20">
                            <span className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg transform scale-90 transition-transform duration-300 group-hover/card:scale-100">
                                View Details
                            </span>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3 z-30">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${property.status === 'available'
                                ? 'bg-primary text-primary-foreground'
                                : property.status === 'pending'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-red-500 text-white'
                                }`}>
                                {property.status === 'available' ? 'For ' + (property.priceType === 'sale' ? 'Sale' : 'Rent') : property.status}
                            </span>
                        </div>
                        {/* Price Badge */}
                        <div className="absolute bottom-3 right-3 z-30">
                            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm font-bold">
                                {formatPrice(property.price, property.priceType)}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col">
                        <h3 className="font-semibold text-lg text-foreground group-hover/card:text-primary transition-colors line-clamp-1">
                            {property.title}
                        </h3>

                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {property.city}
                        </p>

                        {/* Specs */}
                        <div className="flex items-center gap-4 pt-3 border-t text-sm text-muted-foreground mt-auto">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {property.bedrooms} Beds
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                                {property.bathrooms} Baths
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                {property.areaSqft.toLocaleString()} sqft
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
