import React from 'react'
import {
  SmoothScrollWrapper,
  Hero,
  ServicesSection,
  PortfolioSection,
  PricingSection,
  ContactSection,
  Footer,
} from '@/components/ui'
import { getPageData } from '@/lib/getPageData'

export default async function HomePage() {
  // Fetch all data server-side using Payload's Local API
  const [{ siteSettings, services, portfolioItems, pricingItems }] = await Promise.all([
    getPageData(),
    // Minimum display time of 800ms to avoid loading flash
    new Promise((resolve) => setTimeout(resolve, 1600)),
  ])

  return (
    <SmoothScrollWrapper>
      <Hero siteSettings={siteSettings} />
      <ServicesSection siteSettings={siteSettings} services={services} />
      <PortfolioSection portfolioItems={portfolioItems} />
      <PricingSection pricingItems={pricingItems} />
      <ContactSection siteSettings={siteSettings} />
      <Footer siteSettings={siteSettings} />
    </SmoothScrollWrapper>
  )
}
