import Link from 'next/link';
import { HeroSectionProps } from '../types';

export function HeroSection({
    title,
    subtitle,
    backgroundImage,
    ctaText = 'View Properties',
    ctaLink = '/properties'
}: HeroSectionProps) {
    return (
        <section
            className="relative min-h-[600px] flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {title}
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                    {subtitle}
                </p>

                {/* Search Form */}
                <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur rounded-lg p-4 md:p-6 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 text-left block">Location</label>
                            <input
                                type="text"
                                placeholder="Enter city or area"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 text-left block">Property Type</label>
                            <select className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50">
                                <option value="">All Types</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 text-left block">Price Range</label>
                            <select className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50">
                                <option value="">Any Price</option>
                                <option value="0-100000">$0 - $100,000</option>
                                <option value="100000-300000">$100,000 - $300,000</option>
                                <option value="300000-500000">$300,000 - $500,000</option>
                                <option value="500000+">$500,000+</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* CTA Link */}
                <Link
                    href={ctaLink}
                    className="inline-block mt-8 text-white/80 hover:text-white transition-colors underline underline-offset-4"
                >
                    {ctaText} →
                </Link>
            </div>
        </section>
    );
}
