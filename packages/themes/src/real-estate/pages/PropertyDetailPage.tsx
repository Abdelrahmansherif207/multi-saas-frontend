import { TenantConfig } from '../types';

interface PropertyDetailPageProps {
    tenant: TenantConfig;
    slug: string;
}

export function PropertyDetailPage({ tenant, slug }: PropertyDetailPageProps) {
    // TODO: Use tenant config for styling/data
    console.log(tenant);
    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-8">Property Details</h1>
            <p className="text-gray-600 mb-4">
                Viewing property with slug: <span className="font-mono font-bold bg-gray-100 px-2 py-1 rounded">{slug}</span>
            </p>
            <div className="p-8 border rounded-xl bg-gray-50">
                <p>Section to be implemented:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Image Gallery</li>
                    <li>Property Features & Amenities</li>
                    <li>Agent Contact Form</li>
                    <li>Location Map</li>
                </ul>
            </div>
        </div>
    );
}
