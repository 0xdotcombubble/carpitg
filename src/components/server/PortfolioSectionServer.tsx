import React from 'react'
import PortfolioSection from '@/components/ui/PortfolioSection'
import { getPortfolio } from '@/lib/getPageData'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export async function PortfolioSectionServer() {
  const portfolioItems = await getPortfolio()

  return <PortfolioSection portfolioItems={portfolioItems} />
}
