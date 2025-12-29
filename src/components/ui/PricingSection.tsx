import React from 'react'
import { PricingItem } from './types'
import { PricingHeader } from './pricing/PricingHeader'
import { PricingGrid } from './pricing/PricingGrid'

interface PricingSectionProps {
  pricingItems?: PricingItem[]
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricingItems = [] }) => {
  return (
    <section id="pricing" className="relative bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <PricingHeader />

        {/* Pricing Grid */}
        <PricingGrid items={pricingItems} />
      </div>
    </section>
  )
}

export default PricingSection
