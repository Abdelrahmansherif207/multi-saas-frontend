'use client';

import { useState } from 'react';
import { ImageIcon, Map, MapPin } from 'lucide-react';
import { DetailsSidebar } from './DetailsSidebar';

interface PropertyDetailsActionsProps {
    images: string[];
    location: { lat: number; lng: number; address: string };
    masterPlan?: string;
    translations: {
        title: string;
        gallery: string;
        map: string;
        masterPlan: string;
    };
}

export function PropertyDetailsActions({
    images,
    location,
    masterPlan,
    translations,
}: PropertyDetailsActionsProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'gallery' | 'map' | 'master-plan' | null>(null);

    const handleActionClick = (tab: 'gallery' | 'map' | 'master-plan') => {
        setActiveTab(tab);
        setSidebarOpen(true);
    };

    const actions = [
        {
            id: 'gallery',
            label: translations.gallery,
            icon: ImageIcon,
            onClick: () => handleActionClick('gallery'),
        },
        {
            id: 'map',
            label: translations.map,
            icon: MapPin,
            onClick: () => handleActionClick('map'),
        },
        {
            id: 'master-plan',
            label: translations.masterPlan,
            icon: Map,
            onClick: () => handleActionClick('master-plan'),
        },
    ] as const;

    return (
        <>
            <div className="py-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{translations.title}</h2>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {actions.map((action) => (
                        <button
                            key={action.id}
                            onClick={action.onClick}
                            className="flex flex-col items-center justify-center w-32 h-24 bg-white border border-border/40 rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                        >
                            <action.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                {action.label}
                            </span>
                        </button>
                    ))}
                </div>

                <DetailsSidebar
                    isOpen={sidebarOpen}
                    onOpenChange={setSidebarOpen}
                    activeTab={activeTab}
                    content={{
                        images,
                        location,
                        masterPlan,
                    }}
                    titles={{
                        gallery: translations.gallery,
                        map: translations.map,
                        masterPlan: translations.masterPlan,
                    }}
                />
            </div>
            <hr className="my-4 border-t border-primary/10" />
        </>
    );
}
