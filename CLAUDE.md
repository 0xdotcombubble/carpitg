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
# Assume that the development server already running on port 3000
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

[## Content Management (Payload CMS)

# Payload

## Basics

### Getting Started

- [What is Payload?](https://payloadcms.com/docs/getting-started/what-is-payload)

- [Payload Concepts](https://payloadcms.com/docs/getting-started/concepts)

- [Installation](https://payloadcms.com/docs/getting-started/installation)


### Configuration

- [The Payload Config](https://payloadcms.com/docs/configuration/overview)

- [Collection Configs](https://payloadcms.com/docs/configuration/collections)

- [Global Configs](https://payloadcms.com/docs/configuration/globals)

- [I18n](https://payloadcms.com/docs/configuration/i18n)

- [Localization](https://payloadcms.com/docs/configuration/localization)

- [Environment Variables](https://payloadcms.com/docs/configuration/environment-vars)


### Database

- [Database](https://payloadcms.com/docs/database/overview)

- [Migrations](https://payloadcms.com/docs/database/migrations)

- [Transactions](https://payloadcms.com/docs/database/transactions)

- [Indexes](https://payloadcms.com/docs/database/indexes)

- [MongoDB](https://payloadcms.com/docs/database/mongodb)

- [Postgres](https://payloadcms.com/docs/database/postgres)

- [SQLite](https://payloadcms.com/docs/database/sqlite)


### Fields

- [Fields Overview](https://payloadcms.com/docs/fields/overview)

- [Array Field](https://payloadcms.com/docs/fields/array)

- [Blocks Field](https://payloadcms.com/docs/fields/blocks)

- [Checkbox Field](https://payloadcms.com/docs/fields/checkbox)

- [Code Field](https://payloadcms.com/docs/fields/code)

- [JSON Field](https://payloadcms.com/docs/fields/json)

- [Collapsible Field](https://payloadcms.com/docs/fields/collapsible)

- [Date Field](https://payloadcms.com/docs/fields/date)

- [Email Field](https://payloadcms.com/docs/fields/email)

- [Group Field](https://payloadcms.com/docs/fields/group)

- [Number Field](https://payloadcms.com/docs/fields/number)

- [Point Field](https://payloadcms.com/docs/fields/point)

- [Radio Group Field](https://payloadcms.com/docs/fields/radio)

- [Relationship Field](https://payloadcms.com/docs/fields/relationship)

- [Join Field](https://payloadcms.com/docs/fields/join)

- [Rich Text Field](https://payloadcms.com/docs/fields/rich-text)

- [Row Field](https://payloadcms.com/docs/fields/row)

- [Select Field](https://payloadcms.com/docs/fields/select)

- [Tabs Field](https://payloadcms.com/docs/fields/tabs)

- [Text Field](https://payloadcms.com/docs/fields/text)

- [Textarea Field](https://payloadcms.com/docs/fields/textarea)

- [UI Field](https://payloadcms.com/docs/fields/ui)

- [Upload Field](https://payloadcms.com/docs/fields/upload)


### Access Control

- [Access Control](https://payloadcms.com/docs/access-control/overview)

- [Collection Access Control](https://payloadcms.com/docs/access-control/collections)

- [Globals Access Control](https://payloadcms.com/docs/access-control/globals)

- [Field-level Access Control](https://payloadcms.com/docs/access-control/fields)


### Hooks

- [Hooks Overview](https://payloadcms.com/docs/hooks/overview)

- [Collection Hooks](https://payloadcms.com/docs/hooks/collections)

- [Global Hooks](https://payloadcms.com/docs/hooks/globals)

- [Field Hooks](https://payloadcms.com/docs/hooks/fields)

- [Context](https://payloadcms.com/docs/hooks/context)


## Managing Data

### Local API

- [Local API](https://payloadcms.com/docs/local-api/overview)

- [Using Payload outside Next.js](https://payloadcms.com/docs/local-api/outside-nextjs)

- [Using Local API Operations with Server Functions](https://payloadcms.com/docs/local-api/server-functions)

- [Respecting Access Control with Local API Operations](https://payloadcms.com/docs/local-api/access-control)


### REST API

- [REST API](https://payloadcms.com/docs/rest-api/overview)


### GraphQL

- [GraphQL Overview](https://payloadcms.com/docs/graphql/overview)

- [Adding your own Queries and Mutations](https://payloadcms.com/docs/graphql/extending)

- [GraphQL Schema](https://payloadcms.com/docs/graphql/graphql-schema)


### Queries

- [Querying your Documents](https://payloadcms.com/docs/queries/overview)

- [Sort](https://payloadcms.com/docs/queries/sort)

- [Depth](https://payloadcms.com/docs/queries/depth)

- [Select](https://payloadcms.com/docs/queries/select)

- [Pagination](https://payloadcms.com/docs/queries/pagination)


## Features

### Admin

- [The Admin Panel](https://payloadcms.com/docs/admin/overview)

- [Preview](https://payloadcms.com/docs/admin/preview)

- [Document Locking](https://payloadcms.com/docs/admin/locked-documents)

- [Accessibility](https://payloadcms.com/docs/admin/accessibility)

- [Customizing CSS & SCSS](https://payloadcms.com/docs/admin/customizing-css)

- [React Hooks](https://payloadcms.com/docs/admin/react-hooks)

- [Managing User Preferences](https://payloadcms.com/docs/admin/preferences)

- [Page Metadata](https://payloadcms.com/docs/admin/metadata)


### Custom Components

- [Swap in your own React components](https://payloadcms.com/docs/custom-components/overview)

- [Root Components](https://payloadcms.com/docs/custom-components/root-components)

- [Swap in your own React Context providers](https://payloadcms.com/docs/custom-components/custom-providers)

- [Customizing Views](https://payloadcms.com/docs/custom-components/custom-views)

- [Document Views](https://payloadcms.com/docs/custom-components/document-views)

- [Edit View](https://payloadcms.com/docs/custom-components/edit-view)

- [List View](https://payloadcms.com/docs/custom-components/list-view)


### Authentication

- [Authentication Overview](https://payloadcms.com/docs/authentication/overview)

- [Authentication Operations](https://payloadcms.com/docs/authentication/operations)

- [Authentication Emails](https://payloadcms.com/docs/authentication/email)

- [Cookie Strategy](https://payloadcms.com/docs/authentication/cookies)

- [JWT Strategy](https://payloadcms.com/docs/authentication/jwt)

- [API Key Strategy](https://payloadcms.com/docs/authentication/api-keys)

- [Custom Strategies](https://payloadcms.com/docs/authentication/custom-strategies)

- [Token Data](https://payloadcms.com/docs/authentication/token-data)


### Rich Text

- [Rich Text Editor](https://payloadcms.com/docs/rich-text/overview)

- [Lexical Converters](https://payloadcms.com/docs/rich-text/converters)

- [Converting JSX](https://payloadcms.com/docs/rich-text/converting-jsx)

- [Converting HTML](https://payloadcms.com/docs/rich-text/converting-html)

- [Converting Markdown](https://payloadcms.com/docs/rich-text/converting-markdown)

- [Converting Plaintext](https://payloadcms.com/docs/rich-text/converting-plaintext)

- [Official Features](https://payloadcms.com/docs/rich-text/official-features)

- [Custom Features](https://payloadcms.com/docs/rich-text/custom-features)

- [Rendering On Demand](https://payloadcms.com/docs/rich-text/rendering-on-demand)

- [Lexical Migration](https://payloadcms.com/docs/rich-text/migration)

- [Slate Editor](https://payloadcms.com/docs/rich-text/slate)


### Live Preview

- [Live Preview](https://payloadcms.com/docs/live-preview/overview)

- [Implementing Live Preview in your frontend](https://payloadcms.com/docs/live-preview/frontend)

- [Server-side Live Preview](https://payloadcms.com/docs/live-preview/server)

- [Client-side Live Preview](https://payloadcms.com/docs/live-preview/client)


### Versions

- [Versions](https://payloadcms.com/docs/versions/overview)

- [Drafts](https://payloadcms.com/docs/versions/drafts)

- [Autosave](https://payloadcms.com/docs/versions/autosave)


### Upload

- [Uploads](https://payloadcms.com/docs/upload/overview)

- [Storage Adapters](https://payloadcms.com/docs/upload/storage-adapters)


### Folders

- [Folders](https://payloadcms.com/docs/folders/overview)


### Email

- [Email Functionality](https://payloadcms.com/docs/email/overview)


### Jobs Queue

- [Jobs Queue](https://payloadcms.com/docs/jobs-queue/overview)

- [Quick Start Example](https://payloadcms.com/docs/jobs-queue/quick-start-example)

- [Tasks](https://payloadcms.com/docs/jobs-queue/tasks)

- [Workflows](https://payloadcms.com/docs/jobs-queue/workflows)

- [Jobs](https://payloadcms.com/docs/jobs-queue/jobs)

- [Queues](https://payloadcms.com/docs/jobs-queue/queues)

- [Job Schedules](https://payloadcms.com/docs/jobs-queue/schedules)


### Query Presets

- [Query Presets](https://payloadcms.com/docs/query-presets/overview)


### Trash

- [Trash](https://payloadcms.com/docs/trash/overview)


### Troubleshooting

- [Troubleshooting](https://payloadcms.com/docs/troubleshooting/troubleshooting)


### TypeScript

- [TypeScript - Overview](https://payloadcms.com/docs/typescript/overview)

- [Generating TypeScript Interfaces](https://payloadcms.com/docs/typescript/generating-types)


## Ecosystem

### Plugins

- [Plugins](https://payloadcms.com/docs/plugins/overview)

- [Building Your Own Plugin](https://payloadcms.com/docs/plugins/build-your-own)

- [Form Builder Plugin](https://payloadcms.com/docs/plugins/form-builder)

- [Import Export Plugin](https://payloadcms.com/docs/plugins/import-export)

- [MCP Plugin](https://payloadcms.com/docs/plugins/mcp)

- [Multi-Tenant Plugin](https://payloadcms.com/docs/plugins/multi-tenant)

- [Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs)

- [Redirects Plugin](https://payloadcms.com/docs/plugins/redirects)

- [Search Plugin](https://payloadcms.com/docs/plugins/search)

- [Sentry Plugin](https://payloadcms.com/docs/plugins/sentry)

- [SEO Plugin](https://payloadcms.com/docs/plugins/seo)

- [Stripe Plugin](https://payloadcms.com/docs/plugins/stripe)


### Ecommerce

- [Ecommerce Overview](https://payloadcms.com/docs/ecommerce/overview)

- [Ecommerce Plugin](https://payloadcms.com/docs/ecommerce/plugin)

- [Ecommerce Frontend](https://payloadcms.com/docs/ecommerce/frontend)

- [Payment Adapters](https://payloadcms.com/docs/ecommerce/payments)

- [Advanced uses and examples](https://payloadcms.com/docs/ecommerce/advanced)


### Examples

- [Examples](https://payloadcms.com/docs/examples/overview)


### Integrations

- [Vercel Content Link](https://payloadcms.com/docs/integrations/vercel-content-link)


## Deployment

### Production

- [Building without a DB connection](https://payloadcms.com/docs/production/building-without-a-db-connection)

- [Production Deployment](https://payloadcms.com/docs/production/deployment)

- [Preventing Production API Abuse](https://payloadcms.com/docs/production/preventing-abuse)


### Performance

- [Performance](https://payloadcms.com/docs/performance/overview)

### Payload-Specific Development Notes
- **Database**: Uses `sqliteD1Adapter` with Cloudflare D1 binding
- **Storage**: Uses `r2Storage` plugin for media files
- **Access Control**: Remember `overrideAccess: false` for user-based operations
- **Transactions**: Always pass `req` through nested operations in hooks

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
