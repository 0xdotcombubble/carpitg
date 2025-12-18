'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PortfolioItem } from './types'

interface PortfolioSectionProps {
  portfolioItems?: PortfolioItem[]
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolioItems = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('Összes')

  const categories = [
    'Összes',
    ...Array.from(new Set(portfolioItems.map((item) => item.metadata.category))),
  ]
  const filteredItems =
    selectedCategory === 'Összes'
      ? portfolioItems
      : portfolioItems.filter((item) => item.metadata.category === selectedCategory)

  return (
    <section id="portfolio" className="relative md:bg-transparent bg-[#0D0D0D]">
      {/* Header Section */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              <span className="text-accent/80 font-medium tracking-wider text-sm uppercase">
                Portfólió
              </span>
              <span className="w-2 h-2 bg-accent rounded-full"></span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-6">
              Kiváló Munkáink
            </h2>

            <p className="text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
              Büszkék vagyunk minden elvégzett munkánkra. Itt láthatod legfrissebb projektjeinket és
              az elégedett ügyfelek autóit.
            </p>

            <div className="w-32 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent mx-auto mt-8"></div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-[#1A1A1A] border border-white/20 text-white hover:border-accent/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Parallax Section */}
      <div className="relative">
        {filteredItems.map((item, i) => (
          <div
            key={item.slug}
            style={{
              top: `calc(-2vh + ${i * 25}px)`,
            }}
            className="flex md:h-screen min-h-[400px] items-center justify-center sticky"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
              <Link href={`/portfolio/${item.slug}`} className="block">
                <div
                  className={`relative bg-[#1A1A1A] border border-white/20 hover:border-accent/50 transition-all duration-500 overflow-hidden ${
                    i % 2 === 0 ? 'md:rotate-[0.5deg]' : 'md:-rotate-[0.5deg]'
                  } group cursor-pointer`}
                >
                  {/* Corner accent element */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="w-12 h-12 border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 flex items-center justify-center">
                      <div className="w-6 h-6 bg-accent/20 group-hover:bg-accent/40 transition-all duration-500"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[450px]">
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-64 lg:h-auto">
                      <Image
                        src={item.metadata.image || ''}
                        alt={item.metadata.title}
                        fill
                        className="object-cover cursor-pointer"
                        priority={i < 2}
                      />
                      <div className="absolute inset-0 bg-black/20"></div>

                      {/* Category badge on image */}
                      <div className="absolute top-4 left-4 z-10 lg:hidden">
                        <span className="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                          {item.metadata.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 lg:p-12 pr-20 flex flex-col justify-between relative">
                      <div className="flex-1 flex flex-col justify-center">
                        {/* Desktop category */}
                        <div className="mb-4 hidden lg:block">
                          <span className="text-accent text-sm font-medium tracking-wide uppercase">
                            {item.metadata.category}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                          {item.metadata.title}
                        </h3>

                        <div className="w-16 h-0.5 bg-linear-to-r from-accent to-accent/30 mb-4 group-hover:w-24 transition-all duration-500"></div>

                        <p className="text-white/70 font-light leading-relaxed text-base lg:text-lg mb-6 pr-4">
                          {item.metadata.description}
                        </p>
                      </div>

                      <div className="absolute bottom-6 right-6 w-10 h-10 border border-accent/50 text-accent hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer z-10">
                        <span className="text-xl transform group-hover:rotate-45 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500"></div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="bg-linear-to-r from-[#1A1A1A]/20 to-[#1A1A1A]/10 border border-white/10 p-8 lg:p-12 backdrop-blur-sm relative overflow-hidden">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
              Inspirálódj munkáinkból!
            </h3>

            <p className="text-white/70 font-light leading-relaxed mb-8">
              Minden autó egyedi történet. Nézd meg, hogyan változtattuk át ügyfeleink járműveit
              valódi ékszerekké.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-colors duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Kérj Ajánlatot</span>
              </a>

              <a
                href="tel:+36703339809"
                className="px-8 py-4 border border-white/30 text-white hover:border-accent hover:text-accent font-medium transition-all duration-300 flex items-center gap-2"
              >
                <span>+36 70 333 9809</span>
                <span>📞</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
