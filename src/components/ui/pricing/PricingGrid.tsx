import React from 'react'
import { Check, DollarSign, Star, Crown } from 'lucide-react'
import { PricingItem } from '../types'

interface PricingGridProps {
  items: PricingItem[]
}

const getBadgeInfo = (slug: string) => {
  const lower = slug.toLowerCase()
  if (lower.includes('bronze') || lower.includes('basic')) {
    return { badge: 'BASIC', icon: DollarSign }
  } else if (lower.includes('gold') || lower.includes('luxury')) {
    return { badge: 'LUXURY', icon: Crown }
  } else {
    return { badge: 'PREMIUM', icon: Star }
  }
}

export function PricingGrid({ items }: PricingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {items.map((item) => {
        const { badge, icon: Icon } = getBadgeInfo(item.slug)
        const isPopular = item.metadata.popular

        return (
          <div
            key={item.slug}
            className={`relative border ${isPopular ? 'border-accent' : 'border-white/10'} bg-[#1A1A1A] flex flex-col`}
          >
            {/* Popular Badge */}
            {isPopular && (
              <div className="absolute -top-3 right-6">
                <span className="bg-accent text-white text-xs font-bold px-4 py-1">NÉPSZERŰ</span>
              </div>
            )}

            {/* Badge */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 ${isPopular ? 'bg-accent/20' : 'bg-white/10'}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold tracking-wider text-white/60">{badge}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{item.metadata.title}</h3>

              <p className="text-sm text-white/60 line-clamp-2">{item.metadata.description}</p>
            </div>

            {/* Price */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${isPopular ? 'text-accent' : 'text-white'}`}>
                  {item.metadata.price}
                </span>
                {item.metadata.duration && (
                  <span className="text-sm text-white/50">/ {item.metadata.duration}</span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="p-6 flex-1">
              <div className="space-y-3">
                {item.metadata.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 shrink-0 ${isPopular ? 'text-accent' : 'text-white/60'}`}
                    />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
