import React from 'react'
import PricingSection from '@/components/ui/PricingSection'
import { getPricing } from '@/lib/getPageData'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export async function PricingSectionServer() {
  const pricingItems = await getPricing()

  return <PricingSection pricingItems={pricingItems} />
}
