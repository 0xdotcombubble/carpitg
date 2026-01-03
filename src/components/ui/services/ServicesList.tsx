import React from 'react'
import { ServiceItem } from '../types'

interface ServicesListProps {
  services: ServiceItem[]
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8">
      {services.map((service, index) => (
        <div
          key={service.slug}
          className="group relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-[0_0_30px_rgba(255,83,13,0.15)]"
        >
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/[0.02] to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Content Container */}
          <div className="relative p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-start">
              {/* Number Badge */}
              <div className="col-span-2 md:col-span-1 lg:col-span-1">
                <div className="flex flex-col items-start">
                  <span className="text-white/20 group-hover:text-accent/40 font-bold text-2xl md:text-3xl lg:text-4xl font-display transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-[2px] bg-accent/0 group-hover:bg-accent mt-2 transition-all duration-500"></div>
                </div>
              </div>

              {/* Service Details */}
              <div className="col-span-10 md:col-span-11 lg:col-span-8">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-[10px] md:text-xs text-accent/80 font-semibold uppercase tracking-widest px-3 py-1 bg-accent/10 border border-accent/20">
                    {service.metadata.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.metadata.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 group-hover:text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-4 transition-colors duration-300">
                  {service.metadata.description}
                </p>

                {/* Features (if available) */}
                {service.metadata.features && service.metadata.features.length > 0 && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {service.metadata.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/50">
                        <span className="text-accent mt-1">→</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price Section */}
              <div className="col-span-12 md:col-span-11 md:col-start-2 lg:col-span-3 lg:col-start-10">
                <div className="flex lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-4 lg:gap-3 lg:text-right">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Kezdő ár
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent">
                      {service.metadata.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/0 group-hover:via-accent/50 to-transparent transition-all duration-500"></div>
        </div>
      ))}
    </div>
  )
}
