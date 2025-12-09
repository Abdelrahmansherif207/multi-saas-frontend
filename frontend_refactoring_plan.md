# Master Frontend Refactoring Plan: Laravel Multi-Tenant to Next.js Monorepo

**Status**: Final & Approved
**Architecture**: Headless (Laravel API + Next.js)
**Styling**: Bootstrap 5 (SCSS) + React-Bootstrap
**Render Strategy**: Server-First, Client-Leaf

---

## 1. Project Analysis & Migration Strategy
The current system is a monolithic Laravel application using `stancl/tenancy`. The frontend is tightly coupled with Blade templates and relies heavily on jQuery/Bootstrap.
*   **Total Modules**: 24 (Blog, Events, Products, etc.)
*   **Total Themes**: 15+ (Requiring dynamic CSS injection)
*   **User Roles**: Super Admin, Tenant Admin, End User (Customer)

**The Challenge**: Decoupling the view layer while preserving the 15+ unique themes without rewriting all HTML/CSS.
**The Solution**: A **Monorepo** containing two Next.js apps (`landlord`, `tenant`) sharing a `ui` library that wraps your existing Bootstrap styles.

---

## 2. Repository Structure (Turborepo)

We will use **pnpm workspaces** with **Turborepo** for build caching.

```text
root/
├── apps/
│   ├── landlord/              # The "Platform" App
│   │   ├── src/app/
│   │   │   ├── (marketing)/   # www.yoursaas.com (Public)
│   │   │   ├── (dashboard)/   # admin.yoursaas.com (Super Admin)
│   │   │   └── api/auth/      # NextAuth or Auth Proxy
│   │   └── ...
│   │
│   └── tenant/                # The "Customer" App
│       ├── src/app/
│       │   ├── [domain]/      # Public Tenant Sites (RSC + SEO)
│       │   │   ├── layout.tsx # Dynamic <link rel="stylesheet">
│       │   │   └── page.tsx   # Page Builder Logic
│       │   └── (admin)/       # dashboard.tenant.com (Client Dashboard)
│       ├── middleware.ts      # Subdomain Rewrite Logic
│       └── ...
│
├── packages/
│   ├── ui/                    # Shared Bootstrap Components
│   │   ├── src/
│   │   │   ├── Button.tsx     # "use client" wrapper for react-bootstrap
│   │   │   ├── Modal.tsx
│   │   │   └── Form.tsx
│   │   └── package.json
│   │
│   ├── api-client/            # Typed Axios/Fetch Wrapper
│   │   └── src/index.ts       # Shared types from Laravel
│   │
│   └── styles/                # Your LEGACY CSS Assets
│       ├── global.scss
│       ├── themes/            # Copied from core/public/assets/themes
│       └── landing.css        # Copied from core/public/landlord
│
└── turbo.json
```

---

## 3. Data & Rendering Architecture (The "Golden Rule")

We strictly follow the **Server-First** approach to ensure SEO for tenants.

### A. Public Tenant Pages (`apps/tenant/app/[domain]`)
**Goal**: SEO perfection. ZERO client-side data fetching for initial load.

*   **Implementation**:
    1.  **Middleware** determines the `tenant_id` from the subdomain/custom domain.
    2.  `layout.tsx` fetches logic: "Which theme is this tenant using?" -> Injects `<link href="/themes/wedding.css" />`.
    3.  `page.tsx` fetches logic: "What widgets are on the homepage?" -> Renders the HTML grid.
    4.  **Interactivity**: Using "Leaf Client Components".
        *   Example: The `ProductCard` is server rendered (HTML), but the `AddToCartButton` inside it is a Client Component.

### B. Admin Dashboards (`apps/landlord/(dashboard)` & `apps/tenant/(admin)`)
**Goal**: High interactivity. SEO irrelevant.

*   **Implementation**:
    1.  Use standard **Client Components** at the page level.
    2.  Use **TanStack Query (React Query)** for fetching/caching data.
    3.  Use **React Hook Form** + **Zod** for complex forms (e.g., "Create Product").

---

## 4. The "Theme Engine" (Critical)

Since we are reusing Bootstrap, we cannot easily use CSS-in-JS for theming. We must use **Dynamic Stylesheet Injection**.

1.  **Asset Migration**:
    *   Move `core/resources/views/themes/*/assets/css/*.css` -> `apps/tenant/public/themes/*.css`.
    *   Example: `/themes/party.css`, `/themes/wedding.css`.

