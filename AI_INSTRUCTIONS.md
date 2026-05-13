# Project Context & AI Coding Guidelines

## 🤖 AI Instructions
You are an expert Full-Stack Developer. Read this document carefully before generating any code for this project. This document defines the strict architectural boundaries, folder structure, and best practices for this modern Next.js application. 

**DO NOT deviate from this structure.** # Project Architecture
1. **assetflow**: Main marketplace for users to browse, search, and buy digital assets.
2. **assetflow-admin**: Administrative panel for managing assets, viewing real-time analytics, and publishing content.

## Admin Panel Features
- **Dashboard**: High-level overview of sales, traffic, and recent activities.
- **Asset Management**: Full CRUD capabilities for digital assets (title, category, price, images).
- **Real-time Analytics**: Live tracking of visitors, device distribution, and geographical data.

## User Web Features (Current)
- Premium marketplace UI with Bento-grid design.
- Multilingual support (Bahasa Indonesia).
- Integrated cart system and localized mock data. 

## 🛠️ Tech Stack
- **Framework:** Next.js (Strictly App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + Shadcn UI / Radix (or equivalent)
- **Database ORM:** Prisma / Drizzle (specify here)
- **Authentication:** NextAuth.js (Auth.js) / Supabase Auth
- **Validation:** Zod
- **State Management:** Zustand (Client state) + React Query / SWR (Server state caching)

---

## 📂 Strict Folder Structure
We follow a highly modular, scalable, and feature-based architecture inside the `src/` directory.

```text
src/
├── app/                  # APP ROUTER: Routing, layout, pages
│   ├── (auth)/           # Route group for authentication pages
│   ├── (dashboard)/      # Route group for protected dashboard interfaces
│   ├── api/              # API ROUTES: External webhooks or RESTful endpoints
│   ├── globals.css       # Global Tailwind styles
│   ├── layout.tsx        # Root layout (Server Component)
│   ├── page.tsx          # Root landing page
│   ├── loading.tsx       # Global Suspense loading state
│   ├── error.tsx         # Global Error boundary
│   └── not-found.tsx     # 404 Custom page
├── actions/              # SERVER ACTIONS: Next.js server-side mutations (Form submissions)
│   ├── user.action.ts    # e.g., registerUser(), updateUserProfile()
│   └── product.action.ts # e.g., createProduct(), deleteProduct()
├── components/           # UI COMPONENTS (Presentation Layer)
│   ├── ui/               # Dumb/Reusable base components (Button, Input, Modal - e.g., Shadcn)
│   ├── layout/           # Layout shells (Navbar, Footer, Sidebar)
│   ├── features/         # Complex, domain-specific components (e.g., ProductCard, CartDrawer)
│   └── shared/           # Cross-feature shared components (Logo, Fallbacks)
├── providers/            # CONTEXT PROVIDERS: Client-side wrappers
│   ├── theme-provider.tsx# Dark/Light mode wrapper
│   └── query-provider.tsx# React Query / State provider wrapper
├── lib/                  # LIBRARY: Setup for third-party tools
│   ├── prisma.ts / db.ts # Database singleton client
│   ├── auth.ts           # NextAuth configuration options
│   ├── utils.ts          # Generic helpers (e.g., tailwind `cn` merger, date formatting)
│   └── constants.ts      # Immutable global constants
├── services/             # SERVICES: Core Business Logic & Data Fetching (Server-Side)
│   ├── user.service.ts   # e.g., getUserById(), getAllUsers()
│   └── product.service.ts# e.g., fetchProductsWithFilters()
├── hooks/                # CUSTOM HOOKS: Reusable React Client hooks
│   ├── use-debounce.ts   
│   └── use-media-query.ts
├── store/                # STATE MANAGEMENT: Global Client State (Zustand)
│   └── use-cart-store.ts 
├── types/                # TYPES: Global TypeScript definitions
│   └── index.ts          # Enums, interfaces, and shared types
├── schemas/              # VALIDATION: Zod schemas for forms and API payloads
│   ├── auth.schema.ts    # e.g., LoginSchema, RegisterSchema
│   └── product.schema.ts 
├── config/               # CONFIGURATION: App-wide settings
│   ├── env.ts            # T3 Env / Zod validated environment variables
│   └── site.ts           # SEO metadata, navigation links configuration
├── public/               # PUBLIC ASSETS: Images, icons, fonts
└── middleware.ts         # MIDDLEWARE: Edge-level routing, route protection, rate limiting