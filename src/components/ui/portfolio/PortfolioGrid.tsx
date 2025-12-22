import React from 'react'
import { PortfolioItem } from '../types'
import { PortfolioCard } from './PortfolioCard'

interface PortfolioGridProps {
  items: PortfolioItem[]
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="hidden md:block max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {items.map((card) => (
          <PortfolioCard key={card.slug} card={card} />
        ))}
      </div>
    </div>
  )
}
