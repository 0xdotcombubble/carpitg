export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBackgroundImage: string;
  heroLogo: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  servicesTitle: string;
  servicesSubtitle: string;
  pricingTitle: string;
  pricingSubtitle: string;
  pricingNote: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
}

export interface ContentItem {
  slug: string;
  metadata: Record<string, any>;
  content: string;
}

export interface ServiceItem extends ContentItem {
  metadata: {
    title: string;
    description: string;
    price: string;
    category: string;
    order: number;
    slug: string;
  };
}

export interface PortfolioItem extends ContentItem {
  metadata: {
    title: string;
    category: string;
    description: string;
    image: string;
    order: number;
    featured: boolean;
    slug: string;
  };
}

export interface PricingItem extends ContentItem {
  metadata: {
    title: string;
    category: string;
    description: string;
    price: string;
    duration: string;
    image: string;
    order: number;
    popular: boolean;
    features: string[];
    slug: string;
  };
}