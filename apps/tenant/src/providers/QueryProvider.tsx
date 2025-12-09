'use client';

/**
 * React Query Provider for Client Components
 * 
 * This provider wraps the application to enable React Query hooks.
 * It creates a single QueryClient instance per browser session.
 */

import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { makeQueryClient } from '../lib/query-client';

/**
 * Browser-singleton query client
 * We need to store the client in state to avoid recreating it on every render
 */
function getQueryClient() {
    // For SSR, always create a new client
    if (typeof window === 'undefined') {
        return makeQueryClient();
    }
    // For browser, create only once
    return makeQueryClient();
}

interface QueryProviderProps {
    children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
    // Use useState to ensure the client is only created once per component lifecycle
    const [queryClient] = useState(() => getQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools only in development */}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}
