import React from 'react'
import dynamic from 'next/dynamic'
import { Hero, ServicesSection } from '@/components/ui'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import { getPageData } from '@/lib/getPageData'

// Lazy load below-fold components for better initial load performance
const PortfolioSection = dynamic(() => import('@/components/ui/PortfolioSection'), {
  loading: () => <LoadingSkeleton type="portfolio" />,
})
const PricingSection = dynamic(() => import('@/components/ui/PricingSection'), {
  loading: () => <LoadingSkeleton type="pricing" />,
})
const ContactSection = dynamic(() => import('@/components/ui/ContactSection'), {
  loading: () => <LoadingSkeleton type="contact" />,
})
const Footer = dynamic(() => import('@/components/ui/Footer'), {
  loading: () => <LoadingSkeleton type="footer" />,
})

export default async function HomePage() {
  // Fetch all data server-side using Payload's Local API
  const [{ siteSettings, services, portfolioItems, pricingItems }] = await Promise.all([
    getPageData(),
  ])

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <ServicesSection siteSettings={siteSettings} services={services} />
      <PortfolioSection portfolioItems={portfolioItems} />
      <PricingSection pricingItems={pricingItems} />
      <ContactSection siteSettings={siteSettings} />
      <Footer siteSettings={siteSettings} />
    </>
  )
}
