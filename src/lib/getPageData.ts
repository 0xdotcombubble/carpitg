import { getPayload } from 'payload'
import config from '@/payload.config'
import type { SiteSettings, ServiceItem, PortfolioItem, PricingItem } from '@/components/ui/types'

// Default site settings fallback
const defaultSiteSettings: SiteSettings = {
  heroTitle: 'AUTÓKOZMETIKA - DETAIL STUDIO',
  heroSubtitle: 'Autód megérdemli a legjobbat',
  heroDescription:
    'Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít',
  heroBackgroundImage: '/background.jpg',
  heroLogo: '/logo.svg',
  portfolioTitle: 'Elvégzett Munkáink',
  portfolioSubtitle: 'Válogatás a legfrissebb projektjeinkből',
  servicesTitle: 'Egyedi Megoldások',
  servicesSubtitle:
    'Modern technológiák és hagyományos kézműves technikák egyesítése. Minden autó egyedi kezelést érdemel.',
  pricingTitle: 'Transzparens árképzés',
  pricingSubtitle:
    'Válassz a négy csomag közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.',
  pricingNote:
    'Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók, extrán szennyezett autók esetében az ár eltérhet.',
  phone: '+36703339809',
  email: 'info@carpitgarage.hu',
  address: '1172 Budapest\nCinkotai út 26.',
  instagram: 'https://www.instagram.com/carpit_grg',
  facebook: 'https://www.facebook.com/share/16mtfkk7VR/',
}

/**
 * Fetches site settings from Payload CMS
 * Uses Local API for server-side data fetching
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const payload = await getPayload({ config })

    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 2, // Include related media
    })

    // Transform image uploads to include URLs
    return {
      ...siteSettings,
      heroBackgroundImage:
        typeof siteSettings.heroBackgroundImage === 'object'
          ? siteSettings.heroBackgroundImage?.url || '/background.jpg'
          : '/background.jpg',
      heroLogo:
        typeof siteSettings.heroLogo === 'object'
          ? siteSettings.heroLogo?.url || '/logo.svg'
          : '/logo.svg',
    } as SiteSettings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return defaultSiteSettings
  }
}

/**
 * Fetches services from Payload CMS
 * Uses Local API for server-side data fetching
 */
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const payload = await getPayload({ config })

    const services = await payload.find({
      collection: 'services',
      depth: 2,
      sort: 'order',
      limit: 50,
    })

    // Transform services to match frontend interface
    return services.docs.map((service) => ({
      slug: service.slug,
      metadata: {
        title: service.title,
        description: service.description,
        price: service.price,
        category: service.category,
        order: service.order,
        slug: service.slug,
        features: service.features?.map((f) => f.feature) || [],
        image: typeof service.image === 'object' ? service.image?.url : undefined,
        featured: service.featured || false,
      },
      content: '',
    })) as ServiceItem[]
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

/**
 * Fetches portfolio items from Payload CMS
 * Uses Local API for server-side data fetching
 */
export async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const payload = await getPayload({ config })

    const portfolio = await payload.find({
      collection: 'portfolio',
      depth: 2,
      sort: 'order',
      limit: 50,
    })

    // Transform portfolio to match frontend interface
    return portfolio.docs.map((item) => ({
      slug: item.slug,
      metadata: {
        title: item.title,
        category: item.category,
        description: item.description,
        image: typeof item.image === 'object' ? item.image?.url || '' : '',
        order: item.order,
        featured: item.featured || false,
        slug: item.slug,
        gallery:
          item.gallery?.map((g) => ({
            image: typeof g.image === 'object' ? g.image?.url : undefined,
            caption: g.caption,
          })) || [],
        beforeAfter: {
          before:
            typeof item.beforeAfter?.before === 'object' ? item.beforeAfter.before?.url : undefined,
          after:
            typeof item.beforeAfter?.after === 'object' ? item.beforeAfter.after?.url : undefined,
        },
        vehicleInfo: item.vehicleInfo || {},
        services: Array.isArray(item.services)
          ? item.services.map((s: any) => (typeof s === 'object' ? s.title || '' : String(s)))
          : [],
      },
      content: '',
    })) as PortfolioItem[]
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return []
  }
}

