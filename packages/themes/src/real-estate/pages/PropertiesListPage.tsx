import { TenantConfig } from '../types';

interface PropertiesListPageProps {
    tenant: TenantConfig;
}

export function PropertiesListPage({ tenant }: PropertiesListPageProps) {
    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-8">Properties List</h1>
            <p className="text-gray-600 mb-4">
                This is the dynamic Properties List Page for the {tenant.name} theme.
            </p>
            <div className="p-8 border rounded-xl bg-gray-50">
                <p>Features to be implemented:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Advanced Filter Sidebar</li>
                    <li>Property Grid with Pagination</li>
                    <li>Map View Integration</li>
                </ul>
            </div>
        </div>
    );
}
