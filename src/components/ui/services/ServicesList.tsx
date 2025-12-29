import React from 'react'
import Link from 'next/link'
import { ServiceItem } from '../types'

interface ServicesListProps {
  services: ServiceItem[]
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="space-y-0">
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.metadata.slug}`}
          className="group block border-b border-white/10 hover:border-accent/30 transition-colors"
        >
          <div className="py-8 md:py-12 grid grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Number */}
            <div className="col-span-2 md:col-span-1">
              <span className="text-white/40 font-bold text-xl md:text-2xl">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Title & Description */}
            <div className="col-span-10 md:col-span-7 lg:col-span-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {service.metadata.title}
              </h3>
              <p className="text-white/60 text-sm md:text-base line-clamp-2">
                {service.metadata.description}
              </p>
            </div>

            {/* Price & Category */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col md:items-end gap-3">
              <div className="text-accent font-bold text-lg md:text-xl">
                {service.metadata.price}
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wider">
                {service.metadata.category}
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:block col-span-0 md:col-span-1">
              <div className="w-8 h-8 border border-white/20 group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all">
                <span className="text-white text-xl transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