2.  **Dynamic Layout (`apps/tenant/src/app/[domain]/layout.tsx`)**:

```tsx
export default async function TenantLayout({ params, children }) {
  const domain = params.domain;
  const tenantConfig = await getTenantConfig(domain); // API Call
  
  return (
    <html>
      <head>
        {/* Dynamic Theme Loading */}
        <link 
          rel="stylesheet" 
          href={`/themes/${tenantConfig.theme_slug}.css`} 
        />
        {/* Dynamic Font Loading */}
        <link href={tenantConfig.font_url} rel="stylesheet" />
      </head>
      <body className={`theme-${tenantConfig.theme_slug}`}>
        {children}
      </body>
    </html>
  );
}
```

---

## 5. Auth & Multi-Tenancy Logic

### Middleware Strategy (`apps/tenant/middleware.ts`)
This is the routing brain. It runs before every request.

```typescript
export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host"); // e.g. "shop.mysite.com"

  // 1. Check if it's a "Custom Domain" or "Subdomain"
  const isCustomDomain = !hostname.includes(process.env.ROOT_DOMAIN);
  
  // 2. Resolve Tenant ID (Cache this lookup!)
  const tenantId = resolveTenant(hostname);

  // 3. Rewrite URL strictly for internal Next.js routing
  // User sees: shop.mysite.com/about
  // Next renders: apps/tenant/app/[domain]/about/page.tsx
  url.pathname = `/${tenantId}${url.pathname}`;
  
  return NextResponse.rewrite(url);
}
```

---

## 6. Detailed Step-by-Step Execution Plan

### Phase 1: Foundation (Days 1-3)
1.  **Repo Setup**: `npx create-turbo@latest`.
2.  **Package Installation**: `npm i bootstrap react-bootstrap sass`.
3.  **UI Library**: Create `packages/ui/Button.tsx` wrapping `react-bootstrap` Button.
    *   *Why?* So you can replace Bootstrap later if you want without changing 1000 files.

### Phase 2: Landlord Admin (Days 4-10)
1.  **Auth**: Setup `packages/api-client` to login against `api.yoursaas.com/sanctum/token`.
2.  **Dashboard Shell**: Create the Sidebar/TopNav layout reusing `admin-master.blade.php` HTML.
3.  **Tenants Table**: Build the Data Table using React Query to list tenants.

### Phase 3: The Tenant Engine (Days 11-20)
1.  **Middleware Service**: Build the mapping service (Host -> Tenant ID).
2.  **Page Builder Renderer (Headless Engine)**:
    *   **Concept**: Laravel returns JSON widgets; Next.js maps them to React components.
    *   **Backend**: Update `PageBuilderBase` to have a `toJson()` method.
    *   **Frontend**: Create `apps/tenant/components/content-renderer.tsx`.
    *   **Mapping**:
        ```tsx
        const COMPONENT_MAP = {
          "BarberShop_AboutArea": dynamic(() => import("./themes/barber/AboutArea")),
          "Common_HeroSlider": dynamic(() => import("./common/HeroSlider")),
        };
        ```
    *   **Action**: Port the top 5 most used widgets first (Hero, About, Service, Testimonial, Contact).
3.  **Theme #1**: Port the "Default" theme CSS to `public/themes`. Test dynamic loading.

### Phase 4: Module Migration (Ongoing)
*   **Strategy**: Tackle one module per week.
*   **Week 4**: Blog Module (Archive page, Single Post page).
*   **Week 5**: Products Logic (Grid, Filter, Cart Context).
*   **Week 6**: Checkout Flow (Stripe Elements integration).

---

## 7. Migration Checklist for Frontend Developers

- [ ] **Styles**: Do not write new CSS if possible. Use Bootstrap utility classes (`d-flex`, `p-3`).
- [ ] **Images**: Replace `<img src="...">` with `<Image src="..." width={...} height={...} />`.
- [ ] **Links**: Replace `<a href="...">` with `<Link href="...">`.
- [ ] **Forms**: DO NOT use HTML form action. Use `React Hook Form` `handleSubmit`.
- [ ] **Env**: Ensure `NEXT_PUBLIC_API_URL` is set correctly for Dev vs Prod.

This plan provides a secure, SEO-friendly, and maintainable path forward while respecting the massive amount of existing logic and styling in your project.