/**
 * Fetches pricing items from Payload CMS
 * Uses Local API for server-side data fetching
 */
export async function getPricing(): Promise<PricingItem[]> {
  try {
    const payload = await getPayload({ config })

    const pricing = await payload.find({
      collection: 'pricing',
      depth: 2,
      sort: 'order',
      limit: 50,
    })

    // Transform pricing to match frontend interface
    return pricing.docs.map((item) => ({
      slug: item.slug,
      metadata: {
        title: item.title,
        category: item.category,
        description: item.description,
        price: item.price,
        duration: item.duration,
        image: typeof item.image === 'object' ? item.image?.url : undefined,
        order: item.order,
        popular: item.popular || false,
        features: item.features?.map((f) => f.feature) || [],
        slug: item.slug,
        vehicleTypes: item.vehicleTypes || [],
        notes: item.notes,
        services: Array.isArray(item.services)
          ? item.services.map((s: any) => (typeof s === 'object' ? s.title || '' : String(s)))
          : [],
      },
      content: '',
    })) as PricingItem[]
  } catch (error) {
    console.error('Error fetching pricing:', error)
    return []
  }
}

/**
 * Fetches a single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    })

    if (result.docs.length === 0) {
      return null
    }

    const service = result.docs[0]
    return {
      slug: service.slug,
      metadata: {
        title: service.title,
        description: service.description,
        price: service.price,
        category: service.category,
        order: service.order,
        slug: service.slug,
        features: service.features?.map((f) => f.feature) || [],
        image: typeof service.image === 'object' ? service.image?.url : undefined,
        featured: service.featured || false,
      },
      content: '',
    } as ServiceItem
  } catch (error) {
    console.error('Error fetching service by slug:', error)
    return null
  }
}

/**
 * Fetches a single portfolio item by slug
 */
export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'portfolio',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    })

    if (result.docs.length === 0) {
      return null
    }

    const item = result.docs[0]
    return {
      slug: item.slug,
      metadata: {
        title: item.title,
        category: item.category,
        description: item.description,
        image: typeof item.image === 'object' ? item.image?.url || '' : '',
        order: item.order,
        featured: item.featured || false,
        slug: item.slug,
        gallery:
          item.gallery?.map((g) => ({
            image: typeof g.image === 'object' ? g.image?.url : undefined,
            caption: g.caption,
          })) || [],
        beforeAfter: {
          before:
            typeof item.beforeAfter?.before === 'object' ? item.beforeAfter.before?.url : undefined,
          after:
            typeof item.beforeAfter?.after === 'object' ? item.beforeAfter.after?.url : undefined,
        },
        vehicleInfo: item.vehicleInfo || {},
        services: Array.isArray(item.services)
          ? item.services.map((s: any) => (typeof s === 'object' ? s.title || '' : String(s)))
          : [],
      },
      content: '',
    } as PortfolioItem
  } catch (error) {
    console.error('Error fetching portfolio by slug:', error)
    return null
  }
}

/**
 * Fetches a single pricing item by slug
 */
export async function getPricingBySlug(slug: string): Promise<PricingItem | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pricing',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    })

    if (result.docs.length === 0) {
      return null
    }

    const item = result.docs[0]
    return {
      slug: item.slug,
      metadata: {
        title: item.title,
        category: item.category,
        description: item.description,
        price: item.price,
        duration: item.duration,
        image: typeof item.image === 'object' ? item.image?.url : undefined,
        order: item.order,
        popular: item.popular || false,
        features: item.features?.map((f) => f.feature) || [],
        slug: item.slug,
        vehicleTypes: item.vehicleTypes || [],
        notes: item.notes,
        services: Array.isArray(item.services)
          ? item.services.map((s: any) => (typeof s === 'object' ? s.title || '' : String(s)))
          : [],
      },
      content: '',
    } as PricingItem
  } catch (error) {
    console.error('Error fetching pricing by slug:', error)
    return null
  }
}

/**
 * Fetches all page data in parallel
 * More efficient than sequential fetching
 */
export async function getPageData() {
  const [siteSettings, services, portfolioItems, pricingItems] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getPortfolio(),
    getPricing(),
  ])

  return {
    siteSettings,
    services,
    portfolioItems,
    pricingItems,
  }
}
