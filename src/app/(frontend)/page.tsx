import React from 'react'
import {
  Hero,
  ContactSection,
  Footer,
  ServicesSection,
  PortfolioSection,
  PricingSection,
} from '@/components/ui'
import { getPageData } from '@/lib/getPageData'

// Revalidate every hour (ISR)
export const revalidate = 3600

// Force static rendering - no streaming
// This prevents Cloudflare Workers streaming issues on mobile
export const dynamic = 'force-static'

export default async function HomePage() {
  // Fetch all data upfront in parallel - no streaming/suspense
  // This ensures complete page render on mobile devices in production
  const { siteSettings, services, portfolioItems, pricingItems } = await getPageData()

  return (
    <>
      {/* Hero - Critical above-the-fold content */}
      <Hero siteSettings={siteSettings} />

      {/* Pricing - Rendered atomically without streaming */}
      <PricingSection pricingItems={pricingItems} />

      {/* Services - Rendered atomically without streaming */}
      <ServicesSection siteSettings={siteSettings} services={services} />

      {/* Portfolio - Rendered atomically without streaming */}
      <PortfolioSection portfolioItems={portfolioItems} />

      {/* Contact - Mostly static */}
      <ContactSection siteSettings={siteSettings} />

      {/* Footer - Static */}
      <Footer siteSettings={siteSettings} />
    </>
  )
}
