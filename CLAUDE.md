# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **CarPit Garage** automotive detailing business website built with:
- **Next.js 15.4.10** (React 19) frontend
- **Payload CMS 3.63** headless CMS backend
- **Cloudflare Workers** deployment target with D1 SQLite database
- **Tailwind CSS v4** for styling
- **TypeScript** throughout

## Architecture

### Frontend (`src/app/(frontend)/`)
- **Single Page Application** with React components
- **Content fetched dynamically** from Payload CMS via API routes
- **Fallback data** embedded in components for offline/error scenarios
- **Component structure**: Hero, ServicesSection, PortfolioSection, PricingSection, ContactSection, Footer
- **Types defined** in `src/components/ui/types.ts` for SiteSettings, ServiceItem, PortfolioItem, PricingItem

### Backend (`src/app/(payload)/`)
- **Payload CMS admin interface** at `/admin`
- **Collections**: Users (auth), Media (R2 storage)
- **API routes**: GraphQL (`/api/graphql`), REST (`/api/[...slug]`)
- **Configuration** in `src/payload.config.ts`

### Deployment Architecture
- **Cloudflare Workers** with automatic service bindings via Wrangler
- **D1 SQLite database** for CMS data storage
- **R2 object storage** for media files
- **Environment-based configuration** (development vs production contexts)

## Development Commands

```bash
# Development
bun run dev                    # Start development server (auto-binds Cloudflare services)
bun run devsafe               # Clean start (removes .next and .open-next)

# Building & Testing
bun run build                 # Build for production
bun run lint                  # Run ESLint
bun run test                  # Run all tests (integration + e2e)
bun run test:int              # Run Vitest integration tests only
bun run test:e2e              # Run Playwright e2e tests only

# Payload CMS Operations
bun run payload               # Access Payload CLI
bun run generate:types        # Generate TypeScript types (both Cloudflare + Payload)
bun run generate:importmap    # Generate import map for admin

# Deployment
bun run deploy                # Full deployment (database + app)
bun run deploy:database       # Deploy database migrations only
bun run deploy:app           # Deploy application only
bun run preview              # Preview build locally

# Cloudflare Operations
bun wrangler login           # Authenticate with Cloudflare (required first)
bun wrangler help            # See all Wrangler options
```

## Styling System (Tailwind CSS v4)

This project uses **Tailwind CSS v4**, which has different configuration than v3:

- **No `tailwind.config.js`** - configuration is in CSS via `@theme` directive
- **Color definitions** in `src/app/(frontend)/global.css` using `--color-*` variables
- **Theme**: Dark background (`hsl(222.2 84% 4.9%)`) with orange accent (`hsl(12 100% 50%)`)
- **PostCSS setup** uses `@tailwindcss/postcss` plugin

### Key Styling Notes
- Use `bg-accent`, `text-accent`, etc. for theme colors
- Colors are defined as HSL values in CSS custom properties
- Typography uses system fonts with `font-display` utility class

## Content Management (Payload CMS)

> **💡 Payload CMS Skill Available**: This project uses Payload CMS extensively. A comprehensive skill is available in `.claude/payload/SKILL.md` with detailed reference documentation for collections, fields, hooks, access control, and queries.

### Data Flow
1. **Content created** in Payload admin (`/admin`)
2. **Stored** in Cloudflare D1 SQLite database
3. **Fetched** by frontend via API endpoints (`/api/content/*`)
4. **Fallback data** used when API unavailable

### Current Collections
- **Users** (`src/collections/Users.ts`) - Authentication enabled
- **Media** (`src/collections/Media.ts`) - File uploads with R2 storage

### Expected Content Types (Frontend Integration)
Based on the frontend component structure, these collections should be created:
- **SiteSettings**: Hero text, contact info, social links → `SiteSettings` interface
- **Services**: Auto detailing services with pricing → `ServiceItem[]` interface
- **Portfolio**: Completed work showcases → `PortfolioItem[]` interface
- **Pricing**: Service packages with features → `PricingItem[]` interface

### Payload-Specific Development Notes
- **Database**: Uses `sqliteD1Adapter` with Cloudflare D1 binding
- **Storage**: Uses `r2Storage` plugin for media files
- **Access Control**: Remember `overrideAccess: false` for user-based operations
- **Transactions**: Always pass `req` through nested operations in hooks
- **Local API**: Available in Next.js API routes and Server Components

## Important Development Notes

### Package Management
- Uses **bun** as package manager (not npm/yarn)
- **pnpm engines** specified but bun is used in practice
- **Node 18.20.2+ or 20.9.0+** required

### Cloudflare Integration
- **Wrangler automatically binds services** for local development
- **Environment variables** set via Cloudflare dashboard, not local `.env`
- **PAYLOAD_SECRET** must be set (generate with `openssl rand -hex 32`)

### Bundle Size Limitations
- **3MB limit** on Workers (paid plan recommended)
- **GraphQL support limited** due to upstream Workers issues
- **Monitor bundle size** when adding dependencies

### Testing Setup
- **Vitest** for unit/integration tests
- **Playwright** for end-to-end tests
- **Testing Library** for React component testing

## API Conventions

Frontend components expect these API endpoints to exist:
- `GET /api/content/site-settings` → SiteSettings object
- `GET /api/content/services` → ServiceItem[]
- `GET /api/content/portfolio` → PortfolioItem[]
- `GET /api/content/pricing` → PricingItem[]

Components gracefully handle API failures using embedded fallback data.