import React from 'react'
import { PortfolioItem } from './types'
import { PortfolioHeader } from './portfolio/PortfolioHeader'
import { DesktopSlideshow } from './portfolio/DesktopSlideshow'
import { PortfolioFooter } from './portfolio/PortfolioFooter'

interface PortfolioSectionProps {
  portfolioItems?: PortfolioItem[]
}

const PortfolioSection = React.memo<PortfolioSectionProps>(({ portfolioItems = [] }) => {
  if (portfolioItems.length === 0) {
    return (
      <section id="portfolio" className="relative bg-background">
        <div className="flex h-96 w-full items-center justify-center">
          <div className="text-white/70">Portfólió betöltése...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="relative bg-background">
      {/* Header Section */}
      <PortfolioHeader />

      {/* Slideshow with Thumbnails - Full width on mobile, constrained on desktop */}
      <DesktopSlideshow items={portfolioItems} />

      {/* Footer Section */}
      <PortfolioFooter />
    </section>
  )
})

PortfolioSection.displayName = 'PortfolioSection'

export default PortfolioSection
