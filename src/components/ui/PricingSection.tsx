'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Star, Sparkles, DollarSign, ArrowUpRight } from 'lucide-react'
import { PricingItem } from './types'

interface PricingSectionProps {
  pricingItems?: PricingItem[]
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricingItems = [] }) => {
  const getIconComponent = (category: string) => {
    switch (category.toLowerCase()) {
      case 'prémium':
      case 'premium':
        return <Star className="h-4 w-4 sm:h-5 sm:w-5" />
      case 'részletes':
      case 'detailing':
        return <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
      case 'ápolás':
      case 'maintenance':
      case 'alap':
      case 'basic':
        return <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
      default:
        return <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
    }
  }

  return (
    <section id="pricing" className="relative bg-[#0D0D0D]">
      {/* Header Section */}
      <div className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></span>
              <span className="text-accent/80 font-medium tracking-wider text-xs sm:text-sm uppercase">
                Árlista
              </span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-4 sm:mb-6">
              Transzparens Árképzés
            </h2>

            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto px-4">
              Válassz a csomagjaink közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.
            </p>

            <div className="w-24 sm:w-32 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent mx-auto mt-6 sm:mt-8"></div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="py-8 sm:py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingItems.map((item) => (
              <PricingCard key={item.slug} item={item} getIconComponent={getIconComponent} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-16 sm:py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative">
          <div className="bg-linear-to-r from-[#1A1A1A]/20 to-[#1A1A1A]/10 border border-white/10 p-6 sm:p-8 lg:p-12 backdrop-blur-sm relative overflow-hidden rounded-xl sm:rounded-2xl">
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
              Fontos tudnivalók
            </h3>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6 sm:mb-8">
              Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók,
              extrán szennyezett autók esetében az ár eltérhet.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-colors duration-300 relative overflow-hidden group text-center rounded-lg"
              >
                <span className="relative z-10">Kérj Egyedi Árajánlatot</span>
              </a>

              <a
                href="tel:+36703339809"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white hover:border-accent hover:text-accent font-medium transition-all duration-300 flex items-center justify-center gap-2 rounded-lg"
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

// Individual Pricing Card Component
interface PricingCardProps {
  item: PricingItem
  getIconComponent: (category: string) => React.ReactElement
}

function PricingCard({ item, getIconComponent }: PricingCardProps) {
  const isPopular = item.metadata.popular

  return (
    <Link href={`/pricing/${item.slug}`} className="block h-full group">
      <div
        className={`relative h-full bg-[#1A1A1A] border transition-all duration-500 overflow-hidden rounded-xl sm:rounded-2xl flex flex-col ${
          isPopular
            ? 'border-accent/50 shadow-lg shadow-accent/20 scale-105 lg:scale-110'
            : 'border-white/10 hover:border-accent/30'
        }`}
      >
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-accent text-white text-xs sm:text-sm font-medium rounded-full shadow-lg">
              NÉPSZERŰ
            </span>
          </div>
        )}

        {/* Card Header */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="rounded-full bg-white/10 p-2"
              style={{
                backgroundColor: isPopular ? 'rgba(255, 99, 71, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {getIconComponent(item.metadata.category)}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium tracking-wide uppercase ${isPopular ? 'text-accent' : 'text-white/60'}`}
            >
              {item.metadata.category}
            </span>
          </div>

          <h3
            className={`text-2xl sm:text-3xl font-bold mb-3 transition-colors duration-300 ${
              isPopular ? 'text-accent' : 'text-white group-hover:text-accent'
            }`}
          >
            {item.metadata.title}
          </h3>

          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed line-clamp-2">
            {item.metadata.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isPopular ? 'text-accent' : 'text-white'}`}
            >
              {item.metadata.price}
            </span>
            {item.metadata.duration && (
              <span className="text-white/50 text-xs sm:text-sm">/ {item.metadata.duration}</span>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            {item.metadata.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                <Check
                  className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${isPopular ? 'text-accent' : 'text-white/60'}`}
                />
                <span className="text-xs sm:text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer - CTA */}
        <div className="p-4 sm:p-6 border-t border-white/10 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/60 group-hover:text-accent transition-colors duration-300">
              Részletek megtekintése
            </span>
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 border flex items-center justify-center transition-all duration-300 rounded-lg ${
                isPopular
                  ? 'border-accent bg-accent text-white'
                  : 'border-white/30 text-white/60 group-hover:border-accent group-hover:bg-accent group-hover:text-white'
              }`}
            >
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-linear-to-t from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl sm:rounded-2xl"></div>

        {/* Corner decoration */}
        {isPopular && (
          <div className="absolute top-4 left-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 flex items-center justify-center rounded-lg">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-accent/20 group-hover:bg-accent/40 transition-all duration-500 rounded"></div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default PricingSection
