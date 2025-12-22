import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { PortfolioItem } from '../types'
import { blurDataURLs } from '@/lib/blurDataURL'
import { getCategoryIcon } from './getCategoryIcon'

interface PortfolioCardProps {
  card: PortfolioItem
}

export function PortfolioCard({ card }: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${card.slug}`} className="block h-full group">
      <div className="relative h-full bg-[#1A1A1A] border border-white/10 hover:border-accent/30 transition-all duration-500 overflow-hidden rounded-xl sm:rounded-2xl flex flex-col">
        {/* Card Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">{getCategoryIcon(card.metadata.category)}</div>
            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white/60">
              {card.metadata.category}
            </span>
          </div>
          <div className="rounded-full bg-white/10 p-2 group-hover:bg-accent/20 transition-colors">
            <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/60 group-hover:text-accent transition-colors" />
          </div>
        </div>

        {/* Card Image */}
        {card.metadata.image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={card.metadata.image}
              alt={card.metadata.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              placeholder="blur"
              blurDataURL={blurDataURLs.darker}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
        )}

        {/* Card Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 mb-2 line-clamp-2">
            {card.metadata.title}
          </h3>

          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed line-clamp-3 mb-4">
            {card.metadata.description}
          </p>

          {/* CTA */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm font-medium text-white/60 group-hover:text-accent transition-colors duration-300">
              Részletek megtekintése
            </span>
            <div className="w-8 h-8 border border-white/30 group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all duration-300 rounded-lg">
              <ArrowUpRight className="h-4 w-4 text-white/60 group-hover:text-white transition-colors transform group-hover:rotate-45 duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
