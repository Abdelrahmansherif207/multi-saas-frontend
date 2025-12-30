'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Ensure we have at least one image
    if (!images || images.length === 0) {
        return (
            <div className="h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
            </div>
        );
    }

    return (
        <div
            className="flex gap-2 h-[400px] md:h-[500px] w-full"
            onMouseLeave={() => setActiveIndex(0)}
        >
            {images.map((image, index) => {
                const isActive = index === activeIndex;
                const isLast = index === images.length - 1;

                return (
                    <motion.div
                        key={index}
                        className="relative overflow-hidden rounded-xl cursor-pointer"
                        initial={false}
                        animate={{
                            flex: isActive ? 3.5 : 1,
                            filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)',
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 120,
                            damping: 20,
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        <Image
                            src={image}
                            alt={`Property image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            priority={index === 0}
                        />

                        {/* View All Photos overlay on last image */}
                        {isLast && !isActive && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mx-auto mb-2"
                                    >
                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                        <circle cx="9" cy="9" r="2" />
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
