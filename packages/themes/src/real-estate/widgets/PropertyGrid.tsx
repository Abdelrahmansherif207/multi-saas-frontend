import { PropertyCard } from './PropertyCard';
import { PropertyGridProps } from '../types';

export function PropertyGrid({ properties, columns = 3 }: PropertyGridProps) {
    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover our handpicked selection of premium properties available for sale and rent
                    </p>
                </div>

                <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                {properties.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No properties found.
                    </div>
                )}
            </div>
        </section>
    );
}
