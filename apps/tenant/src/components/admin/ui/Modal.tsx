'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    footer?: React.ReactNode;
}

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    footer,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        if (!closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className={`
                    relative w-full ${sizeClasses[size]}
                    bg-white rounded-2xl
                    flex flex-col max-h-[90vh]
                    animate-in fade-in zoom-in-95 duration-200
                `}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-slate-200">
                    <div>
                        <h2 id="modal-title" className="text-xl font-bold text-slate-900">
                            {title}
                        </h2>
                        {description && (
                            <p className="mt-1 text-sm text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="p-2 -m-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    // Use portal to render modal at document root
    if (typeof window !== 'undefined') {
        return createPortal(modalContent, document.body);
    }

    return null;
}
