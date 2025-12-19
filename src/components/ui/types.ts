export interface SiteSettings {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroBackgroundImage: string
  heroLogo: string
  portfolioTitle: string
  portfolioSubtitle: string
  servicesTitle: string
  servicesSubtitle: string
  pricingTitle: string
  pricingSubtitle: string
  pricingNote: string
  phone: string
  email: string
  address: string
  instagram: string
  facebook: string
}

export interface ContentItem {
  slug: string
  metadata: Record<string, unknown>
  content: string
}

export interface ServiceItem {
  slug: string
  metadata: {
    title: string
    description: string
    price: string
    category: string
    order: number
    slug: string
    features?: string[]
    image?: string
    featured?: boolean
  }
  content: string
}

export interface PortfolioItem {
  slug: string
  metadata: {
    title: string
    category: string
    description: string
    image: string
    order: number
    featured: boolean
    slug: string
    gallery?: Array<{
      image?: string
      caption?: string
    }>
    beforeAfter?: {
      before?: string
      after?: string
    }
    vehicleInfo?: Record<string, string | number | boolean>
    services?: string[]
  }
  content: string
}

export interface PricingItem {
  slug: string
  metadata: {
    title: string
    category: string
    description: string
    price: string
    duration: string
    image?: string
    order: number
    popular: boolean
    features: string[]
    slug: string
    vehicleTypes?: string[]
    notes?: string
    services?: string[]
  }
  content: string
}
