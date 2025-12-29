import React, { Suspense } from 'react'
import { Hero, ContactSection, Footer } from '@/components/ui'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import { getSiteSettings } from '@/lib/getPageData'
import { ServicesSectionServer } from '@/components/server/ServicesSectionServer'
import { PortfolioSectionServer } from '@/components/server/PortfolioSectionServer'
import { PricingSectionServer } from '@/components/server/PricingSectionServer'

// Revalidate every hour (ISR)
export const revalidate = 3600

export default async function HomePage() {
  // Only fetch site settings for Hero at the page level (most static data)
  const siteSettings = await getSiteSettings()

  return (
    <>
      {/* Hero - Critical above-the-fold content */}
      <Hero siteSettings={siteSettings} />

      {/* Pricing - With suspense boundary and independent data fetching */}
      <Suspense fallback={<LoadingSkeleton type="pricing" />}>
        <PricingSectionServer />
      </Suspense>

      {/* Services - With suspense boundary and independent data fetching */}
      <Suspense fallback={<LoadingSkeleton type="services" />}>
        <ServicesSectionServer />
      </Suspense>

      {/* Portfolio - With suspense boundary and independent data fetching */}
      <Suspense fallback={<LoadingSkeleton type="portfolio" />}>
        <PortfolioSectionServer />
      </Suspense>

      {/* Contact - Mostly static */}
      <ContactSection siteSettings={siteSettings} />

      {/* Footer - Static */}
      <Footer siteSettings={siteSettings} />
    </>
  )
}
