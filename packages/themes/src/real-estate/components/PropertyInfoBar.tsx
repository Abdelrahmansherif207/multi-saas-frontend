'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, MessageCircle } from 'lucide-react';

interface PropertyInfoBarProps {
    logo?: string;
    title: string;
    location: string;
    propertyType: string;
    developerPrice?: number;
    resalePrice?: number;
    currency?: string;
    translations: {
        developerPrice: string;
        resalePrice: string;
        callUs: string;
        whatsapp: string;
    };
    phoneNumber?: string;
    whatsappNumber?: string;
}

export function PropertyInfoBar({
    logo,
    title,
    location,
    propertyType,
    developerPrice,
    resalePrice,
    currency = 'EGP',
    translations,
    phoneNumber,
    whatsappNumber,
}: PropertyInfoBarProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    const handleCallClick = () => {
        if (phoneNumber) {
            window.open(`tel:${phoneNumber}`, '_self');
        }
    };

    const handleWhatsAppClick = () => {
        if (whatsappNumber) {
            const message = encodeURIComponent(`Hi, I'm interested in ${title}`);
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-6 border-t border-b border-gray-200">
            {/* Left: Logo, Title, Badge */}
            <div className="flex items-center gap-4">
                {logo && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                        <Image
                            src={logo}
                            alt="Developer logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            {title}
                        </h1>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium">
                            {propertyType}
                        </Badge>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{location}</p>
                </div>
            </div>

            {/* Center: Prices */}
            <div className="flex items-center gap-8">
                {developerPrice !== undefined && (
                    <div>
                        <p className="text-sm text-gray-500">{translations.developerPrice}</p>
                        <p className="text-xl font-bold text-gray-900">
                            {formatPrice(developerPrice)} <span className="text-sm font-normal text-gray-500">{currency}</span>
                        </p>
                    </div>
                )}
                {resalePrice !== undefined && (
                    <div className="border-l border-gray-200 pl-8">
                        <p className="text-sm text-gray-500">{translations.resalePrice}</p>
                        <p className="text-xl font-bold text-gray-900">
                            {formatPrice(resalePrice)} <span className="text-sm font-normal text-gray-500">{currency}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleCallClick}
                >
                    <Phone className="w-4 h-4" />
                    {translations.callUs}
                </Button>
                <Button
                    className="gap-2 bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleWhatsAppClick}
                >
                    <MessageCircle className="w-4 h-4" />
                    {translations.whatsapp}
                </Button>
            </div>
        </div>
    );
}
