import React from 'react'
import { PortfolioItem } from './types'
import { PortfolioHeader } from './portfolio/PortfolioHeader'
import { PortfolioGrid } from './portfolio/PortfolioGrid'
import { MobileSlideshow } from './portfolio/MobileSlideshow'
import { PortfolioFooter } from './portfolio/PortfolioFooter'

interface PortfolioSectionProps {
  portfolioItems?: PortfolioItem[]
}

const PortfolioSection = React.memo<PortfolioSectionProps>(({ portfolioItems = [] }) => {
  if (portfolioItems.length === 0) {
    return (
      <section id="portfolio" className="relative md:bg-transparent bg-[#0D0D0D]">
        <div className="flex h-96 w-full items-center justify-center">
          <div className="text-white/70">Portfólió betöltése...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="relative md:bg-transparent bg-[#0D0D0D]">
      {/* Header Section */}
      <PortfolioHeader />

      {/* Card Section - Mobile: Slideshow, Desktop: Grid */}
      <div className="py-8 sm:py-12 md:py-24">
        {/* Mobile: Horizontal Slideshow (Client Component) */}
        <MobileSlideshow items={portfolioItems} />

        {/* Desktop: Card Grid (Server Component) */}
        <PortfolioGrid items={portfolioItems} />
      </div>

      {/* Footer Section */}
      <PortfolioFooter />
    </section>
  )
})

PortfolioSection.displayName = 'PortfolioSection'

export default PortfolioSection
