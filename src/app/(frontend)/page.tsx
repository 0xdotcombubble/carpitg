'use client'

import React, { useState, useEffect } from 'react'
import {
  SmoothScrollWrapper,
  Hero,
  ServicesSection,
  PortfolioSection,
  PricingSection,
  ContactSection,
  Footer,
} from '@/components/ui'
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

export default function HomePage() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [services, setServices] = useState<ServiceItem[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load site settings from PayloadCMS
        const settingsResponse = await fetch('/api/content/site-settings')
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json()
          setSiteSettings({ ...defaultSiteSettings, ...(settingsData as SiteSettings) })
        }

        // Load services
        const servicesResponse = await fetch('/api/content/services')
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json()
          setServices(servicesData as ServiceItem[])
        }

        // Load portfolio items
        const portfolioResponse = await fetch('/api/content/portfolio')
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json()
          setPortfolioItems(portfolioData as PortfolioItem[])
        }

        // Load pricing items
        const pricingResponse = await fetch('/api/content/pricing')
        if (pricingResponse.ok) {
          const pricingData = await pricingResponse.json()
          setPricingItems(pricingData as PricingItem[])
        }
      } catch (error) {
        console.error('Error loading data:', error)
        // Use default/fallback data
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-white/70">Betöltés...</p>
        </div>
      </div>
    )
  }

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
