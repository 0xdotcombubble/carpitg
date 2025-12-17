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
  const { siteSettings, services, portfolioItems, pricingItems } = await getPageData()

  return (
    <SmoothScrollWrapper>
      <Hero siteSettings={siteSettings} />
      <ServicesSection siteSettings={siteSettings} services={services} />
      <PortfolioSection portfolioItems={portfolioItems} />
      <PricingSection pricingItems={pricingItems} />
      <ContactSection />
      <Footer siteSettings={siteSettings} />
    </SmoothScrollWrapper>
  )
}
