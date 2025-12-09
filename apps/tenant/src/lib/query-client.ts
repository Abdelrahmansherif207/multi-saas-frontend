/**
 * React Query (TanStack Query) Configuration for Next.js App Router
 * 
 * IMPORTANT: We are using Next.js App Router with Server Components.
 * React Query should be used strategically, not as a replacement for Server Components.
 * 
 * CORRECT USAGE PATTERN:
 * ==================
 * 
 * 1. PUBLIC TENANT PAGES (SEO-Critical):
 *    - Fetch data directly in Server Components (no React Query)
 *    - Use React Query ONLY in leaf Client Components for interactivity
 *    Example:
 *      // app/[domain]/page.tsx (Server Component)
 *      const products = await fetchProducts(); // Direct fetch
 *      return <ProductGrid products={products} />; // Pass as props
 * 
 * 2. ADMIN DASHBOARDS (Interactivity-Critical):
 *    - Use React Query at page level for full client-side data management
 *    - Leverage caching, refetching, and optimistic updates
 *    Example:
 *      // app/(dashboard)/tenants/page.tsx (Client Component)
 *      'use client';
 *      const { data } = useQuery({ queryKey: ['tenants'], queryFn: fetchTenants });
 * 
 * 3. OPTIONAL SSR PREFETCHING (Advanced):
 *    - For hybrid cases, prefetch in Server Components and hydrate in Client Components
 *    Example:
 *      // Server Component
 *      await queryClient.prefetchQuery({ queryKey: ['data'], queryFn: fetchData });
 *      return <HydrationBoundary state={dehydrate(queryClient)}>...</HydrationBoundary>;
 * 
 * QUERY CLIENT CONFIGURATION:
 * ==========================
 * - staleTime: Set above 0 for SSR to prevent immediate refetch on client hydration
 * - gcTime (formerly cacheTime): How long unused data stays in cache
 * - retry: Number of retry attempts for failed queries
 * - refetchOnWindowFocus: Useful for admin dashboards, disable for public pages
 * 
 * Reference: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
 */

import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Prevent immediate refetch after SSR hydration
                // Data fetched on server is considered fresh for 60 seconds
                staleTime: 60 * 1000, // 1 minute

                // How long inactive queries stay in cache before garbage collection
                gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)

                // Retry failed requests (useful for network issues)
                retry: 1,

                // Admin dashboards: true (keep data fresh when user returns)
                // Public pages: false (avoid unnecessary requests)
                refetchOnWindowFocus: false, // Set per-query or per-context as needed

                // Avoid refetching on component remount (good for modals, tabs)
                refetchOnMount: false,
            },
            mutations: {
                // Retry mutations once on failure (e.g., network hiccup)
                retry: 1,
            },
        },
    });
}

/**
 * CONTEXT-SPECIFIC CONFIGURATIONS:
 * 
 * For Admin Dashboard pages, override with more aggressive refetching:
 * ```
 * useQuery({
 *   queryKey: ['tenants'],
 *   queryFn: fetchTenants,
 *   staleTime: 30 * 1000, // 30 seconds
 *   refetchOnWindowFocus: true, // Keep admin data fresh
 * });
 * ```
 * 
 * For public tenant pages with Client Components:
 * ```
 * useQuery({
 *   queryKey: ['cart', userId],
 *   queryFn: fetchCart,
 *   staleTime: 5 * 60 * 1000, // 5 minutes
 *   refetchOnWindowFocus: false, // Avoid disrupting user experience
 * });
 * ```
 */
