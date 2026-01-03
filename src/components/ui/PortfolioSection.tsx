import React from 'react'
import { PortfolioItem } from './types'
import { PortfolioHeader } from './portfolio/PortfolioHeader'
import { DesktopSlideshow } from './portfolio/DesktopSlideshow'

interface PortfolioSectionProps {
  portfolioItems?: PortfolioItem[]
}

const PortfolioSection = React.memo<PortfolioSectionProps>(
  ({ portfolioItems = [] }) => {
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
      </section>
    )
  },
  // Custom comparison function to prevent unnecessary rerenders
  (prevProps, nextProps) => {
    // Only rerender if the number of items changes or if items array reference changes deeply
    if (prevProps.portfolioItems?.length !== nextProps.portfolioItems?.length) {
      return false
    }
    // Check if items are the same by comparing slugs (lightweight comparison)
    const prevSlugs = prevProps.portfolioItems?.map((item) => item.slug).join(',')
    const nextSlugs = nextProps.portfolioItems?.map((item) => item.slug).join(',')
    return prevSlugs === nextSlugs
  },
)

PortfolioSection.displayName = 'PortfolioSection'

export default PortfolioSection
