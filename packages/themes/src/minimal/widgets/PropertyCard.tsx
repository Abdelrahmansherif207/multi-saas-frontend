import Link from 'next/link';
import { PropertyCardProps } from '../../real-estate/types';

export function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link href={`/properties/${property.slug}`} className="group block border-2 border-black p-4 hover:bg-black hover:text-white transition-colors">
            <div className="aspect-square mb-4 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold truncate">{property.title}</h3>
                <span className="font-mono text-lg">
                    ${property.price.toLocaleString()}
                </span>
            </div>
            <p className="text-sm opacity-60 group-hover:opacity-100">
                {property.bedrooms} Bed / {property.bathrooms} Bath / {property.areaSqft} sqft
            </p>
        </Link>
    );
}
