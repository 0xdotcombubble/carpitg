import React from 'react'
import { ServicesSection } from '@/components/ui'
import { getServices, getSiteSettings } from '@/lib/getPageData'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export async function ServicesSectionServer() {
  const [services, siteSettings] = await Promise.all([getServices(), getSiteSettings()])

  return <ServicesSection siteSettings={siteSettings} services={services} />
}
