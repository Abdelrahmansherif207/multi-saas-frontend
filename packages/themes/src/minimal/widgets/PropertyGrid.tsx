import { PropertyCard } from './PropertyCard';
import { PropertyGridProps } from '../../real-estate/types';

export function PropertyGrid({ properties }: PropertyGridProps) {
    return (
        <section className="py-20 container mx-auto px-4">
            <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
                <h2 className="text-4xl font-bold uppercase">Latest Listings</h2>
                <span>{properties.length} Items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </section>
    );
}
