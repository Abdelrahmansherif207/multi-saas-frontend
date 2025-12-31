"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useComparisonStore } from '../stores/useComparisonStore';
import { Button } from './ui/button';
import { X } from 'lucide-react';

export function ComparisonBanner() {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Comparison');
    const [mounted, setMounted] = useState(false);
    const { items, clearAll } = useComparisonStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleStartComparison = () => {
        // Extract base path (domain/locale) from current path
        // e.g., /agency/en/properties -> /agency/en
        const pathParts = pathname.split('/').filter(Boolean);
        const basePath = pathParts.length >= 2 ? `/${pathParts[0]}/${pathParts[1]}` : '';
        router.push(`${basePath}/compare`);
    };

    const handleCancel = () => {
        clearAll();
    };

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {items.length > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-50"
                >
                    <div className="bg-white border-t border-gray-200 shadow-lg shadow-black/10">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between gap-4">
                                {/* Count Display */}
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-gray-900">
                                        {items.length} {t('compounds')}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="px-6 py-2 font-bold"
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button
                                        onClick={handleStartComparison}
                                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 font-bold flex items-center gap-2"
                                    >
                                        {t('startComparison')}
                                        <span className="bg-white/20 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                            {items.length}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
