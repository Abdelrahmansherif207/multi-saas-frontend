"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property } from '../types';

const MAX_COMPARISON_ITEMS = 4;

interface ComparisonState {
    items: Property[];
    addItem: (property: Property) => void;
    removeItem: (propertyId: string) => void;
    clearAll: () => void;
    isInComparison: (propertyId: string) => boolean;
    canAddMore: () => boolean;
}

export const useComparisonStore = create<ComparisonState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (property: Property) => {
                const { items } = get();
                if (items.length >= MAX_COMPARISON_ITEMS) return;
                if (items.some(item => item.id === property.id)) return;

                set({ items: [...items, property] });
            },

            removeItem: (propertyId: string) => {
                set(state => ({
                    items: state.items.filter(item => item.id !== propertyId)
                }));
            },

            clearAll: () => {
                set({ items: [] });
            },

            isInComparison: (propertyId: string) => {
                return get().items.some(item => item.id === propertyId);
            },

            canAddMore: () => {
                return get().items.length < MAX_COMPARISON_ITEMS;
            },
        }),
        {
            name: 'property-comparison-storage',
        }
    )
);
